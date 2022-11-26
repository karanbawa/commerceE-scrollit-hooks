import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty, set } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as Yup from "yup"
import { useFormik } from "formik"
import DeleteModal from "../../../components/Common/DeleteModal"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Spinner,
  Alert,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
  getProductList as getProductListdata,
  deleteAllOrders as ondeleteAllOrders,
  getCustomers,
  addNewCustomer,
} from "store/actions"

import EcommerceOrdersModal from "./EcommerceOrdersModal"
import Select from "react-select"
import { select } from "redux-saga/effects"

const EcommerceOrders = props => {
  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState([])
  const [productList, setProductList] = useState([])
  const [customerList, setCustomerList] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [customerRef, setCustomerRef] = useState([])

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderItems: (order && order.orderItems) || [],
      billingName:
        (order && {
          value: order.customerId,
          label: customerRef[order.customerId],
        }) ||
        {},
      shippingAddress1: (order && order.shippingAddress1) || "",
      shippingAddress2: (order && order.shippingAddress2) || "",
      paymentStatus: (order && order.paymentStatus) || "Paid",
      badgeclass: (order && order.badgeclass) || "success",
      paymentMethod: (order && order.paymentMethod) || "Mastercard",
      city: (order && order.city) || "",
      state: (order && order.state) || "",
      country: (order && order.country) || "",
      phone: (order && order.phone) || "",
      zip: (order && order.zip) || "",
      methodIcon: (order && order.methodIcon) || "fa-cc-mastercard",
    },
    validationSchema: Yup.object({
      billingName: Yup.object().shape({
        value: Yup.string().required("Please select a customer"),
        label: Yup.string().required("Please select a customer"),
      }),
      shippingAddress1: Yup.string().required(
        "Please Enter Your shipping address 1"
      ),
      shippingAddress2: Yup.string().required(
        "Please Enter Your shipping address 2"
      ),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
      city: Yup.string().required("Please Enter Your city"),
      state: Yup.string().required("Please Enter Your state"),
      country: Yup.string().required("Please Enter Your country"),
      phone: Yup.string().required("Please Enter Your phone"),
      zip: Yup.string().required("Please Enter Your zip"),
      methodIcon: Yup.string().required("Please Enter Your methodIcon "),
      orderItems: Yup.array()
        .of(
          Yup.object().shape({
            quantity: Yup.number().required("Please enter product quantity"),
            product: Yup.object().shape({
              _id: Yup.string().required("Please select a product"),
            }),
          })
        )
        .min(1, "Please select atleast one product")
        .required("Please select atleast one product."),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateOrder = {
          ...order,
          customerId: values.billingName.value,
          shippingAddress1: values.shippingAddress1,
          shippingAddress2: values.shippingAddress2,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,
          city: values.city,
          state: values.state,
          country: values.country,
          phone: values.phone,
          zip: values.zip,
          methodIcon: values.methodIcon,
          orderItems: values.orderItems,
        }
        dispatch(onUpdateOrder(updateOrder))

        validation.resetForm()
      } else {
        const newOrder = {
          orderItems: values["orderItems"],
          customerId: values["billingName"].value,
          shippingAddress1: values["shippingAddress1"],
          shippingAddress2: values["shippingAddress2"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeclass: values["badgeclass"],
          city: values["city"],
          state: values["state"],
          country: values["country"],
          methodIcon: "fa-cc-mastercard",
          phone: values["phone"],
          zip: values["zip"],
        }
        dispatch(onAddNewOrder(newOrder))
        validation.resetForm()
      }
      toggle()
    },
    handleError: e => {
      console.log(e)
    },
  })

  const validation2 = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      phone: "",
      email: "",
      address: "",
      rating: "",
      walletBalance: "",
      joiningDate: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
      rating: Yup.string().required("Please Enter Your Rating"),
      walletBalance: Yup.string().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: values => {
      const newCustomer = {
        username: values["username"],
        phone: values["phone"],
        email: values["email"],
        address: values["address"],
        rating: values["rating"],
        walletBalance: values["walletBalance"],
        joiningDate: values["joiningDate"],
      }
      dispatch(addNewCustomer(newCustomer))
      validation2.resetForm()
      toggleNested()
    },
  })

  const { orders, products, customers } = useSelector(state => ({
    orders: state.ecommerce.orders,
    products: state.ecommerce.productList,
    customers: state.ecommerce.customers,
  }))

  const handleChange = e => {
    e.preventDefault()

    const index = e.target.id
    setFormRows(s => {
      const newArr = s.slice()
      newArr[index].value = e.target.value

      return newArr
    })
  }

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [nestedModal, setNestedModal] = useState(false)
  const [closeAll, setCloseAll] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orderList.length, // replace later with size(orders),
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

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "customerId",
      text: "Billing Name",
      sort: true,
      formatter: (cellContent, row) => <>{customerRef[row.customerId]}</>,
    },
    {
      dataField: "Address",
      text: "Address",
      sort: true,
      formatter: (cellContent, row) => (
        <>
          <p className="mb-1">{row.shippingAddress1}</p>
          <p className="mb-0">{row.shippingAddress2}</p>
        </>
      ),
    },
    {
      dataField: "city",
      text: "city",
      sort: true,
    },
    {
      dataField: "country",
      text: "country",
      sort: true,
    },

    {
      dataField: "phone",
      text: "phone",
      sort: true,
    },
    {
      dataField: "badgeclass",
      text: "badgeclass",
      sort: true,
    },
    {
      dataField: "payment Status",
      text: "Payment Status",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Badge
          className={"font-size-12 badge-soft-" + row.badgeclass}
          color={row.badgeClass}
          pill
        >
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      dataField: "paymentMethod",
      isDummyField: true,
      text: "Payment Method",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <i
            className={
              row.paymentMethod !== "COD"
                ? "fab fa-cc-" + toLowerCase1(row.paymentMethod) + " me-1"
                : "fab fas fa-money-bill-alt me-1"
            }
          />{" "}
          {row.paymentMethod}
        </>
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
      formatter: (cellContent, order) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleOrderClick(order)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => onClickDelete(order)}
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

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders())
    }
  }, [])

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(getCustomers())
    }
  }, [])

  useEffect(() => {
    if (products && !products.length) {
      dispatch(getProductListdata())
    }
  }, [])

  useEffect(() => {
    setProductList(products)
    setProductOptions(
      products.map(product => ({ value: product._id, label: product.name }))
    )
  }, [products])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    setCustomerList(
      customers.map(customer => ({
        value: customer._id,
        label: customer.username,
      }))
    )

    let test = {}
    customers.forEach(customer => {
      test = { ...test, [customer._id]: customer.username }
    })
    setCustomerRef(test)
  }, [customers])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setOrder(null)
    } else {
      setModal(true)
    }
  }

  const toggleNested = () => {
    setNestedModal(!nestedModal)
    setCloseAll(false)
  }

  const toggleAll = () => {
    setNestedModal(!nestedModal)
    setCloseAll(true)
  }

  const handleOrderClick = arg => {
    setOrder(arg)
    console.log(arg)
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

  //delete order
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteAllModal, setDeleteAllModal] = useState(false)

  const onClickDelete = order => {
    setOrder(order)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (order._id) {
      dispatch(onDeleteOrder(order))
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }

  const handleDeleteAllOrders = () => {
    dispatch(ondeleteAllOrders())
    setDeleteAllModal(false)
  }

  const handleOrderClicks = () => {
    setOrder("")
    setIsEdit(false)
    toggle()
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const defaultSorted = [
    {
      dataField: "_id",
      order: "desc",
    },
  ]

  // console.log(orderList)

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteAllModal}
        onDeleteClick={handleDeleteAllOrders}
        onCloseClick={() => setDeleteAllModal(false)}
      />

      {Object.keys(customerRef).length ? (
        <div className="page-content">
          <MetaTags>
            <title>Orders | Scrollit</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="_id"
                      columns={EcommerceOrderColumns(toggle)}
                      data={orderList}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="_id"
                          data={orderList}
                          columns={EcommerceOrderColumns(toggle)}
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
                                      className="btn-rounded  mb-2 me-2"
                                      onClick={handleOrderClicks}
                                    >
                                      <i className="mdi mdi-plus me-1" />
                                      Add New Order
                                    </Button>
                                    <Button
                                      type="button"
                                      color="danger"
                                      className="btn-rounded  mb-2 me-2"
                                      onClick={() => {
                                        setDeleteAllModal(true)
                                      }}
                                    >
                                      <i className="mdi mdi-delete me-1" />
                                      Delete all orders
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField="id"
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
                                      {!!isEdit ? "Edit Order" : "Add Order"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <Form
                                        onSubmit={e => {
                                          e.preventDefault()
                                          validation.handleSubmit()
                                          validation.setFieldTouched(
                                            "billingName",
                                            true
                                          )
                                          validation.setFieldTouched(
                                            "orderItems",
                                            true
                                          )
                                          return false
                                        }}
                                      >
                                        <Row form>
                                          <Col className="col-12">
                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Billing Name
                                              </Label>
                                              <Select
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onBlur={validation.handleBlur}
                                                invalid={
                                                  validation.touched
                                                    .billingName &&
                                                  validation.errors.billingName
                                                    ? true
                                                    : false
                                                }
                                                noOptionsMessage={() => (
                                                  <div
                                                    className=""
                                                    onClick={toggleNested}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <i className="mdi mdi-plus me-1" />
                                                    Add New Customer
                                                  </div>
                                                )}
                                                onChange={selectedValue => {
                                                  validation.setFieldValue(
                                                    "billingName",
                                                    selectedValue
                                                      ? selectedValue
                                                      : {}
                                                  )
                                                }}
                                                isClearable={true}
                                                options={customerList}
                                                value={
                                                  validation.values.billingName
                                                }
                                              />
                                              {validation.errors.billingName ? (
                                                <div className="text-danger">
                                                  {"Please select billing name"}
                                                </div>
                                              ) : null}
                                              {/* {console.log(
                                                validation.touched.billingName,
                                                validation.touched.shippingAddress1
                                              )} */}
                                            </div>
                                            <Modal
                                              isOpen={nestedModal}
                                              toggle={toggleNested}
                                              onClosed={
                                                closeAll ? toggle : undefined
                                              }
                                            >
                                              <ModalHeader
                                                toggle={toggleNested}
                                                tag="h4"
                                              >
                                                Add Customer
                                              </ModalHeader>
                                              <ModalBody>
                                                <Form
                                                  onSubmit={e => {
                                                    e.preventDefault()
                                                    validation2.handleSubmit()
                                                    return false
                                                  }}
                                                >
                                                  <Row form>
                                                    <Col className="col-12">
                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          UserName
                                                        </Label>
                                                        <Input
                                                          name="username"
                                                          type="text"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .username || ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .username &&
                                                            validation2.errors
                                                              .username
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .username &&
                                                        validation2.errors
                                                          .username ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .username
                                                            }
                                                          </FormFeedback>
                                                        ) : null}
                                                      </div>

                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          Phone No
                                                        </Label>
                                                        <Input
                                                          name="phone"
                                                          type="text"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .phone || ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .phone &&
                                                            validation2.errors
                                                              .phone
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .phone &&
                                                        validation2.errors
                                                          .phone ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .phone
                                                            }
                                                          </FormFeedback>
                                                        ) : null}
                                                      </div>

                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          Email Id
                                                        </Label>
                                                        <Input
                                                          name="email"
                                                          type="email"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .email || ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .email &&
                                                            validation2.errors
                                                              .email
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .email &&
                                                        validation2.errors
                                                          .email ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .email
                                                            }
                                                          </FormFeedback>
                                                        ) : null}
                                                      </div>

                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          Address
                                                        </Label>
                                                        <Input
                                                          name="address"
                                                          type="textarea"
                                                          rows="3"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .address || ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .address &&
                                                            validation2.errors
                                                              .address
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .address &&
                                                        validation2.errors
                                                          .address ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .address
                                                            }
                                                          </FormFeedback>
                                                        ) : null}
                                                      </div>

                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          Rating
                                                        </Label>
                                                        <Input
                                                          name="rating"
                                                          type="text"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .rating || ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .rating &&
                                                            validation2.errors
                                                              .rating
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .rating &&
                                                        validation2.errors
                                                          .rating ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .rating
                                                            }
                                                          </FormFeedback>
                                                        ) : null}
                                                      </div>

                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          Wallet Balance
                                                        </Label>
                                                        <Input
                                                          name="walletBalance"
                                                          type="text"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .walletBalance ||
                                                            ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .walletBalance &&
                                                            validation2.errors
                                                              .walletBalance
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .walletBalance &&
                                                        validation2.errors
                                                          .walletBalance ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .walletBalance
                                                            }
                                                          </FormFeedback>
                                                        ) : null}
                                                      </div>

                                                      <div className="mb-3">
                                                        <Label className="form-label">
                                                          Joining Date
                                                        </Label>
                                                        <Input
                                                          name="joiningDate"
                                                          type="date"
                                                          onChange={
                                                            validation2.handleChange
                                                          }
                                                          onBlur={
                                                            validation2.handleBlur
                                                          }
                                                          value={
                                                            validation2.values
                                                              .joiningDate || ""
                                                          }
                                                          invalid={
                                                            validation2.touched
                                                              .joiningDate &&
                                                            validation2.errors
                                                              .joiningDate
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {validation2.touched
                                                          .joiningDate &&
                                                        validation2.errors
                                                          .joiningDate ? (
                                                          <FormFeedback type="invalid">
                                                            {
                                                              validation2.errors
                                                                .joiningDate
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
                                                          className="btn btn-success save-customer"
                                                        >
                                                          Save
                                                        </button>
                                                      </div>
                                                    </Col>
                                                  </Row>
                                                </Form>
                                              </ModalBody>
                                            </Modal>
                                            <Label className="form-label">
                                              Products
                                            </Label>
                                            <div>
                                              {validation.values.orderItems.map(
                                                (product, index) => (
                                                  <div key={index}>
                                                    <Row className="my-2">
                                                      <Col className="col-6">
                                                        <Select
                                                          value={{
                                                            value:
                                                              validation.values
                                                                .orderItems[
                                                                index
                                                              ].product._id,
                                                            label:
                                                              validation.values
                                                                .orderItems[
                                                                index
                                                              ].product.name,
                                                          }}
                                                          options={
                                                            productOptions
                                                          }
                                                          onChange={selectedValue => {
                                                            console.log(
                                                              selectedValue.value
                                                            )
                                                            validation
                                                              .setFieldValue(
                                                                "orderItems",
                                                                [
                                                                  ...validation.values.orderItems.slice(
                                                                    0,
                                                                    index
                                                                  ),
                                                                  {
                                                                    product:
                                                                      productList.filter(
                                                                        product =>
                                                                          product._id ===
                                                                          selectedValue.value
                                                                      )[0],
                                                                    quantity:
                                                                      validation
                                                                        .values
                                                                        .orderItems[
                                                                        index
                                                                      ]
                                                                        .quantity,
                                                                  },
                                                                  ...validation.values.orderItems.slice(
                                                                    index + 1,
                                                                    validation
                                                                      .values
                                                                      .orderItems
                                                                      .length
                                                                  ),
                                                                ]
                                                              )
                                                          }}
                                                        />
                                                      </Col>
                                                      <Col className="col-4">
                                                        <Input
                                                          onChange={e => {
                                                            console.log(
                                                              validation.values
                                                                .orderItems
                                                            )
                                                            validation.setFieldValue(
                                                              "orderItems",
                                                              [
                                                                ...validation.values.orderItems.slice(
                                                                  0,
                                                                  index
                                                                ),
                                                                {
                                                                  ...validation
                                                                    .values
                                                                    .orderItems[
                                                                    index
                                                                  ],
                                                                  quantity:
                                                                    parseInt(
                                                                      e.target
                                                                        .value
                                                                    ),
                                                                },
                                                                ...validation.values.orderItems.slice(
                                                                  index + 1,
                                                                  validation
                                                                    .values
                                                                    .orderItems
                                                                    .length
                                                                ),
                                                              ]
                                                            )
                                                          }}
                                                          value={
                                                            validation.values
                                                              .orderItems[index]
                                                              .quantity
                                                          }
                                                          type="number"
                                                          min="1"
                                                        />
                                                      </Col>
                                                      <Col
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                        className="text-danger mt-2"
                                                        onClick={() => {
                                                          validation.setFieldValue(
                                                            "orderItems",
                                                            [
                                                              ...validation.values.orderItems.slice(
                                                                0,
                                                                index
                                                              ),
                                                              ...validation.values.orderItems.slice(
                                                                index + 1,
                                                                validation
                                                                  .values
                                                                  .orderItems
                                                                  .length
                                                              ),
                                                            ]
                                                          )
                                                        }}
                                                      >
                                                        Delete
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                )
                                              )}
                                              <div className="d-flex ">
                                                <Button
                                                  className="mb-2"
                                                  onClick={() => {
                                                    validation.setFieldValue(
                                                      "orderItems",
                                                      [
                                                        ...validation.values
                                                          .orderItems,
                                                        {
                                                          quantity: 1,
                                                          product: {},
                                                        },
                                                      ]
                                                    )
                                                  }}
                                                >
                                                  Add
                                                </Button>
                                                {validation.errors
                                                  .orderItems ? (
                                                  <div className="text-danger mx-2 mt-2">
                                                    {typeof validation.errors
                                                      .orderItems === "string"
                                                      ? validation.errors
                                                          .orderItems
                                                      : "Invalid Product Specification"}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Address 1
                                              </Label>
                                              <Input
                                                name="shippingAddress1"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values
                                                    .shippingAddress1 || ""
                                                }
                                                invalid={
                                                  validation.touched
                                                    .shippingAddress1 &&
                                                  validation.errors
                                                    .shippingAddress1
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched
                                                .shippingAddress1 &&
                                              validation.errors
                                                .shippingAddress1 ? (
                                                <FormFeedback type="invalid">
                                                  {
                                                    validation.errors
                                                      .shippingAddress1
                                                  }
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Address 2
                                              </Label>
                                              <Input
                                                name="shippingAddress2"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values
                                                    .shippingAddress2 || ""
                                                }
                                                invalid={
                                                  validation.touched
                                                    .shippingAddress2 &&
                                                  validation.errors
                                                    .shippingAddress2
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched
                                                .shippingAddress2 &&
                                              validation.errors
                                                .shippingAddress2 ? (
                                                <FormFeedback type="invalid">
                                                  {
                                                    validation.errors
                                                      .shippingAddress2
                                                  }
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                City
                                              </Label>
                                              <Input
                                                name="city"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values.city || ""
                                                }
                                                invalid={
                                                  validation.touched.city &&
                                                  validation.errors.city
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.city &&
                                              validation.errors.city ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.city}
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                State
                                              </Label>
                                              <Input
                                                name="state"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values.state || ""
                                                }
                                                invalid={
                                                  validation.touched.state &&
                                                  validation.errors.state
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.state &&
                                              validation.errors.state ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.state}
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Country
                                              </Label>
                                              <Input
                                                name="country"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values.country ||
                                                  ""
                                                }
                                                invalid={
                                                  validation.touched.country &&
                                                  validation.errors.country
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.country &&
                                              validation.errors.country ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.country}
                                                </FormFeedback>
                                              ) : null}
                                            </div>
                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Phone
                                              </Label>
                                              <Input
                                                name="phone"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values.phone || ""
                                                }
                                                invalid={
                                                  validation.touched.phone &&
                                                  validation.errors.phone
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.phone &&
                                              validation.errors.phone ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.phone}
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Payment Status
                                              </Label>
                                              <Input
                                                name="paymentStatus"
                                                type="select"
                                                className="form-select"
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values
                                                    .paymentStatus || ""
                                                }
                                              >
                                                <option>Paid</option>
                                                <option>Chargeback</option>
                                                <option>Refund</option>
                                              </Input>
                                              {validation.touched
                                                .paymentStatus &&
                                              validation.errors
                                                .paymentStatus ? (
                                                <FormFeedback type="invalid">
                                                  {
                                                    validation.errors
                                                      .paymentStatus
                                                  }
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Zip
                                              </Label>
                                              <Input
                                                name="zip"
                                                type="text"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values.zip || ""
                                                }
                                                invalid={
                                                  validation.touched.zip &&
                                                  validation.errors.zip
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.zip &&
                                              validation.errors.zip ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.zip}
                                                </FormFeedback>
                                              ) : null}
                                            </div>

                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Badge Class
                                              </Label>
                                              <Input
                                                name="badgeclass"
                                                type="select"
                                                className="form-select"
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values
                                                    .badgeclass || ""
                                                }
                                              >
                                                <option>success</option>
                                                <option>danger</option>
                                                <option>warning</option>
                                              </Input>
                                            </div>
                                            <div className="mb-3">
                                              <Label className="form-label">
                                                Payment Method
                                              </Label>
                                              <Input
                                                name="paymentMethod"
                                                type="select"
                                                className="form-select"
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values
                                                    .paymentMethod || ""
                                                }
                                              >
                                                <option>Mastercard</option>
                                                <option>Visa</option>
                                                <option>Paypal</option>
                                                <option>COD</option>
                                              </Input>
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <div className="text-end">
                                              <button
                                                type="submit"
                                                className="btn btn-success save-user"
                                                onClick={() => {
                                                  validation.setFieldTouched(
                                                    "billingName",
                                                    true
                                                  )
                                                  validation.setFieldTouched(
                                                    "orderItems",
                                                    true
                                                  )
                                                }}
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
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  )
}

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
  getProductListdata: PropTypes.func,
  handleDeleteAllOrders: PropTypes.func,
}

export default withRouter(EcommerceOrders)
