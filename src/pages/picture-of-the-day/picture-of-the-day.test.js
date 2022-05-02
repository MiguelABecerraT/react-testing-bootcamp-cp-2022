import { fireEvent, render, screen } from "@testing-library/react";
import { PictureOfTheDay } from ".";
import { renderHook, act } from '@testing-library/react-hooks'
import React from "react";
import { useGetData } from "../../hooks/useGetData";

const setup = () => render(<PictureOfTheDay />);

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

describe("Show different values reactions", () => {
  const setState = jest.fn();
  const useStateDateMock = () => [new Date("1995/06/01"), setState];
  const useStateUndefinedDateMock = () => [undefined, setState];
  const useStatePictureMock = () => [new Date([]), setState];
  const useStateLoadingMock = () => [false, setState];
  const useStateErrorsMock = () => [
    "Date must be between Jun 16, 1995 and May 01, 2022.",
    setState,
  ];
  const useStateNoErrorsMock = () => [false, setState];

  it("User enters out Of range date", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(useStateDateMock)
      .mockImplementationOnce(useStatePictureMock)
      .mockImplementationOnce(useStateLoadingMock)
      .mockImplementationOnce(useStateErrorsMock);

    setup();

    const errorMsg = screen.getByText(
      /date must be between jun 16, 1995 and may 01, 2022./i
    );

    expect(errorMsg).toBeInTheDocument();
  });

  it("User remove DatePicker value", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(useStateUndefinedDateMock)
      .mockImplementationOnce(useStatePictureMock)
      .mockImplementationOnce(useStateLoadingMock)
      .mockImplementationOnce(useStateNoErrorsMock);

    setup();

    fireEvent.click(
      screen.getByRole("textbox", {
        name: /choose date/i,
      })
    );

    const datePicker = screen.getByRole("button", {
      name: /calendar view is open, go to text input view/i,
    });
    expect(datePicker.getAttribute("value")).toBe(null);
  });

  /* it('Render hook', () => {

    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(useStateUndefinedDateMock)
      .mockImplementationOnce(useStatePictureMock)
      .mockImplementationOnce(useStateLoadingMock)
      .mockImplementationOnce(useStateNoErrorsMock);


    const { result } = renderHook(() => useGetData())

    act(() => {
      result.current.fetchData();
    })

    expect(result.current.date).toBe('')
  }) */
});
