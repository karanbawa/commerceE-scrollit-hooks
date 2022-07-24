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
import { priceCodes } from "../../../common/data/ecommerce";
import Select from "react-select";
import Dropzone from "react-dropzone";
import EcommerceAddProduct from "../EcommerceAddProduct";

import {
  InputGroup,
  Input,
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
import { propTypes } from "react-bootstrap-editable";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      viewmodal: false,
      selectedFiles: [],
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
          text: "Price",
          sort: true,
          formatter: (cellContent, row) =>
            this.handleValidPrice(row.productPrice, row.priceCode),
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
                    onClick={() => {
                      this.handleProductClick(product);
                    }}
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
    this.handleMulti2 = this.handleMulti2.bind(this);
  }

  toLowerCase1(str) {
    return str.toLowerCase();
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
    this.state.selectedFiles.forEach(element => {
      element.imageBase64 = "";
    });
    this.state.selectedFiles.map(file => {
      const img = file.preview;

      this.toDataURL(img).then(dataUrl => {
        file.imageBase64 = dataUrl;
      });
    });

    this.setState({ selectedFiles: files });
  };

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  removeFile = file => {
    const newFiles = [...this.state.selectedFiles]; // make a var for the new array
    newFiles.splice(file, 1); // remove the file from the array
    this.setState({
      selectedFiles: newFiles,
    }); // update the state
  };

  componentDidMount() {
    let { products, onGetProducts } = this.props;

    if (this.state.products && !this.state.products.length) {
      onGetProducts();
    }
    this.setState({ products });
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { products, product } = this.props;
    console.log(this.props);
    if (!isEmpty(products) && size(prevProps.products) !== size(products)) {
      this.setState({ isEdit: false, products, product: {} });
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
    let { product, products } = this.state;
    console.log(product);

    products = products.filter(item => item.id != product.id);
    this.setState({ products: products });
    console.log(products);

    // if (product.id !== undefined) {
    // onDeleteProduct(product);
    //   this.onPaginationPageChange(1);
    this.setState({ deleteModal: false });
    // }
  };

  handleProductClick = arg => {
    // const product = arg;
    // console.log("hii" + product);
    // this.setState((prevState, props) => ({ product }));
    this.setState({ product: arg }, () => {
      this.props.history.product = arg;
      // console.log(this.props);
      // console.log(this.props.history);
      this.props.history.push("/ecommerce-edit-product");
    });
  };

  handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  handleValidPrice = (price, pricecode) => {
    const currency = priceCodes.find(
      priceitem => priceitem.priceCode == pricecode
    );
    const finalPrice = `${currency.priceLabel}  ${price}`;
    return finalPrice;
  };

  render() {
    const { products, product } = this.state;
    console.log(product);

    const { SearchBar } = Search;

    const { isEdit, deleteModal } = this.state;

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

ProductList.propTypes = {
  products: PropTypes.array,
  onGetProducts: PropTypes.func,
  onAddNewProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onUpdateProduct: PropTypes.func,
  className: PropTypes.any,
  history: PropTypes.any,
  product: PropTypes.object,
};

const mapStateToProps = state => ({
  products: state.ecommerce.products,
  product: state.ecommerce.product,
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
)(withRouter(ProductList));
