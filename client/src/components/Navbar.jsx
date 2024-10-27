import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Notification from "./Chat/Notification";
import { Box, colors, Typography, useTheme } from "@mui/material";


const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const theme = useTheme();
  return (
    <Box sx={{backgroundColor:theme.palette.primary.navBarBG, display:"flex",height:"35px"}} >
      <Container style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
        <Link to="/" style={{color:"black", textDecoration:"none" ,  }}><Typography variant="h4" sx={{margin:"0" ,color :theme.palette.primary.main ,fontSize:'30px' }}>M Chat</Typography></Link>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (<><Notification  /> <Link to="/login" onClick={logoutUser}style={{color :theme.palette.primary.main, textDecoration:"none",fontSize:"18px"}}>Logout</Link></> )}
            {
              !user && (<>
                <Link to="/login" style={{color :theme.palette.primary.main, textDecoration:"none",fontSize:"18px"}}>Login</Link>
                <Link to="/register" style={{color :theme.palette.primary.main, textDecoration:"none",fontSize:"18px"}}>Register</Link>
              </>)
            }
          </Stack>
        </Nav>
      </Container>
    </Box>)
}

export default NavBar 