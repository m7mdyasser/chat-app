import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext";
import { Typography, useTheme } from "@mui/material";
const Login = () => {
  const { loginInfo, loginUser, updateLoginInfo, loginError, isLoginLoading } = useContext(AuthContext)
  const theme = useTheme();

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
          <Col xs={6}>
            <Stack gap={3} >
              <Typography variant="h4" sx={{textAlign:"center"}}>Login</Typography>
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
              <Button variant="primary" type="submit">
              { isLoginLoading? "Loading..." : "Login"}
              </Button>
              {loginError?.error && <Alert variant="danger"><p>{loginError?.message}</p></Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default Login ;