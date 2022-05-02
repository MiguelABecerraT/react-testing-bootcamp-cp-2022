import { HeaderContainer, PicturePageHeader } from "./styles/header.styled";

export const Header = () => {
  return (
    <HeaderContainer>
      <PicturePageHeader component="h1" variant="h3">
        Picture Of The Day
      </PicturePageHeader>
    </HeaderContainer>
  );
};
