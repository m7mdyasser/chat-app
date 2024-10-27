import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext";
import { useTheme ,Typography } from "@mui/material";
const Register = () => {
const {registerInfo , updateRegisterInfo ,registerUser , registerError ,isRegisterLoading } = useContext(AuthContext)
const theme = useTheme();

  return (
    <>
      <Form onSubmit={registerUser} >
        <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
          <Col xs={6}>

            <Stack gap={3}>
              <Typography variant="h4" sx={{textAlign:"center"}}>Register</Typography>
              <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value.trim() })}  />
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
              <Button variant="primary" type="submit">
              {isRegisterLoading ? "Creating your account" : "Register"}
              </Button>
              {
              registerError?.error &&  <Alert variant="danger"><p>{registerError?.message}</p></Alert>
              }
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default Register