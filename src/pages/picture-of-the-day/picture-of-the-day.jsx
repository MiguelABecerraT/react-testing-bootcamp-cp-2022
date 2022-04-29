import { React } from "react";
import { Box, Typography } from "@mui/material";
import { Footer, Header, Loading, PictureDatePicker } from "../../components";
import Moon from "./../../assets/moon.png";
import styled from "styled-components";
import { useGetData } from "../../hooks/useGetData";
import Wizetronaut from "./../../assets/wizetronaut.png";
import WizetronautError from "./../../assets/wizetronaut-error.png";

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 50px;
`;

const MainContainer = styled.div`
  background-color: #cacaca70;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${(props) =>
    props.error ? `url(${Wizetronaut})` : `url(${WizetronautError})`};
  background-repeat: no-repeat;
  background-size: contain;
  object-fit: cover;
`;

const Image = styled.img`
  height: 265px;
  object-fit: cover;
  width: 275px;
  margin-top: -10%;
  transform: rotate(-10deg);
  margin-left: -13%;
  border-radius: 100% / 65%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${Moon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  object-fit: cover;
  width: 45%;
  margin-top: ${(props) => (props.error ? "50px" : "200px")};
  @media (max-width: 1200px) {
    width: 90%;
    margin-top: 0px;
  }
  row-gap: 20px;
  text-align: justify;
`;

export const PictureOfTheDay = () => {
  const { date, pictureData, setDate, loading, errors } = useGetData();

  return (
    <PageContainer>
      <Header />
      <MainContainer role="main">
        <PictureDatePicker date={date} setDate={setDate} />
        <CardContainer>
          <ImageContainer error={!errors}>
            {loading ? (
              <Loading></Loading>
            ) : (
              !errors && (
                <Image
                  alt="picture_of_the_day"
                  src={pictureData?.url || null}
                />
              )
            )}
          </ImageContainer>
          <TextContainer error={!errors}>
            <Typography component="h2" variant={errors ? "h3" : "h4"}>
              {errors
                ? errors === true
                  ? "Oops! Something went wrong."
                  : errors
                : pictureData?.title}
            </Typography>
            <Typography component="h5" variant="h5" gutterBottom>
              {errors === true
                ? "There was an error, please try again."
                : pictureData?.explanation || ""}
            </Typography>
          </TextContainer>
        </CardContainer>
      </MainContainer>
      <Footer />
    </PageContainer>
  );
};
