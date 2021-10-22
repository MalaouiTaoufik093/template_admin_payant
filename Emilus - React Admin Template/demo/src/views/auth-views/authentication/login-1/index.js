import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//import { Route , withRouter} from 'react-router-dom';
import AuthService from "services/auth.service";
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    let history = useHistory();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
			
          //props.history.push("/forgot-password");
          // <Redirect to="/" />
          history.push("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="logo2.jpg"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Connecter</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      
      </div>
    </div>
  );
};

export default Login;

// import React from 'react'
// import LoginForm from '../../components/LoginForm'
// import Login from '../../components/Login'
// import { Card, Row, Col } from "antd";
// import { useSelector } from 'react-redux';

// const backgroundStyle = {
// 	backgroundImage: 'url(/img/others/img-17.jpg)',
// 	backgroundRepeat: 'no-repeat',
// 	backgroundSize: 'cover'
// }

// const LoginOne = props => {
// 	const theme = useSelector(state => state.theme.currentTheme)
// 	return (
// 		<div className="h-100" style={backgroundStyle}>
// 			<div className="container d-flex flex-column justify-content-center h-100">
// 				<Row justify="center">
// 					<Col xs={20} sm={20} md={20} lg={7}>
// 						<Card>
// 							<div className="my-4">
// 								<div className="text-center">
// 									<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" />
// 									<p>Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p>
// 								</div>
// 								<Row justify="center">
// 									<Col xs={24} sm={24} md={20} lg={20}>
// 										{/* <LoginForm {...props} /> */}
// 										<Login {...props} />
// 									</Col>
// 								</Row>
// 							</div>
// 						</Card>
// 					</Col>
// 				</Row>
// 			</div>
// 		</div>
// 	)
// }

// export default LoginOne
