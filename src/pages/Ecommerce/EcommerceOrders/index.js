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
  
} from "store/actions"

import EcommerceOrdersModal from "./EcommerceOrdersModal"

const EcommerceOrders = props => {
 

  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState([])
  const dispatch = useDispatch()

 
  
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      billingName: (order && order.billingName) || "",
      shippingAddress1:(order && order.shippingAddress1) || "",
      shippingAddress2:(order && order.shippingAddress2) || "",
      paymentStatus: (order && order.paymentStatus) || "Paid",
      badgeclass: (order && order.badgeclass) || "success",
      paymentMethod: (order && order.paymentMethod) || "Mastercard",
      city: (order && order.city) || "",
      country: (order && order.country) || "",
      state:(order && order.state) || "",
      phone:(order && order.phone) || "",
    },
    validationSchema: Yup.object({
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      shippingAddress1: Yup.string().required("Please Enter Your shipping address 1"),
      shippingAddress2: Yup.string().required("Please Enter Your shipping address 2"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
      city:Yup.string().required("Please Enter Your city"),
      state:Yup.string().required("Please Enter Your state"),
      country:Yup.string().required("Please Enter Your country"),
      phone:Yup.string().required("Please Enter Your phone"),
    }),
    onSubmit: values => {
      console.log("hi")
      if (isEdit) {
        console.log("hello")
        const updateOrder = {
          ...order,
          billingName: values.billingName,
          shippingAddress1:values.shippingAddress1,
          shippingAddress2:values.shippingAddress2,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,
          city:values.city,
          state:values.state,
          country:values.country,
          phone:values.phone
        }
        // update order
        dispatch(onUpdateOrder(updateOrder))
        
        validation.resetForm()
      } else {
        const newOrder = {
          billingName: values["billingName"],
          shippingAddress1:values["shippingAddress1"],
          shippingAddress2:values["shippingAddress2"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeclass: values["badgeclass"],
          city:values["city"],
          state:values["state"],
          country:values["country"],
          phone:values["phone"],
        }
        console.log(newOrder)
        // save new order
        dispatch(onAddNewOrder(newOrder))
        validation.resetForm()
      }
      toggle()
    },
  })



  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders
  }))

  // console.log(orders)


 
  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
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
      dataField: "orderId",
      text: "Order ID",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.orderId}
        </Link>
      ),
    },
    {
      dataField: "billingName",
      text: "Billing Name",
      sort: true,
    },
    {
      dataField:"shippingAddress1",
      text:"shippingAddress1",
      sort:true,
    },
    {
      dataField:"shippingAddress2",
      text:"shippingAddress2",
      sort:true,
    },
    {
      dataField: "orderdate",
      text: "Date",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => handleValidDate(row.orderdate),
    },
    {
      dataField: "paymentStatus",
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
    //console.log(order)
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
  const handleOrderClicks = () => {
    setOrderList("")
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
                    data={orders}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders}
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
                                        console.log("data")
                                        validation.handleSubmit()
                                        return false
                                      }}
                                    >
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Order Id
                                            </Label>
                                            <Input
                                              name="orderId"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.orderId || ""
                                              }
                                              invalid={
                                                validation.touched.orderId &&
                                                validation.errors.orderId
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.orderId &&
                                            validation.errors.orderId ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.orderId}
                                              </FormFeedback>
                                            ) : null}
                                          </div>
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
                                         
                                         

                                          <div className="mb-3">
                                          <Label className="form-label">
                                          shippingAddress1 
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
                                        shippingAddress2
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
                                              Order Date
                                            </Label>
                                            <Input
                                              name="orderdate"
                                              type="date"
                                              // value={orderList.orderdate || ""}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.orderdate ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched.orderdate &&
                                                validation.errors.orderdate
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.orderdate &&
                                            validation.errors.orderdate ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.orderdate}
                                              </FormFeedback>
                                            ) : null}
                                          </div>
                                         
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Total
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
}

export default withRouter(EcommerceOrders)
