// themes.ts

export const themes = [
  {
    background: "#16161a",
    headline: "#fffffe",
    paragraph: "#94a1b2",
    buttonBackground: "#7f5af0",
    buttonDisabled: "#7f5af0",
    buttonText: "#fffffe",
    border: "#000000",
    accent: "#2cb67d",
    form: "#2f2f2f",
    secondary: "#2f2f2f",
  },
  {
    background: "#ffffff",
    headline: "#16161a",
    paragraph: "#333333",
    buttonBackground: "#f9bc60",
    buttonDisabled: "#cccccc",
    buttonText: "#16161a",
    border: "#dddddd",
    accent: "#007aff",
    form: "#f0f0f0",
    secondary: "#f7f7f7",
  },
  {
    background: "#001f3f",
    headline: "#FFFFFF",
    paragraph: "#AAAAAA",
    buttonBackground: "#FF851B",
    buttonDisabled: "#FF4136",
    buttonText: "#FFFFFF",
    border: "#AAAAAA",
    accent: "#3D9970",
    form: "#001f3f",
    secondary: "#111111",
  },
  // Add 7 more themes here with your preferred values
];

export let colors = themes[0]; // Default theme

export const setColors = (themeIndex: number) => {
  colors = themes[themeIndex];
};
