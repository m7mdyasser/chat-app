import { grey } from "@mui/material/colors";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export const themes = [
  { name: "Light Theme", id: "light", icon: <WbSunnyIcon /> },
  { name: "Dark Theme", id: "dark", icon: <NightsStayIcon /> },
  { name: "Monochromacy", id: "Monochromacy", icon: <BrightnessMediumIcon /> },
  { name: "Tritanopia", id: "Tritanopia", icon: <RemoveRedEyeIcon /> },
  { name: "Protanopia", id: "Protanopia", icon: <RemoveRedEyeOutlinedIcon /> },
];

  export const getDesignTokens = (themeId) => {
    switch (themeId) {
      case "light":
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
              main: "#4553d1"
            },
            neutral: {
              main: "#043baa80",
            },
            favColor: {
              main: grey[200],
            },
          },
        };
      case "dark":
        return {
          palette: {
            mode: "dark",
            primary: {
              main: "#6a5fed",
            },
            secondary: {
              main: "#fff",
            },
            third: {
              main: "#303f7f"
            },
            neutral: {
              main: "#e91e63",
            },
            favColor: {
              main: grey[900],
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

  
