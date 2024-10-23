import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Notification from "./Chat/Notification";
import { Box, useTheme } from "@mui/material";


const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const theme = useTheme();
  return (
    <Box sx={{backgroundColor:"rgba(241,241,241,255)", display:"flex",height:"40px"}} >
      <Container style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
        <Link to="/" style={{color:"black", textDecoration:"none"}}><h2>M Chat</h2></Link>
        
        {user && <span className="text-warning">{user?.name} </span>}
        
        <Nav>
        
          <Stack direction="horizontal" gap={3}>
          
            {
              user && (<><Notification /> <Link to="/login" onClick={logoutUser}style={{color:"black", textDecoration:"none"}}>Logout</Link></> )
            }
            
            {
              !user && (<>
                <Link to="/login" style={{color:"black", textDecoration:"none"}}>Login</Link>
                <Link to="/register" style={{color:"black", textDecoration:"none"}}>Register</Link>
              </>)
            }
            
          </Stack>
          
        </Nav>
        
      </Container>
    </Box>)
}

export default NavBar 