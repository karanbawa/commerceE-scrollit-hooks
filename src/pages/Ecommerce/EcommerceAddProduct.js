import React, { Component } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid";
import { Fragment } from "react"; // import Fragment from React
import { FaCaretDown } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditModal from "components/Common/EditModal";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { element } from "prop-types";
import axios from "axios";
import toastr from "toastr";
import "../../assets/scss/custom/pages/_register.scss";

const optionGroup1 = [
  {
    label: "Picnic",
    options: [
      { label: "tshirt", value: "tshirt" },
      { label: "cotton-tshirt", value: "cotton-tshirt" },
      { label: "crew-neck", value: "crew neck" },
    ],
  },
  {
    label: "Camping",
    options: [
      { label: "backprinted", value: "backprinted" },
      { label: "oversized", value: "overiszed" },
      { label: "basic", value: "basic" },
    ],
  },
];

const showToast = (message, title, statuscode) => {
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
  if (statuscode == 200) {
    toastr.success(message, title);
  } else {
    toastr.error(message, title);
  }
};

class EcommerceAddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      productInfo: {},
      selectedFiles: [],
      metaKeyWords: null,
      productCategory: "INR",
      productName: "",
      brandName: "",
      productDescription: "",
      metaTitle: "",
      productPrice: "",
      productCurrency: "",
      setdisabled: true,
    };
    this.handleMulti2 = this.handleMulti2.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.history.product &&
      this.setState({
        selectedFiles: this.props.history.product.productImages,
        metaKeyWords: this.props.history.product.productSeachKeywords,
        productCategory: this.props.history.product.productCategory,
        productName: this.props.history.product.productName,
        brandName: "",
        productDescription: "",
        metaTitle: this.props.history.product.metaTitle,
        productPrice: this.props.history.product.productPrice,
        productCurrency: this.props.history.product.productCurrency,
      });
    if (this.props.history.location.pathname === "/ecommerce-add-product") {
      this.props.history.product = {};
      this.props.history.push("/ecommerce-add-product");
      this.setState({
        selectedFiles: [],
        metaKeyWords: null,
        productCategory: "INR",
        productName: "",
        brandName: "",
        productDescription: "",
        metaTitle: "",
        productPrice: "",
        productCurrency: "",
      });
    }
  }

  handleMulti2 = metaKeyWords => {
    this.setState({ metaKeyWords });
  };

  toDataURL = url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    );
    this.setState(prevState => ({
      selectedFiles: prevState.selectedFiles.concat(files),
    }));

    // this.state.selectedFiles.forEach(element => {
    //   element.imageBase64 = "";
    // });
    // this.state.selectedFiles.map(file => {
    //   const img = file.preview;

    //   this.toDataURL(img).then(dataUrl => {
    //     file.imageBase64 = dataUrl;
    //   });
    // });
  };

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  productCategoryChange = event => {
    this.setState({
      productCategory: event.target.value,
    });
  };

  productCurrencyChange = event => {
    this.setState({
      productCurrency: event.target.value,
    });
  };

  productNameChange = event => {
    this.setState({
      productName: event.target.value,
    });
  };

  brandNameChange = event => {
    this.setState({
      brandName: event.target.value,
    });
  };

  productDescriptionChange = event => {
    this.setState({
      productDescription: event.target.value,
    });
  };

  metaTitleChange = event => {
    this.setState({
      metaTitle: event.target.value,
    });
  };

  productPriceChange = event => {
    this.setState({
      productPrice: event.target.value,
    });
  };

  render() {
    const options = [
      { value: "AK", label: "Alaska" },
      { value: "HI", label: "Hawaii" },
      { value: "CA", label: "California" },
      { value: "NV", label: "Nevada" },
      { value: "OR", label: "Oregon" },
      { value: "WA", label: "Washington" },
    ];
    const { metaKeyWords } = this.state;
    const { isEdit, editModal } = this.state;

    const onClickEdit = e => {
      e.preventDefault();
      this.setState({ editModal: true });
    };

    const editHandler = e => {
      e.preventDefault();
      const editprodcutDetails = {
        id: this.props.history.product.id,
        productName: this.state.productName.toLowerCase(),
        productCategory: this.state.productCategory.toLowerCase(),
        // brandName: this.state.brandName.toLowerCase(),
        productDescription: this.state.productDescription.toLowerCase(),
        productPrice: this.state.productPrice,
        productCurrency: this.state.productCurrency,
        productImages: this.state.selectedFiles,
        metaTitle: this.state.metaTitle.toLowerCase(),
        metaKeyWords: this.state.metaKeyWords,
        productDate: "2019-08-29",
      };
      const res = this.props.products.find((item, index) => {
        if (item.id == this.props.history.product.id) {
          this.props.products[index] = editprodcutDetails;
        }
      });

      this.setState({ editModal: false });
      console.log(this.props.products);
      showToast("Edit successfull", "Success", 200);
    };

    const submitHandler = e => {
      e.preventDefault();

      const prodcutDetails = {
        productName: this.state.productName.toLowerCase(),
        productCategory: this.state.productCategory.toLowerCase(),
        brandName: this.state.brandName.toLowerCase(),
        productDescription: this.state.productDescription.toLowerCase(),
        productPrice: this.state.productPrice,
        productCurrency: this.state.productCurrency,
        productImages: this.state.selectedFiles,
        metaTitle: this.state.metaTitle.toLowerCase(),
        metaKeyWords: this.state.metaKeyWords,
        priceCode: 1,
      };
      try {
        let axiosConfig = {
          headers: {
            Accept: "application/soap+xml; charset=utf-8",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        };
        axios
          .post("http://localhost:8080/v1/products/newproduct", axiosConfig)
          .then(res => {
            showToast("Product successfully added", "Success", 200);
            cancelHandler(e);
          })
          .catch(error => {
            console.log(error);
            showToast("Oops! product failed to add. Try Again.", "Error", 500);
          });
      } catch (error) {
        console.log(error);
      }
      console.log(prodcutDetails);
    };

    const disableHandler = () => {
      if (!this.state.productName && !this.state.productCategory) {
        this.setState({ setdisabled: true });
      }
    };

    const cancelHandler = e => {
      e.preventDefault();
      this.setState({
        selectedFiles: [],
        metaKeyWords: null,
        productCategory: "INR",
        productName: "",
        brandName: "",
        productDescription: "",
        metaTitle: "",
        productPrice: "",
        productCurrency: "",
      });
    };
    const remove = file => {
      const newFiles = [...this.state.selectedFiles];
      newFiles.splice(file, 1);
      this.setState({ selectedFiles: newFiles });
    };

    return (
      <React.Fragment>
        <EditModal
          show={editModal}
          onEditClick={editHandler}
          onCloseClick={() => {
            showToast("Edit failed", "Error", 500);
            this.setState({ editModal: false });
          }}
        />
        <div className="page-content">
          <MetaTags>
            <title>
              Add Product | Skote - React Admin & Dashboard Template
            </title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title="Ecommerce"
              breadcrumbItem={
                this.props.history.product &&
                this.props.history.location.pathname ==
                  "/ecommerce-edit-product"
                  ? "Edit Product"
                  : "Add Product"
              }
            />

            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Basic Information</CardTitle>
                    <p className="card-title-desc">
                      Fill all information below
                    </p>

                    <Form>
                      <Row>
                        <Col sm="6">
                          <FormGroup className="mb-3 ">
                            <Label
                              for="productname"
                              className="form-label required"
                            >
                              Product Name
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="text"
                              value={this.state.productName}
                              onChange={this.productNameChange}
                              className="form-control"
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label htmlFor="manufacturerbrand">
                              Brand Name
                            </Label>
                            <Input
                              id="manufacturerbrand"
                              name="manufacturerbrand"
                              type="text"
                              value={this.state.brandName}
                              onChange={this.brandNameChange}
                              className="form-control"
                            />
                          </FormGroup>
                          <FormGroup className="mb-3   ">
                            <Label htmlFor="price" className="required">
                              Price
                            </Label>
                            <InputGroup>
                              <select
                                className="form-control w-25 bg-dark text-white"
                                onChange={this.productCurrencyChange}
                                value={this.state.productCurrency}
                              >
                                {/* <FaCaretDown /> */}
                                <option>
                                  Select Currency
                                  {/* <span>
                                    <i className="fas fa-ad"></i>
                                  </span> */}
                                </option>
                                <option value="INR">INR</option>
                                <option value="AED">AED</option>
                              </select>
                              <Input
                                id="price"
                                name="price"
                                type="text"
                                value={this.state.productPrice}
                                onChange={this.productPriceChange}
                                className="form-control w-50 "
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                          <FormGroup className="mb-3">
                            <Label className="control-label required">
                              {" "}
                              Product Category
                            </Label>
                            <select
                              className="form-control select2"
                              onChange={this.productCategoryChange}
                              value={this.state.productCategory}
                            >
                              <option>Select</option>
                              <option value="clothing">Clothing</option>
                              <option value="food">Food</option>
                            </select>
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label htmlFor="productdesc">
                              Product Description
                            </Label>
                            <textarea
                              className="form-control"
                              id="productdesc"
                              rows="5"
                              value={this.state.productDescription}
                              onChange={this.productDescriptionChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>

                  <Card>
                    <CardBody>
                      <CardTitle className="mb-3 h4">Product Images</CardTitle>
                      <Form className="dropzone">
                        <Dropzone
                          onDrop={acceptedFiles => {
                            this.handleAcceptedFiles(acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div>
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="dz-message needsclick">
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {this.state.selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2 d-flex justify-content-between w-25">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>

                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                  <button
                                    className="avatar-sm rounded-circle border-white bg-light"
                                    onClick={e => {
                                      e.preventDefault();
                                      remove(f);
                                    }}
                                  >
                                    X
                                  </button>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </Form>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col sm={6}>
                            <div className="mb-3">
                              <Label htmlFor="metatitle">
                                Product Title For Search
                              </Label>
                              <Input
                                id="metatitle"
                                name="productname"
                                type="text"
                                className="form-control"
                                value={this.state.metaTitle}
                                onChange={this.metaTitleChange}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="mb-3">
                              <Label htmlFor="metakeywords">
                                Enter Search Keywords
                              </Label>
                              <Select
                                value={metaKeyWords}
                                isMulti={true}
                                onChange={this.handleMulti2}
                                options={optionGroup1}
                                classNamePrefix="select2-selection"
                                // isLoading={true}
                              />
                            </div>
                          </Col>

                          {/* <Col sm={6}>
                          <div className="mb-3">
                            <Label htmlFor="metadescription">
                              Meta Description
                            </Label>
                            <textarea
                              className="form-control"
                              id="metadescription"
                              rows="5"
                            />
                          </div>
                        </Col> */}
                        </Row>
                        {this.props.history.product &&
                        this.props.history.location.pathname ==
                          "/ecommerce-edit-product" ? (
                          <Button
                            type="submit"
                            color="primary"
                            className="me-1"
                            disabled={
                              !this.state.productName ||
                              !this.state.productCategory ||
                              !this.state.productPrice
                                ? true
                                : ""
                            }
                            onClick={e => onClickEdit(e)}
                          >
                            Edit Product
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            color="primary"
                            className="me-1"
                            disabled={
                              !this.state.productName ||
                              !this.state.productCategory ||
                              !this.state.productPrice
                                ? true
                                : ""
                            }
                            onClick={submitHandler}
                          >
                            Add Product
                          </Button>
                        )}{" "}
                        <Button
                          type="submit"
                          color="secondary"
                          onClick={cancelHandler}
                        >
                          Cancel
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
EcommerceAddProduct.propTypes = {
  products: PropTypes.array,
  className: PropTypes.any,
  history: PropTypes.any,
  product: PropTypes.object,
};

const mapStateToProps = state => ({
  products: state.ecommerce.products,
  product: state.ecommerce.product,
});

// const mapDispatchToProps = dispatch => ({
//   onGetProducts: () => dispatch(getProductsTest()),
//   onAddNewProduct: product => dispatch(addNewProduct(product)),
//   onUpdateProduct: product => dispatch(updateProduct(product)),
//   onDeleteProduct: product => dispatch(deleteProduct(product)),
// });

export default connect(mapStateToProps)(withRouter(EcommerceAddProduct));
