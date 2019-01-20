import LAYOUT from "../constants/layoutConstants";

export const calculateListHeight = (containerHeight, isManageCardOpen) => {
  //change the header height calculation if the manage card is closed
  const headerHeight = isManageCardOpen
    ? LAYOUT.LIST_HEADER_HEIGHT
    : (LAYOUT.LIST_HEADER_HEIGHT + LAYOUT.LIST_HEADER_PADDING) * 2;
  return (
    calculateSectionMinHeight(containerHeight, isManageCardOpen) -
    convertRemToPixels(LAYOUT.CARD_HEADER_HEIGHT) -
    convertRemToPixels(headerHeight) -
    convertRemToPixels(LAYOUT.CARD_BODY_PADDING * 2)
  );
};

const calculateSectionMinHeight = (containerHeight, isManageCardOpen) => {
  //if the manage card is open don't divide by 2
  const factor = isManageCardOpen ? 2 : 1;
  return (
    (containerHeight -
      convertRemToPixels(LAYOUT.SCREEN_BOTTOM_MARGIN) -
      convertRemToPixels(LAYOUT.CARD_BOTTOM_MARGIN)) /
    factor
  );
};

export const convertRemToPixels = rem =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
