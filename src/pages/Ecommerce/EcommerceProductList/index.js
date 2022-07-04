import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { withRouter } from "react-router-dom";
import { isEmpty, size } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
import * as moment from "moment";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Badge,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import { getProductsTest } from "store/actions";

import EcommerceProductModal from "./EcommerceProductModal";
import DeleteModal from "../../../components/Common/DeleteModal";
import axios from "axios";

class EcommerceProducts extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      viewmodal: false,
      modal: false,
      products: [],
      product: {},
      toggleSwitch: false,
      deleteModal: false,
      EcommerceProductColumns: [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
          formatter: (cellContent, user) => <>{product.id}</>,
        },
        {
          dataField: "id",
          text: "PRODUCT ID",
          sort: true,
          formatter: (cellContent, row) => (
            <Link to="#" className="text-body fw-bold">
              {row.id}
            </Link>
          ),
        },
        {
          dataField: "productName",
          text: "Product Name",
          sort: true,
        },
        {
          dataField: "productCategory",
          text: "Category",
          sort: true,
          // formatter: (cellContent, row) => this.handleValidDate(row.orderdate),
        },
        {
          dataField: "productDate",
          text: "Date",
          sort: true,
          formatter: (cellContent, row) =>
            this.handleValidDate(row.productDate),
        },
        {
          dataField: "displayProduct",
          text: "Display Product",
          sort: true,
          formatter: () => (
            <div className="form-check form-switch form-switch-md mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizemd"
                defaultChecked
                onClick={() => {
                  this.setState({
                    toggleSwitch: !this.state.toggleSwitch,
                  });
                }}
              />
              <label
                className="form-check-label"
                htmlFor="customSwitchsizemd"
              ></label>
            </div>
          ),
        },
        {
          dataField: "productPrice",
          text: "PriceCode",
          sort: true,
        },

        {
          dataField: "view",
          isDummyField: true,
          text: "View Details",
          sort: true,
          formatter: (cellContent, product) => (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => {
                this.setState({
                  product,
                });
                this.toggleViewModal();
              }}
            >
              View Details
            </Button>
          ),
        },
        {
          dataField: "action",
          isDummyField: true,
          text: "Action",
          formatter: (cellContent, product) => (
            <>
              <div className="d-flex gap-3">
                <Link to="#" className="text-success">
                  <i
                    className="mdi mdi-pencil font-size-18"
                    id="edittooltip"
                    onClick={() => this.handleProductClick(product)}
                  />
                </Link>
                <Link to="#" className="text-danger">
                  <i
                    className="mdi mdi-delete font-size-18"
                    id="deletetooltip"
                    onClick={() => this.onClickDelete(product)}
                  />
                </Link>
              </div>
            </>
          ),
        },
      ],
    };

    this.handleProductClick = this.handleProductClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleAddProductClick = this.handleAddProductClick.bind(this);
    this.toLowerCase1 = this.toLowerCase1.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  toLowerCase1(str) {
    return str.toLowerCase();
  }

  componentDidMount() {
    console.log(this.props);
    let { products, onGetProducts } = this.props;

    if (this.state.products && !this.state.products.length) {
      onGetProducts();
    }
    this.setState({ products });
    console.log(products);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { products } = this.props;
    if (!isEmpty(products) && size(prevProps.products) !== size(products)) {
      this.setState({ product: {}, isEdit: false });
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleAddProductClick = history => {
    history.push("/ecommerce-add-product");
    this.setState({ product: "", isEdit: false });
    this.toggle();
  };

  toggleViewModal = () => {
    this.setState(prevState => ({
      viewmodal: !prevState.viewmodal,
    }));
  };

  onPaginationPageChange = page => {
    if (
      this.node &&
      this.node.current &&
      this.node.current.props &&
      this.node.current.props.pagination &&
      this.node.current.props.pagination.options
    ) {
      this.node.current.props.pagination.options.onPageChange(page);
    }
  };

  /* Insert,Update Delete data */

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal,
    }));
  };

  onClickDelete = product => {
    this.setState({ product: product });
    this.setState({ deleteModal: true });
  };

  handleDeleteProduct = () => {
    const { onDeleteProduct } = this.props;
    const { product } = this.state;
    if (product.id !== undefined) {
      onDeleteProduct(product);
      this.onPaginationPageChange(1);
      this.setState({ deleteModal: false });
    }
  };

  handleProductClick = arg => {
    const product = arg;

    this.setState({
      order: {
        id: product.id,
        productId: product.productId,
        productName: product.productName,
        productDate: product.productDate,
        total: product.total,
        paymentStatus: product.paymentStatus,
        paymentMethod: product.paymentMethod,
        badgeclass: product.badgeclass,
      },
      isEdit: true,
    });

    this.toggle();
  };

  handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  render() {
    const { products } = this.props;

    const product = this.state.product;

    const { SearchBar } = Search;

    const { isEdit, deleteModal } = this.state;

    const { onAddNewProduct, onUpdateProduct } = this.props;

    //pagination customization
    const pageOptions = {
      sizePerPage: 10,
      totalSize: products.length, // replace later with size(Order),
      custom: true,
    };

    const defaultSorted = [
      {
        dataField: "orderId",
        order: "desc",
      },
    ];

    const selectRow = {
      mode: "checkbox",
    };

    const { history } = this.props;

    return (
      <React.Fragment>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={this.handleDeleteProduct}
          onCloseClick={() => this.setState({ deleteModal: false })}
        />
        <EcommerceProductModal
          isOpen={this.state.viewmodal}
          toggle={this.toggleViewModal}
          product={product}
        />
        <div className="page-content">
          <MetaTags>
            <title>Products</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions || [])}
                      keyField="id"
                      columns={this.state.EcommerceProductColumns || []}
                      data={products || []}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={products}
                          columns={this.state.EcommerceProductColumns || []}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded mb-2 me-2"
                                      onClick={() =>
                                        this.handleAddProductClick(history)
                                      }
                                    >
                                      <i className="mdi mdi-plus me-1" /> Add
                                      New Product
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <div className="table-responsive">
                                <BootstrapTable
                                  {...toolkitProps.baseProps}
                                  {...paginationTableProps}
                                  responsive
                                  defaultSorted={defaultSorted}
                                  bordered={false}
                                  striped={false}
                                  selectRow={selectRow}
                                  classes={
                                    "table align-middle table-nowrap table-check"
                                  }
                                  headerWrapperClasses={"table-light"}
                                  ref={this.node}
                                />
                                <Modal
                                  isOpen={this.state.modal}
                                  className={this.props.className}
                                >
                                  <ModalHeader toggle={this.toggle} tag="h4">
                                    {!!isEdit ? "Edit Product" : "Add Product"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <Formik
                                      enableReinitialize={true}
                                      initialValues={{
                                        productId:
                                          (product && product.productId) || "",
                                        productName:
                                          (product && product.productName) ||
                                          "",
                                        productdate:
                                          (product && product.productDate) ||
                                          "",
                                        total: (product && product.total) || "",
                                        paymentStatus:
                                          (product && product.paymentStatus) ||
                                          "Paid",
                                        badgeclass:
                                          (product && product.badgeclass) ||
                                          "success",
                                        paymentMethod:
                                          (product && product.paymentMethod) ||
                                          "Mastercard",
                                      }}
                                      validationSchema={Yup.object().shape({
                                        productId: Yup.string().required(
                                          "Please Enter Your product Id"
                                        ),
                                        productName: Yup.string().required(
                                          "Please Enter Your product Name"
                                        ),
                                        productDate: Yup.string().required(
                                          "Please Enter Your Product Date"
                                        ),
                                        total:
                                          Yup.string().required("Total Amount"),
                                        paymentStatus: Yup.string().required(
                                          "Please Enter Your Payment Status"
                                        ),
                                        badgeclass: Yup.string().required(
                                          "Please Enter Your Badge Class"
                                        ),
                                        paymentMethod: Yup.string().required(
                                          "Please Enter Your Payment Method"
                                        ),
                                      })}
                                      onSubmit={values => {
                                        if (isEdit) {
                                          const updateProduct = {
                                            id: product ? product.id : 0,
                                            productId: values.productId,
                                            productName: values.productName,
                                            productDate: values.productDate,
                                            total: values.total,
                                            paymentStatus: values.paymentStatus,
                                            paymentMethod: values.paymentMethod,
                                            badgeclass: values.badgeclass,
                                          };

                                          onUpdateProduct(onUpdateProduct);
                                        } else {
                                          const newProduct = {
                                            id:
                                              Math.floor(
                                                Math.random() * (30 - 20)
                                              ) + 20,
                                            productId: values["productId"],
                                            productName: values["productName"],
                                            productDate: values["productDate"],
                                            total: values["total"],
                                            paymentStatus:
                                              values["paymentStatus"],
                                            paymentMethod:
                                              values["paymentMethod"],
                                            badgeclass: values["badgeclass"],
                                          };

                                          onAddNewProduct(newProduct);
                                        }

                                        this.setState({
                                          selectedProduct: null,
                                        });
                                        this.toggle();
                                      }}
                                    >
                                      {({ errors, status, touched }) => (
                                        <Form>
                                          <Row>
                                            <Col className="col-12">
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Product Id
                                                </Label>
                                                <Field
                                                  name="orderId"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.orderId &&
                                                    touched.orderId
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="orderId"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Billing Name
                                                </Label>
                                                <Field
                                                  name="billingName"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.billingName &&
                                                    touched.billingName
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="billingName"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Product Date
                                                </Label>
                                                <Field
                                                  name="orderdate"
                                                  type="date"
                                                  className={
                                                    "form-control" +
                                                    (errors.orderdate &&
                                                    touched.orderdate
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="orderdate"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Total
                                                </Label>
                                                <Field
                                                  name="total"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.total &&
                                                    touched.total
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="total"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Total
                                                </Label>
                                                <Field
                                                  name="paymentStatus"
                                                  as="select"
                                                  className={
                                                    "form-control" +
                                                    (errors.paymentStatus &&
                                                    touched.paymentStatus
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                >
                                                  <option>Paid</option>
                                                  <option>Chargeback</option>
                                                  <option>Refund</option>
                                                </Field>
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Badge Class
                                                </Label>
                                                <Field
                                                  name="badgeclass"
                                                  as="select"
                                                  className={
                                                    "form-control" +
                                                    (errors.badgeclass &&
                                                    touched.badgeclass
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                >
                                                  <option>success</option>
                                                  <option>danger</option>
                                                  <option>warning</option>
                                                </Field>
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Payment Method
                                                </Label>
                                                <Field
                                                  name="paymentMethod"
                                                  as="select"
                                                  className={
                                                    "form-control" +
                                                    (errors.paymentMethod &&
                                                    touched.paymentMethod
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                >
                                                  <option>Mastercard</option>
                                                  <option>Visa</option>
                                                  <option>Paypal</option>
                                                  <option>COD</option>
                                                </Field>
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      )}
                                    </Formik>
                                  </ModalBody>
                                </Modal>
                              </div>
                              <div className="pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </div>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  onGetProducts: PropTypes.func,
  onAddNewProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onUpdateProduct: PropTypes.func,
  className: PropTypes.any,
  history: PropTypes.any,
};

const mapStateToProps = state => ({
  products: state.ecommerce.products,
});

const mapDispatchToProps = dispatch => ({
  onGetProducts: () => dispatch(getProductsTest()),
  onAddNewProduct: product => dispatch(addNewProduct(product)),
  onUpdateProduct: product => dispatch(updateProduct(product)),
  onDeleteProduct: product => dispatch(deleteProduct(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceProducts));
