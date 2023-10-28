import { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import logo from "../../../../assets/logoBlack.png";
import "./LoginStyle.css";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import { useAuth } from "../../../../authentication/AuthCustom";
import { useNavigate } from "react-router-dom";
import userService from "../../../../services/UserService";
import { setCommonHeaders } from "../../../../utils/axiosCustomize";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const errorParams = new URLSearchParams(window.location.search).get("error");
  const dataLocalStorage = JSON.parse(localStorage.getItem("user"));
  const BASE_URL_FACEBOOK_LOGIN =
    "http://localhost:8088/oauth2/authorization/facebook";
  const BASE_URL_GOOGLE_LOGIN =
    "http://localhost:8088/oauth2/authorization/google";

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    userService
      .login(data)
      .then((res) => {
        console.log("data respone" + res.data);
        login(res.data);
        setCommonHeaders(res.data.accessToken);
        toast.success("Đăng Nhập Thành Công");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng Nhập Thất Bại");
      });
  };

  const handleLoginFacebook = () => {
    window.location.href = BASE_URL_FACEBOOK_LOGIN;
  };

  const handleLoginGoogle = () => {
    window.location.href = BASE_URL_GOOGLE_LOGIN;
  };

  const checkLogin = () => {
    if (dataLocalStorage !== null && dataLocalStorage !== undefined) {
      const data = {
        email: dataLocalStorage.email,
        accessToken: dataLocalStorage.accessToken,
        role: dataLocalStorage.role,
      };
      login(data);
      setCommonHeaders(dataLocalStorage.accessToken);
      navigate("/admins");
    }
  };

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errorParams) {
      toast.error("Tài Khoản Không Tồn Tại! Vui Lòng Liên Hệ Quản Trị Viên");
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [errorParams]);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col lg={4} md={6} sm={8} lgOffset={4} mdOffset={3} smOffset={2}>
            <div className="brand-logo text-center">
              <img src={logo} alt="brand-logo" />
            </div>
            <div className="authfy-login">
              <div className="authfy-panel panel-login text-center active">
                <div className="authfy-heading">
                  <h3 className="auth-title">Đăng Nhập</h3>
                </div>
                <Row className="social-buttons">
                  <Col>
                    <Button
                      className="btn-facebook w-100 text-light d-flex align-items-center justify-content-center"
                      onClick={handleLoginFacebook}
                    >
                      <FaFacebook color="white" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="btn-google w-100 text-light d-flex align-items-center justify-content-center"
                      onClick={handleLoginGoogle}
                    >
                      <FaGoogle color="white" />
                    </Button>
                  </Col>
                </Row>
                <Row className="loginOr">
                  <Col xs={12} sm={12}>
                    <hr className="hrOr" />
                    <span className="spanOr">or</span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12}>
                    <Form name="loginForm" className="loginForm">
                      <Form.Control
                        type="email"
                        className="form-control email"
                        name="username"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="pwdMask">
                        <Form.Control
                          type="password"
                          className="form-control password"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="fa fa-eye-slash pwd-toggle"></span>
                      </div>
                      <div className="d-flex justify-content-end mb-5">
                        <a href="#">
                          <small style={{ textDecoration: "underline" }}>
                            Quên Mật Khẩu?
                          </small>
                        </a>
                      </div>
                      <div className="d-flex justify-content-around">
                        <Button
                          variant="warning"
                          className="text-light"
                          onClick={(e) => handleLogin(e)}
                        >
                          Đăng Nhập
                        </Button>
                        <Link to="/">
                          <Button variant="dark">Hủy</Button>
                        </Link>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </div>
              <div className="authfy-panel panel-signup text-center">
                <Row>
                  <Col xs={12} sm={12}>
                    <div className="authfy-heading">
                      <h3 className="auth-title">Sign up for free!</h3>
                    </div>
                    <Form
                      name="signupForm"
                      className="signupForm"
                      action="#"
                      method="POST"
                    >
                      <Form.Group>
                        <Form.Control
                          type="email"
                          className="form-control"
                          name="username"
                          placeholder="Email address"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="fullname"
                          placeholder="Full name"
                        />
                      </Form.Group>
                      <Form.Group>
                        <div className="pwdMask">
                          <Form.Control
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                          />
                          <span className="fa fa-eye-slash pwd-toggle"></span>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <p className="term-policy text-muted small">
                          I agree to the <a href="#">privacy policy</a> and{" "}
                          <a href="#">terms of service</a>.
                        </p>
                      </Form.Group>
                      <Form.Group>
                        <Button
                          className="btn btn-lg btn-primary btn-block"
                          type="submit"
                        >
                          Sign up with email
                        </Button>
                      </Form.Group>
                    </Form>
                    <a
                      className="lnk-toggler"
                      data-panel=".panel-login"
                      href="#"
                    >
                      Already have an account?
                    </a>
                  </Col>
                </Row>
              </div>
              {/* ./panel-signup */}
              {/* panel-forget start */}
              <div className="authfy-panel panel-forgot">
                <Row>
                  <Col xs={12} sm={12}>
                    <div className="authfy-heading">
                      <h3 className="auth-title">Recover your password</h3>
                      <p>
                        Fill in your e-mail address below and we will send you
                        an email with further instructions.
                      </p>
                    </div>
                    <Form
                      name="forgetForm"
                      className="forgetForm"
                      action="#"
                      method="POST"
                    >
                      <Form.Group>
                        <Form.Control
                          type="email"
                          className="form-control"
                          name="username"
                          placeholder="Email address"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Button
                          className="btn btn-lg btn-primary btn-block"
                          type="submit"
                        >
                          Recover your password
                        </Button>
                      </Form.Group>
                      <Form.Group>
                        <a
                          className="lnk-toggler"
                          data-panel=".panel-login"
                          href="#"
                        >
                          Already have an account?
                        </a>
                      </Form.Group>
                      <Form.Group>
                        <a
                          className="lnk-toggler"
                          data-panel=".panel-signup"
                          href="#"
                        >
                          Don’t have an account?
                        </a>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LoginPage;
