import { Form, Button } from "react-bootstrap"

const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword
}) => (
  <Form onSubmit={handleLogin}>
    <h2>Login</h2>
    <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={handleUsername}
      />
    </Form.Group>

    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        id="password"
        value={password}
        name="Password"
        onChange={handlePassword}
      />
    </Form.Group>

    <Button variant="primary" className="m-2" type="submit">Login</Button>
  </Form>
)

export default LoginForm