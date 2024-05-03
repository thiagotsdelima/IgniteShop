import { globalCss } from ".";

export const globolStyles = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  },
  body: {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    font: 'inherit',
  },
  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  }
})