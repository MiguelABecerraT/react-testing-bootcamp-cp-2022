import { fireEvent, render, screen } from "@testing-library/react";
import { PictureOfTheDay } from ".";
import React from "react";

const setup = () => render(<PictureOfTheDay />);

/* jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
})); */

describe("Show Picture of the Day page", () => {
  it('Header with the title "Picture of the day"', () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /picture of the day/i })
    ).toBeInTheDocument();
  });

  it("Main section with N number of elements (N = 2)", () => {
    setup();
    const mainSection = screen.getByRole("main");
    expect(mainSection).toBeInTheDocument();
    expect(mainSection.childElementCount).toBe(2);
  });

  it('Footer section with  the message "Project created during Wizeline Academy React Testing Bootcamp”', () => {
    setup();
    const footerMessage = screen.getByRole("heading", {
      name: /project created during wizeline academy react testing bootcamp/i,
    });
    expect(footerMessage).toBeInTheDocument();
  });

  it("Main section has a date picker, image title, image and text paragraph", async () => {
    setup();

    const datePicker = screen.getByLabelText(/choose date, selected date is/i);
    const imageTitle = await screen.findByText("The Great Nebula in Carina");
    const image = await screen.findByAltText("picture_of_the_day");

    expect(datePicker).toBeInTheDocument();
    expect(imageTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("Date picker has a calendar grid", () => {
    setup();

    const datePicker = screen.queryByRole("grid");

    expect(datePicker).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("textbox", {
        name: /choose date, selected date is/i,
      })
    );

    const datePickerAfter = screen.queryByRole("grid");

    expect(datePickerAfter).toBeInTheDocument();
  });

  it("User can change date", () => {
    setup();

    /* const setState = jest.fn();
    const useStateMock = () => [new Date("2022/04/25"), setState];

    jest.spyOn(React, 'useState').mockImplementationOnce(useStateMock);

    screen.debug() */

    fireEvent.click(
      screen.getByRole("textbox", {
        name: /choose date, selected date is/i,
      })
    );

    const datePicker = screen.getByRole("button", {
      name: /calendar view is open, go to text input view/i,
    });

    fireEvent.change(datePicker, { target: { value: "2022/04/25" } });

    expect(datePicker.getAttribute("value")).toBe("2022/04/25");
  });
});
