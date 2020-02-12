import { theme as defaultTheme } from '@chakra-ui/core';

const theme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    heading: `"Prompt", sans-serif`,
    body: `"Sarabun", sans-serif`,
  },
};

export default theme;
