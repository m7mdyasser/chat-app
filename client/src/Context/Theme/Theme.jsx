import { grey } from "@mui/material/colors";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { createContext } from "react";
import { useState } from "react";
import { createTheme } from "@mui/material";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(localStorage.getItem("Theme") || "light")

  const themes = [
    { name: "Light Theme", id: "light", icon: <WbSunnyIcon /> },
    { name: "Dark Theme", id: "dark", icon: <NightsStayIcon /> },
    { name: "Monochromacy", id: "Monochromacy", icon: <BrightnessMediumIcon /> },
    { name: "Tritanopia", id: "Tritanopia", icon: <RemoveRedEyeIcon /> },
    { name: "Protanopia", id: "Protanopia", icon: <RemoveRedEyeOutlinedIcon /> },
  ];


  const getDesignTokens = (themeId) => {
    switch (themeId) {
      case "light":
        return {
          palette: {
            mode: "light",
            primary: {
              main: "#000",
              background: "rgba(135,180,137,1)",
              background2: "rgba(255,255,255,1)",
              text: "rgba(153,153,153,1)",
              selfMessage: "rgba(239,253,222,1)",
              notification: "rgba(84,180,64,1)",
              lighterText: "rgba(84,180,64,1)",
              searchBG: "rgba(241,241,241,1)",
              sendIcon: "rgba(82,172,64,1)",
              navBarBG: "rgba(241,241,241,1)",
              nonSelfMessage: "rgba(255,255,255,1)",
              whiteText: "rgba(255,255,255,1)",
              border:grey[300]

            },
            secondary: {
              main: "#fff",
              textHover: "rgba(138,138,138,1)",
              background2Hover: "rgba(241,241,241,1)",
              focusSearchBG:"rgba(255,255,255,1)"

            },
            third: {
              background2Clicked: "rgba(82,172,64,1)",
              onlineDot: "rgba(255,255,255,1)",

            },
            neutral: {
            },
            favColor: {
            },
          },
        };
      case "dark":
        return {
          palette: {
            mode: "dark",
            primary: {
              main: "#fff",
              background: "rgba(14,22,33,1)",
              background2: "rgba(23,33,43,1)",
              text: "rgba(108,120,131,1)",
              selfMessage: "rgba(43,82,120,1)",
              notification: "rgba(64,130,188,1)",
              lighterText: "rgba(64,130,188,1)",
              searchBG: "rgba(36,47,61,1)",
              sendIcon: "rgba(82,136,193,1)",
              navBarBG: "rgba(31,41,54,1)",
              nonSelfMessage: "rgba(24,37,51,1)",
              whiteText: "rgba(255,255,255,1)",
              border:grey[800]

            },
            secondary: {
              main: "#000",
              textHover: "rgba(220,220,220,1)",
              background2Hover: "rgba(32,43,54,1)",
              focusSearchBG:"rgba(36,47,61,1)"

            },
            third: {
              background2Clicked: "rgba(43,82,120,1)",
              onlineDot: "rgba(255,255,255,1)"

            },
            neutral: {
            },
            favColor: {
            },
          },
        };
      case "Monochromacy":
        return {
          palette: {
            mode: "light",
            primary: {
              main: "#000000",
            },
            secondary: {
              main: grey[800],
            },
            third: {
              main: "#303f7f"
            },
            neutral: {
              main: "#c0ca33",
            },
            favColor: {
              main: grey[200],
            },
          },
        };
      case "Tritanopia":
        return {
          palette: {
            mode: "light",
            primary: {
              main: "#c51162",
            },
            secondary: {
              main: "#f06292",
            },
            third: {
              main: "#303f7f"
            },
            neutral: {
              main: "#e91e63",
            },
            favColor: {
              main: grey[200],
            },
          },
        };
      case "Protanopia":
        return {
          palette: {
            mode: "light",
            primary: {
              main: "#4a554d",
            },
            secondary: {
              main: "#4db6ac",
            },
            third: {
              main: "#303f7f"
            },
            neutral: {
              main: "#e91e63",
            },
            favColor: {
              main: grey[200],
            },
          },
        };
      default:
        return {
          palette: {
            mode: "light",
            primary: {
              main: "#303f9f",
            },
            secondary: {
              main: grey[800],
            },
            third: {
              main: "#303f7f"
            },
            neutral: {
              main: "#e91e63",
            },
            favColor: {
              main: grey[200],
            },
          },
        };
    }
  };
  const theme = createTheme(getDesignTokens(colorTheme));


  return (
    <ThemeContext.Provider
      value={{
        themes,
        theme,
        colorTheme,
        setColorTheme,

      }}>
      {children}
    </ThemeContext.Provider>
  )
}



