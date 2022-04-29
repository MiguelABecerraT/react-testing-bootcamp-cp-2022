import { rest } from "msw";

export const handlers = [
  rest.get("https://api.nasa.gov/planetary/apod", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        copyright: "Ignacio Javier Diaz Bobillo",
        date: "2022-04-25",
        explanation:
          "In one of the brightest parts of Milky Way lies a nebula where some of the oddest things occur. NGC 3372, known as the Great Nebula in Carina, is home to massive stars and changing nebulas. The Keyhole Nebula (NGC 3324), the bright structure just below the image center, houses several of these massive stars. The entire Carina Nebula, captured here, spans over 300 light years and lies about 7,500 light-years away in the constellation of Carina.  Eta Carinae, the most energetic star in the nebula, was one of the brightest stars in the sky in the 1830s, but then faded dramatically. While Eta Carinae itself maybe on the verge of a supernova explosion, X-ray images indicate that much of the Great Nebula in Carina has been a veritable supernova factory.",
        hdurl:
          "https://apod.nasa.gov/apod/image/2204/CarinaMosaic_Bobillo_1600.jpg",
        media_type: "image",
        service_version: "v1",
        title: "The Great Nebula in Carina",
        url: "https://apod.nasa.gov/apod/image/2204/CarinaMosaic_Bobillo_960.jpg",
      })
    );
  }),
];
