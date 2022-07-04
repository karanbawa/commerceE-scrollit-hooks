import React, { Component } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

//Import config
import { facebook, google } from "../../config";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";
import "../../assets/scss/custom/pages/_register.scss";
import toastr from "toastr";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.props.apiError("");
  }

  signIn = (res, type) => {
    const { socialLogin } = this.props;
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      socialLogin(postData, this.props.history, type);
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      socialLogin(postData, this.props.history, type);
    }
  };

  //handleGoogleLoginResponse
  googleResponse = response => {
    this.signIn(response, "google");
  };

  //handleTwitterLoginResponse
  twitterResponse = () => {};

  //handleFacebookLoginResponse
  facebookResponse = response => {
    this.signIn(response, "facebook");
  };

  render() {
    const showToast = (message, title) => {
      toastr.options = {
        positionClass: "toast-top-right",
        newestOnTop: true,
        extendedTimeOut: 1000,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 5000,
        closeButton: true,
        debug: true,
        preventDuplicates: true,
        extendedTimeOut: 1000,
      };
      toastr.error(message, title);
    };
    let users = [
      {
        uid: 1,
        username: "shravan",
        role: "admin",
        password: "Shravan@2001",
        email: "s@gmail.com",
      },
    ];
    const showPassword = () => {
      this.setState({ show: !this.state.show });
    };
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>Sign in to continue to Skote.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={lightlogo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                      <Link to="/" className="auth-logo-dark">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      {this.props.error && this.props.error ? (
                        <Alert color="danger">{this.props.error}</Alert>
                      ) : null}
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email: (this.state && this.state.email) || "",
                          password: (this.state && this.state.password) || "",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string()
                            .email("Invalid Email")
                            .required("Please Enter Your Email"),
                          password: Yup.string()
                            .required("Please Enter your password")
                            .matches(
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                            )
                            .min(8, "Must be greater than 8 characters")
                            .max(16, "Must be less than 16 characters"),
                        })}
                        onSubmit={values => {
                          let { email, password } = values;
                          email = email.toLowerCase();

                          let obj1 = users.find(x => x.email == email);
                          if (obj1 == null) {
                            showToast(
                              "Wrong email or password",
                              "Login failed"
                            );
                          } else {
                            console.log(obj1.password, password);
                            if (obj1.password == password) {
                              this.props.loginUser(values, this.props.history);
                              console.log(values);
                            } else {
                              showToast(
                                "Wrong email or password",
                                "Login failed"
                              );
                            }
                          }
                        }}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label
                                for="email"
                                className="form-label required"
                              >
                                Email
                              </Label>
                              <Field
                                name="email"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label
                                for="password"
                                className="form-label required"
                              >
                                Password
                              </Label>
                              <div className="input-group auth-pass-inputgroup">
                                <Field
                                  name="password"
                                  type={this.state.show ? "text" : "password"}
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <button
                                  className="btn btn-light "
                                  type="button"
                                  id="password-addon"
                                  onClick={showPassword}
                                >
                                  <i className="mdi mdi-eye-outline"></i>
                                </button>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <h5 className="font-size-14 mb-3">
                                Sign in with
                              </h5>

                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <FacebookLogin
                                    appId={facebook.APP_ID}
                                    autoLoad={false}
                                    callback={this.facebookResponse}
                                    render={renderProps => (
                                      <Link
                                        to={""}
                                        className="social-list-item bg-primary text-white border-primary"
                                      >
                                        <i className="mdi mdi-facebook" />
                                      </Link>
                                    )}
                                  />
                                </li>
                                <li className="list-inline-item">
                                  {google.CLIENT_ID === "" ? (
                                    ""
                                  ) : (
                                    <GoogleLogin
                                      clientId={google.CLIENT_ID}
                                      render={renderProps => (
                                        <Link
                                          to={""}
                                          className="social-list-item bg-danger text-white border-danger"
                                        >
                                          <i className="mdi mdi-google" />
                                        </Link>
                                      )}
                                      onSuccess={this.googleResponse}
                                      onFailure={() => {}}
                                    />
                                  )}
                                </li>
                              </ul>
                            </div>

                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1" /> Forgot your
                                password?
                              </Link>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Don&apos;t have an account ?
                    <Link to="register" className="fw-medium text-primary">
                      Signup Now
                    </Link>
                  </p>
                  <p>
                    © {new Date().getFullYear()} Skote. Crafted with
                    <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};

const mapStateToProps = state => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
);
