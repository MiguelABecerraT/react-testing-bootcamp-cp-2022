import React from "react";
import { CircularProgress } from "@mui/material";
import { LoadingContainer } from "./styles/loading.styled";

export const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress disableShrink color="inherit" size="5rem" />
    </LoadingContainer>
  );
};