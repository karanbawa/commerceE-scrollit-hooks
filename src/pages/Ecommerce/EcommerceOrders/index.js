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
  deleteAllOrders as ondeleteAllOrders
} from "store/actions"

import EcommerceOrdersModal from "./EcommerceOrdersModal"

const EcommerceOrders = props => {
  const inputArr = [
    {

      quantity:"",
      product:""
    }

  ];


  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState([])
  const [productList, setProductList] = useState([])
  // console.log(orderList)
  // const [productList1, setProductList1] = useState([{name:"Sjbkjf"}])
  const [formRows, setFormRows] = useState(inputArr);
 
  const dispatch = useDispatch()
  

  // console.log(order)
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderItems: (order && order.orderItems) || [],

      billingName: (order && order.billingName) || "",
      // productName: (order && order.productName) || "",
      // productQuantity:(order && order.productQuantity) || "",
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
      methodIcon: (order && order.methodIcon) || "fa-cc-mastercard"
    },
    // validationSchema: Yup.object({
    //   billingName: Yup.string().required("Please Enter Your Billing Name"),
    //   productName: Yup.string().required("Please Enter Your productName"),
    //   productQuantity:Yup.string().required("Please Enter Your  productQuantity"),
    //   shippingAddress1: Yup.string().required("Please Enter Your shipping address 1"),
    //   shippingAddress2: Yup.string().required("Please Enter Your shipping address 2"),
    //   paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
    //   badgeclass: Yup.string().required("Please Enter Your Badge Class"),
    //   paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    //   city: Yup.string().required("Please Enter Your city"),
    //   state: Yup.string().required("Please Enter Your state"),
    //   country: Yup.string().required("Please Enter Your country"),
    //   phone: Yup.string().required("Please Enter Your phone"),
    //   zip:Yup.string().required("Please Enter Your zip"),
    //    methodIcon.yup.string().required("Please Enter Your methodIcon ")
    // }),
    onSubmit: values => {
      console.log(values)
      console.log("hell")
      if (isEdit) {
        const updateOrder = {
          ...order,

          orderItems: values["orderItems"].map((item, i) => {

            return <div key={i}>  {item.quantity}|| {item.product}
            </div>
          }),
          billingName: values.billingName,
          // productName: values.productName,
          // productQuantity:values.productQuantity,
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
          methodIcon: values.methodIcon
        }
        console.log("text")
        // update order
        dispatch(onUpdateOrder(updateOrder))

        validation.resetForm()
      } else {
        console.log(values)
        const newOrder = {
          orderItems: arr,
          billingName: values["billingName"],
          //productName: values["productName"],
          //productQuantity:values["productQuantity"],
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
          zip: values["zip"]
        }
        console.log("tett")
        // save new order
        dispatch(onAddNewOrder(newOrder))
        validation.resetForm()
      }
      toggle()
    },
  })

  const { orders, products } = useSelector(state => ({
    orders: state.ecommerce.orders,
    products: state.ecommerce.productList
  }))

  //console.log(products)

 
  // const addInput = () => {
  //   setFormRows(s => {
  //     return [
  //       ...s,
  //       {
  //         quantity:"",
  //         product:""
  //       }
  //     ];
  //   });
  // };

  const handleChange = e => {
    e.preventDefault();

    const index = e.target.id;
    setFormRows(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };


  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
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

  const onDeleteFormRow = id => {
    if (id !== 1) {
      var modifiedRows = [...formRows];
      modifiedRows = modifiedRows.filter(x => x["id"] !== id);
      setFormRows(modifiedRows);
    }
  };

  const onAddFormRow = () => {
    // const modifiedRows = [...formRows];
    // modifiedRows.push({ id: modifiedRows.length + 1 });
    // setFormRows(modifiedRows);
      setFormRows(s => {
        return [
          ...s,
          {
            quantity:"",
            product:""
          }
        ];
      });
    
  };

  const EcommerceOrderColumns = toggleModal => [

    {
      dataField: "billingName",
      text: "Billing Name",
      sort: true,
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
    if (products && !products.length) {

      dispatch(getProductListdata())
    }
  }, [])

  useEffect(() => {
    setProductList(products)
  }, [products])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

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

  const handleOrderClick = arg => {
    console.log(arg)
    setOrder(arg)

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

  const onClickDelete = order => {
    console.log(order)
    setOrder(order)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    console.log(order)
    if (order._id) {
      dispatch(onDeleteOrder(order))
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }

  const handleDeleteAllOrders = () => {
    dispatch(ondeleteAllOrders())
    setDeleteModal(false)
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
      dataField: "orderId",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteAllOrders}
        onCloseClick={() => setDeleteModal(false)}
      />

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
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={orderList}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
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
                                    <SearchBar {...toolkitProps.searchProps} />
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
                                    onClick={() => { setDeleteModal(true) }}
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
                                        console.log("text")
                                        e.preventDefault()
                                        console.log("data")
                                        validation.handleSubmit()
                                        return false
                                      }}
                                    > 
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Billing Name
                                            </Label>
                                            <Input
                                              name="billingName"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.billingName ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .billingName &&
                                                  validation.errors.billingName
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.billingName &&
                                              validation.errors.billingName ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.billingName}
                                              </FormFeedback>
                                            ) : null}
                                          </div>

                                          <div>

                                            {(formRows || []).map((formRow, key) => (
                                              <Row key={key}>
                                                <Col className="mb-3">
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Product Name
                                                    </Label>
                                                    <Input
                                                      name="productName"
                                                      type="select"
                                                      className="form-select"
                                                      onChange={validation.handleChange}

                                                      onBlur={validation.handleBlur}

                                                      value={
                                                        formRow.product || ""
                                                      }
                                                    >

                                                      {products.length > 0 && products.map((item, index) =>
                                                        <option key={index}>{item.name}</option>
                                                      )
                                                      }
                                                    </Input>
                                                    {validation.touched.productName &&
                                                      validation.errors.productName ? (
                                                      <FormFeedback type="invalid">
                                                        {
                                                          validation.errors
                                                            .productName
                                                        }
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>

                                                <Col className="mb-3">
                                                  <div className="mb-3">
                                                    <Label className="form-label">
                                                      Product Quality
                                                    </Label>
                                                    <Input
                                                      name="productQuality"
                                                      type="text"
                                                      validate={{
                                                        required: { value: true },
                                                      }}
                                                      onChange={validation.handleChange}
                                                      onBlur={validation.handleBlur}
                                                      value={
                                                       formRow.quantity || ""
                                                      }
                                                      invalid={
                                                        validation.touched
                                                          .productQuality &&
                                                          validation.errors.productQuality
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    {validation.touched.productQuality &&
                                                      validation.errors.productQuality ? (
                                                      <FormFeedback type="invalid">
                                                        {validation.errors.productQuality}
                                                      </FormFeedback>
                                                    ) : null}
                                                  </div>

                                                </Col>

                                                <Col className="align-self-center">
                                                  <div className="d-grid mb-2">
                                                    <input
                                                      type="button"
                                                      className="btn btn-danger"
                                                      value="Delete"
                                                      onClick={() => onDeleteFormRow(formRow.id)}
                                                    />
                                                  </div>
                                                </Col>
                                              </Row>
                                            ))}
                                          </div>
                                          <input
                                            type="button"
                                            className="btn btn-success mb-2 mt-lg-0"
                                            value="Add"
                                            onClick={() => onAddFormRow()}
                                          />

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Address1
                                            </Label>
                                            <Input
                                              name="shippingAddress1"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.shippingAddress1 ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .shippingAddress1 &&
                                                  validation.errors.shippingAddress1
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.shippingAddress1 &&
                                              validation.errors.shippingAddress1 ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.shippingAddress1}
                                              </FormFeedback>
                                            ) : null}
                                          </div>


                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Address2
                                            </Label>
                                            <Input
                                              name="shippingAddress2"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.shippingAddress2 ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .shippingAddress2 &&
                                                  validation.errors.shippingAddress2
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.shippingAddress2 &&
                                              validation.errors.shippingAddress2 ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.shippingAddress2}
                                              </FormFeedback>
                                            ) : null}
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              city
                                            </Label>
                                            <Input
                                              name="city"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.city ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .city &&
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
                                              state
                                            </Label>
                                            <Input
                                              name="state"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.state ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .state &&
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
                                              country
                                            </Label>
                                            <Input
                                              name="country"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.country ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .country &&
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
                                              phone
                                            </Label>
                                            <Input
                                              name="phone"
                                              type="text"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.phone ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .phone &&
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
                                              paymentStatus
                                            </Label>
                                            <Input
                                              name="paymentStatus"
                                              type="select"
                                              className="form-select"
                                              onChange={validation.handleChange}
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
                                            {validation.touched.paymentStatus &&
                                              validation.errors.paymentStatus ? (
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
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.zip ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .zip &&
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
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.badgeclass ||
                                                ""
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
                                              onChange={validation.handleChange}
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

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
  getProductListdata: PropTypes.func,
  handleDeleteAllOrders: PropTypes.func
}

export default withRouter(EcommerceOrders)
