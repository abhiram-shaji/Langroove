import { useState } from "react";
import { themes, setColors } from "../styles/themes";

export const useTheme = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const changeTheme = (index: number) => {
    setCurrentThemeIndex(index);
    setColors(index); // Update the global `colors`
  };

  return { currentThemeIndex, changeTheme, colors: themes[currentThemeIndex] };
};
