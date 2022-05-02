import React from "react";
import { FooterContainer, PicturePageFooter } from "./styles/footer.styled";

export const Footer = () => {
  return (
    <FooterContainer>
      <PicturePageFooter component="h5" variant="h5">
        Project created during Wizeline Academy React Testing Bootcamp
      </PicturePageFooter>
      <PicturePageFooter component="h2" variant="subtitle1">
        © Miguel Angel Becerra Torres
      </PicturePageFooter>
    </FooterContainer>
  );
};
