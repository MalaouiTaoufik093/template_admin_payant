import React, { useEffect,useState,useRef } from 'react';
import { connect } from "react-redux";
import { Button, Form_old, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import AuthService from "services/auth.service";
import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage, 
	signInWithGoogle, 
	signInWithFacebook 
} from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

const required = (value) => {
	if (!value) {
	  return (
		<div className="alert alert-danger" role="alert">
		  This field is required!
		</div>
	  );
	}
  };
 

export const LoginForm = props => {

	const form = useRef();
	const checkBtn = useRef();
	

 	let history = useHistory();
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

	const { 
		otherSignIn, 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		signInWithGoogle,
		signInWithFacebook,
		extra, 
		signIn, 
		token, 
		loading_,
		redirect,
		showMessage,
		message_,
		allowRedirect
	} = props

	const handleLogin = (e) => {
		e.preventDefault();
	
		setMessage("");
		setLoading(true);
		
	
		form.current.validateAll();
	
		if (checkBtn.current.context._errors.length === 0) {
		  AuthService.login(username, password).then(
			() => {
			
			  props.history.push("/");
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
	

	const initialCredential = {
		email: 'user1@themenate.net',
		password: '2005ipo'
	}



	const onGoogleLogin = () => {
		showLoading()
		signInWithGoogle()
	}

	const onFacebookLogin = () => {
		showLoading()
		signInWithFacebook()
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});


	
	const renderOtherSignIn = (
		 
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">or connect with</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button 
					onClick={() => onGoogleLogin()} 
					className="mr-2" 
					disabled={loading} 
					icon={<CustomIcon svg={GoogleSVG}/>}
				>
					Google
				</Button>
				<Button 
					onClick={() => onFacebookLogin()} 
					icon={<CustomIcon svg={FacebookSVG}/>}
					disabled={loading} 
				>
					Facebook
				</Button>
			</div>
		</div>
	)

	

	return (
		<>		
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
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
