import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";
import "../../assets/scss/custom/pages/_register.scss";

import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormik,
  useFormikContext,
} from "formik";
import * as Yup from "yup";

// action
import {
  apiError,
  registerUser,
  registerUserFailed,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { values } from "lodash";
import toastr from "toastr";

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

const usersList = [
  {
    firstName: "shravan",
    lastName: "thombre",
    email: "s@gmail.com",
    password: "123456",
    isActive: "true",
    isVerifiedMail: "false",
  },
  {
    firstName: "mandar",
    lastName: "rane",
    email: "m@gmail.com",
    password: "123456",
    isActive: "true",
    isVerifiedMail: "false",
  },
  {
    firstName: "anurag",
    lastName: "roy",
    email: "a@gmail.com",
    password: "123456",
    isActive: "true",
    isVerifiedMail: "true",
  },
];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputValue: "",
    };
  }

  componentDidMount() {
    this.props.apiError("");
    this.props.registerUserFailed("");
  }

  render() {
    const HandleUpperCase = (value, setFieldValue, fieldName) => {
      const formatted_value = value.charAt(0).toUpperCase() + value.slice(1);
      setFieldValue(fieldName, formatted_value);
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
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free Skote account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          firstName: (this.state && this.state.firstName) || "",
                          lastName: (this.state && this.state.lastName) || "",
                          email: (this.state && this.state.email) || "",
                          phoneNumber:
                            (this.state && this.state.phoneNumber) || "",
                          password: (this.state && this.state.password) || "",
                          confirmPassword:
                            (this.state && this.state.confirmPassword) || "",
                        }}
                        validationSchema={Yup.object().shape({
                          firstName: Yup.string().required(
                            "Please enter firstname"
                          ),
                          lastName: Yup.string().required(
                            "Please enter your lastname"
                          ),
                          email: Yup.string()
                            .email("Invalid email")
                            .required("Please Enter Your Email"),
                          phoneNumber: Yup.string()
                            .required()
                            .matches(/^[0-9]+$/, "Must be only digits")
                            .min(10, "Must be exactly 10 digits")
                            .max(10, "Must be exactly 10 digits"),
                          password: Yup.string()
                            .required("Please Enter your password")
                            .matches(
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                            )
                            .min(8, "Must be greater than 8 characters")
                            .max(16, "Must be less than 16 characters"),
                          confirmPassword: Yup.string().test(
                            "passwords-match",
                            "Password do not match",
                            function (value) {
                              return this.parent.password === value;
                            }
                          ),
                        })}
                        onSubmit={values => {
                          // this.props.registerUser(values);
                          let {
                            confirmPassword,
                            firstName,
                            lastName,
                            email,
                            ...otherData
                          } = values;
                          firstName = firstName.toLowerCase();
                          lastName = lastName.toLowerCase();
                          email = email.toLowerCase();
                          const userData = {
                            firstName,
                            lastName,
                            email,
                            ...otherData,
                          };

                          let obj = usersList.find(
                            x => x.email == userData.email
                          );

                          if (obj == null) {
                            console.log(userData);
                          } else {
                            showToast(
                              "user already registered with this email",
                              "Signup Failed"
                            );
                          }
                        }}
                      >
                        {({
                          values,
                          errors,
                          status,
                          touched,
                          setFieldValue,
                          handleChange,
                          isValid,
                        }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label
                                for="firstName"
                                className="form-label required"
                              >
                                First Name
                              </Label>
                              <Field
                                name="firstName"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.firstName && touched.firstName
                                    ? " is-invalid"
                                    : "")
                                }
                                value={values.firstName}
                                onChange={e => {
                                  handleChange(e);
                                  HandleUpperCase(
                                    e.target.value,
                                    setFieldValue,
                                    "firstName"
                                  );
                                }}
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label
                                for="lastName"
                                className="form-label required"
                              >
                                Last Name
                              </Label>
                              <Field
                                name="lastName"
                                type="text"
                                className={
                                  "form-control required" +
                                  (errors.lastName && touched.lastName
                                    ? " is-invalid"
                                    : "")
                                }
                                value={values.lastName}
                                onChange={e => {
                                  handleChange(e);
                                  HandleUpperCase(
                                    e.target.value,
                                    setFieldValue,
                                    "lastName"
                                  );
                                }}
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label
                                for="email"
                                className="form-label required"
                              >
                                Email
                              </Label>
                              <Field
                                name="email"
                                type="email"
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
                                for="phoneNumber"
                                className="form-label required"
                              >
                                Mobile Number
                              </Label>
                              <Field
                                name="phoneNumber"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.phoneNumber && touched.phoneNumber
                                    ? " mobile number is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="phoneNumber"
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
                              <Field
                                name="password"
                                autoComplete="true"
                                type="password"
                                className={
                                  "form-control" +
                                  (errors.password && touched.password
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label
                                for="confirmPassword"
                                className="form-label required"
                              >
                                Confirm Password
                              </Label>
                              <Field
                                name="confirmPassword"
                                autoComplete="true"
                                type="password"
                                className={
                                  "form-control" +
                                  (errors.confirmPassword &&
                                  touched.confirmPassword
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                disabled={!isValid}
                              >
                                Sign Up
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                By registering you agree to the Skote{" "}
                                <Link to="#" className="text-primary">
                                  Terms of Use
                                </Link>
                              </p>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link to="/login" className="fw-medium text-primary">
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Univolen. Crafted With{" "}
                    <i className="mdi mdi-heart text-danger" /> by Univolen It
                    solution
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

Register.propTypes = {
  apiError: PropTypes.any,
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.any,
  registrationError: PropTypes.any,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register);
