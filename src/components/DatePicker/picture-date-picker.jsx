import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePickerContainer } from "./styles/picture-date-picker.styled";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";

export const PictureDatePicker = (props) => {
  const { date, setDate } = props;

  return (
    <DatePickerContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          mask="____/__/__"
          label="Select date"
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
          value={date || null}
          inputFormat="yyyy/MM/dd"
        />
      </LocalizationProvider>
    </DatePickerContainer>
  );
};
