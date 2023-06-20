import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/login.css';
function Login() {

  const handleSubmit = (email, password) => {
    //reqres registered sample user
    const loginPayload = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
    // const loginPayload = {
    //   email: email,
    //   password: password
    // }

    axios.post("https://reqres.in/api/login", loginPayload)
      .then(response => {
        //get token from response
        const token = response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/'

      })
      .catch(err => console.log(err));
  };

  return (
    
      <div className="login_box">
        <div className="left">
          <div className="name-page">
              <h3 style={{color:'#fff'}}>SIGN IN</h3>
          </div>
          <form
              onSubmit={(event) => {
                event.preventDefault()
                const [email, password] = event.target.children;
                handleSubmit(email, password);
              }}
            >
             <div style={{textAlign: 'left', color: '#fff', fontFamily: 'Dancing Scrip'}}>
              <label for="email">Email</label><br />
              <Input prefix={<UserOutlined />} placeholder="Username"  style={{ height: '50px' }} />
              <label for="password">Password</label><br />
              <Input prefix={<LockOutlined />} type="password" placeholder="Password"  style={{ height: '50px' }}/>
              <Button type="primary" htmlType="submit" className="login-form-button" 
                      block style={{ height: '40px', marginTop: '30px', backgroundColor: '#346beb' }}>
                   Login
              </Button>
             </div>
          </form>
          <Button type="link" component={Link} href="/signup"
                  style={{  textTransform: 'none', 
                            backgroundColor: 'inherit', 
                            color: "#fff", 
                            border: 'none'}}>
              Don't have an account? Signup
          </Button>
        </div>
        <div className="right">
          <div className="right-text"></div>
        </div>
      </div>
  );
}
export default Login;