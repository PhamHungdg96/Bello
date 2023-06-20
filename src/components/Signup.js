import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/login.css';

const Signup = () => {
//   const navigate = useHistory();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

  const handleSubmit = async (values) => {
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmPasswordErrText('');

    const { username, password, confirmPassword } = values;

    let err = false;

    if (!username) {
      err = true;
      setUsernameErrText('Please fill this field');
    }
    if (!password) {
      err = true;
      setPasswordErrText('Please fill this field');
    }
    if (!confirmPassword) {
      err = true;
      setConfirmPasswordErrText('Please fill this field');
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErrText('Confirm password does not match');
    }

    if (err) return;

    setLoading(true);
    window.location.href = '/'
    // try {
    //   const res = await authApi.signup({
    //     username,
    //     password,
    //     confirmPassword,
    //   });
    //   setLoading(false);
    //   localStorage.setItem('token', res.token);
    //   navigate('/');
    // } catch (err) {
    //   const errors = err.data.errors;
    //   errors.forEach((e) => {
    //     if (e.param === 'username') {
    //       setUsernameErrText(e.msg);
    //     }
    //     if (e.param === 'password') {
    //       setPasswordErrText(e.msg);
    //     }
    //     if (e.param === 'confirmPassword') {
    //       setConfirmPasswordErrText(e.msg);
    //     }
    //   });
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div className="login_box">
        <div className="left">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            className="signup_form"
          >
            <div className="name-page">SIGN UP</div>
            <Form.Item
              label={<span style={{ color: 'white' }}>Username</span>}
              name="username"
              required
              validateStatus={usernameErrText ? 'error' : ''}
              help={usernameErrText}

              
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                disabled={loading}
                style={{ height: '50px' }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: 'white' }}>Password</span>}
              name="password"
              required
              validateStatus={passwordErrText ? 'error' : ''}
              help={passwordErrText}

            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                disabled={loading}
                style={{ height: '50px' }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: 'white' }}>Confirm Password</span>}
              name="confirmPassword"
              required
              validateStatus={confirmPasswordErrText ? 'error' : ''}
              help={confirmPasswordErrText}

            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                disabled={loading}
                style={{ height: '50px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ height: '40px' ,  backgroundColor: '#346beb'}}
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
          <Button component={Link} href="/login" block
                  style={{  textTransform: 'none', 
                  backgroundColor: 'inherit', 
                  color: "#fff", 
                  border: 'none'}}>
            Already have an account? Login
          </Button>
          </div>
        <div className="right">
          <div className="right-text"></div>
        </div>
      </div>
    </>
  );
};

export default Signup;