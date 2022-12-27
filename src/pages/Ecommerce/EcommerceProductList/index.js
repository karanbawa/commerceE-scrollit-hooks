import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as Yup from "yup"
import { useFormik } from "formik"
import DeleteModal from "../../../components/Common/DeleteModal"
import Breadcrumbs from "components/Common/Breadcrumb"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  FormGroup,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import {
  getProductList,
  deleteProductInList,
  updateProductInList,
} from "store/actions"

import EcommerceProductModal from "./EcommerceProductModal"

const EcommerceProductList = props => {
  const [productList, setProductList] = useState([])
  const [product, setProduct] = useState(null)
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const dispatch = useDispatch()
  const { products } = useSelector(state => ({
    products: state.ecommerce.productList,
  }))

  //Getting product list from store
  useEffect(() => {
    if (products && !products.length) {
      dispatch(getProductList())
    }
  }, [])

  useEffect(() => {
    setProductList(products)
  }, [products])

  useEffect(() => {
    if (!isEmpty(products) && !!isEdit) {
      setProductList(products)
      setIsEdit(false)
    }
  }, [products])

  const selectRow = {
    mode: "checkbox",
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (product && product.name) || "",
      createdAt: (product && product.createdAt) || "2020-10-11",
      price: (product && product.price) || "",
      category: (product && product.productCategory) || "",
      displayProduct: (product && product.displayProduct) || true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Product Name"),
      createdAt: Yup.string().required("Please Enter Product Creation Date"),
      price: Yup.string().required("Product Price"),
      // change after API is updated
      // category: Yup.string().required("Please Enter Product Category"),
    }),
    onSubmit: values => {
      const updatedProduct = {
        ...product,
        name: values.name,
        price: values.price.toString(),
        // change after API is updated
        // createdAt: values.createdAt,
        // displayProduct: values.displayProduct,
        // category : values.category
      }
      dispatch(updateProductInList(updatedProduct))
      validation.resetForm()
      toggle()
    },
  })

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: productList.length, // replace later with size(productList),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1)

  const toLowerCase1 = str => {
    return str === "" || str === undefined ? "" : str.toLowerCase()
  }

  const EcommerceProductListColumns = toggleModal => [
    {
      dataField: "name",
      text: "Product Name",
      sort: true,
    },
    {
      dataField: "productDate",
      text: "Date",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => handleValidDate(row.productDate),
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      formatter: (cellContent, row) => (
        // Replace with Switch
        <div>
          {cellContent.map(item => (
            <div key={item._id}>{item.name}</div>
          ))}
        </div>
      ),
    },
    {
      dataField: "displayProduct",
      isDummyField: true,
      text: "Display Product",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        // Replace with Switch
        <Form>
          <FormGroup>
            <Input type="checkbox" />
          </FormGroup>
        </Form>
      ),
    },
    {
      dataField: "view",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: () => (
        <Button
          type="button"
          color="primary"
          className="btn-sm btn-rounded"
          onClick={toggleViewModal}
        >
          View Details
        </Button>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, product) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleProductClick(product)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => onClickDelete(product)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ]

  const toggle = () => {
    if (modal) {
      setModal(false)
      setProduct(null)
    } else {
      setModal(true)
    }
  }

  const handleProductClick = arg => {
    const prod = arg
    setProduct(prod)
    setIsEdit(true)
    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete product

  const onClickDelete = product => {
    setProduct(product)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (product._id) {
      dispatch(deleteProductInList(product))
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      <EcommerceProductModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Product List | Scrollit</title>
        </MetaTags>
        <Container fluid>
          <div>
            <Breadcrumbs
              title="Ecommerce"
              count={productList.length}
              breadcrumbItem="Product List"
            />
          </div>

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="_id"
                    columns={EcommerceProductListColumns(toggle)}
                    data={productList}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="_id"
                        data={productList}
                        columns={EcommerceProductListColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Link to="/ecommerce-add-product">
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded  mb-2 me-2"
                                    >
                                      <i className="mdi mdi-plus me-1" />
                                      Add New Product
                                    </Button>
                                  </Link>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="_id"
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    Edit Product
                                  </ModalHeader>
                                  <ModalBody>
                                    <Form
                                      onSubmit={e => {
                                        e.preventDefault()
                                        validation.handleSubmit()
                                        return false
                                      }}
                                    >
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Product Name
                                            </Label>
                                            <Input
                                              name="name"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.name || ""
                                              }
                                              invalid={
                                                validation.touched.name &&
                                                validation.errors.name
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.name &&
                                            validation.errors.name ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.name}
                                              </FormFeedback>
                                            ) : null}
                                          </div>
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Date of Creation
                                            </Label>
                                            <Input
                                              name="createdAt"
                                              type="date"
                                              // value={orderList.orderdate || ""}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.createdAt ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched.createdAt &&
                                                validation.errors.createdAt
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.createdAt &&
                                            validation.errors.createdAt ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.createdAt}
                                              </FormFeedback>
                                            ) : null}
                                          </div>
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Price
                                            </Label>
                                            <Input
                                              name="price"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.price || ""
                                              }
                                              invalid={
                                                validation.touched.price &&
                                                validation.errors.price
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.price &&
                                            validation.errors.price ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.price}
                                              </FormFeedback>
                                            ) : null}
                                          </div>
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Category
                                            </Label>
                                            <Input
                                              name="category"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.category || ""
                                              }
                                              invalid={
                                                validation.touched.category &&
                                                validation.errors.category
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.category &&
                                            validation.errors.category ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.category}
                                              </FormFeedback>
                                            ) : null}
                                          </div>
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Display Product
                                            </Label>
                                            <FormGroup>
                                              <Input
                                                // Replace with Switch
                                                name="displayProduct"
                                                type="checkbox"
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                // value={
                                                //   validation.values
                                                //     .displayProduct || ""
                                                // }
                                                invalid={
                                                  validation.touched
                                                    .displayProduct &&
                                                  validation.errors
                                                    .displayProduct
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </FormGroup>
                                            {validation.touched
                                              .displayProduct &&
                                            validation.errors.displayProduct ? (
                                              <FormFeedback type="invalid">
                                                {
                                                  validation.errors
                                                    .displayProduct
                                                }
                                              </FormFeedback>
                                            ) : null}
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
                                  </ModalBody>
                                </Modal>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
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
  )
}

EcommerceProductList.propTypes = {
  productList: PropTypes.array,
  getProductList: PropTypes.func,
  deleteProductInList: PropTypes.func,
  updateProductInList: PropTypes.func,
}

export default withRouter(EcommerceProductList)
