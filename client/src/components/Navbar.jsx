import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Notification from "./Chat/Notification";


const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <Link to="/" className="link-light text-decoration-none"><h2>M Chat</h2></Link>
        {user && <span className="text-warning">loged in as {user?.name} </span>}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {
              user && (<><Notification/> <Link to="/login" onClick={logoutUser} className="link-light text-decoration-none">Logout</Link></> )
            }
            {
              !user && (<>
                <Link to="/login" className="link-light text-decoration-none">Login</Link>
                <Link to="/register" className="link-light text-decoration-none">Register</Link>
              </>)
            }

          </Stack>
        </Nav>
      </Container>
    </Navbar>)
}

export default NavBar 