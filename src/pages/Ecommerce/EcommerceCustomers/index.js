import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import * as moment from "moment"
import * as Yup from "yup"
import { useFormik } from "formik"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown,
  Input,
  FormFeedback,
  Label,
  Form,
  Dropdown,
} from "reactstrap"
import * as XLSX from "xlsx"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import DeleteModal from "../../../components/Common/DeleteModal"
import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
  deleteAllCustomers,
} from "store/e-commerce/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import EcommerceCustomersImportModal from "./EcommerceCustomersImportModal"
import DeleteAllModal from "components/Common/DeleteAllModal"

const EcommerceCustomers = props => {
  const dispatch = useDispatch()

  const { customers } = useSelector(state => ({
    customers: state.ecommerce.customers,
  }))

  const [modal, setModal] = useState(false)
  const [customerList, setCustomerList] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [modal1, setModal1] = useState(false)
  const toggleViewModal = () => setModal1(!modal1)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: (customer && customer.username) || "",
      phone: (customer && customer.phone) || "",
      email: (customer && customer.email) || "",
      address: (customer && customer.address) || "",
      rating: (customer && customer.rating) || "",
      walletBalance: (customer && customer.walletBalance) || "",
      joiningDate: (customer && customer.joiningDate) || "",
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
      if (isEdit) {
        const updateCustomer = {
          ...customer,
          username: values.username,
          phone: values.phone,
          email: values.email,
          address: values.address,
          rating: values.rating,
          walletBalance: values.walletBalance,
          joiningDate: values.joiningDate,
        }
        // update customer
        dispatch(onUpdateCustomer(updateCustomer))
        validation.resetForm()
      } else {
        const newCustomer = {
          username: values["username"],
          phone: values["phone"],
          email: values["email"],
          address: values["address"],
          rating: values["rating"],
          walletBalance: values["walletBalance"],
          joiningDate: values["joiningDate"],
        }
        // save new customer
        dispatch(onAddNewCustomer(newCustomer))
        validation.resetForm()
      }
      toggle()
    },
  })

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: customers.length, // replace later with size(orders),
    custom: true,
  }

  const EcommerceCustomerColumns = [
    {
      text: "_id",
      dataField: "_id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => <>{row._id}</>,
    },
    {
      dataField: "username",
      text: "Name",
      sort: true,
      formatter: (cellContent, row) => (
        <p className="mb-1 text-wrap" style={{ maxWidth: "300px" }}>
          {row.username}
        </p>
      )
    },
    {
      text: "Phone / Email",
      dataField: "phone",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <p className="mb-1">{row.phone}</p>
          <p className="mb-0">{row.email}</p>
        </>
      ),
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <p className="mb-1 text-wrap" style={{ maxWidth: "300px" }}>
          {row.address}
        </p>
      ),
    },
    {
      dataField: "rating",
      text: "Rating",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Badge color="success" className="bg-success font-size-12">
          <i className="mdi mdi-star me-1" />
          {row.rating}
        </Badge>
      ),
    },
    {
      dataField: "walletBalance",
      text: "Wallet Balances",
      sort: true,
    },
    {
      dataField: "joiningDate",
      text: "Joining Date",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => handleValidDate(row.joiningDate),
    },
    {
      dataField: "menu",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, customer) => (
        <UncontrolledDropdown direction="left">
          <DropdownToggle href="#" className="card-drop" tag="i">
            <i className="mdi mdi-dots-horizontal font-size-18" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem
              href="#"
              onClick={() => handleCustomerClick(customer)}
            >
              <i className="fas fa-pencil-alt text-success me-1" />
              Edit
            </DropdownItem>
            <DropdownItem href="#" onClick={() => onClickDelete(customer)}>
              <i className="fas fa-trash-alt text-danger me-1" />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ]

  const toggle = () => {
    if (modal) {
      setModal(false)
      setCustomer(null)
    } else {
      setModal(true)
    }
  }

  const handleCustomerClick = arg => {
    setCustomer(arg)
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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteAllModal, setDeleteAllModal] = useState(false)

  const onClickDelete = customer => {
    setCustomer(customer)
    setDeleteModal(true)
  }

  const handleDeleteCustomer = () => {
    if (customer.email) {
      dispatch(onDeleteCustomer(customer))
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }

  const handleDeleteAllCustomers = () => {
    dispatch(deleteAllCustomers())
    setDeleteAllModal(false)
  }

  const dataFields = [
    "username",
    "email",
    "phone",
    "address",
    "rating",
    "walletBalance",
    "joiningDate",
  ]

  const handleExportCustomers = format => {
    const filteredData = customerList.map(obj =>
      Object.fromEntries(
        Object.entries(obj).filter(r => dataFields.indexOf(r[0]) > -1)
      )
    )
    const book = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(filteredData)
    XLSX.utils.book_append_sheet(book, ws, "Customers")
    XLSX.writeFile(book, `Customers.${format}`)
  }

  const handleDownloadTemplate = format => {
    const book = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([dataFields])
    XLSX.utils.book_append_sheet(book, ws, "Customers")
    XLSX.writeFile(book, `Customers Template.${format}`)
  }

  const { SearchBar } = Search

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers())
    }
  }, [])

  useEffect(() => {
    setCustomerList(customers)
  }, [customers])

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers)
    }
  }, [customers])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setCustomerList(
      customers.filter(customer =>
        Object.keys(customer).some(key =>
          customer[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
  }

  const handleCustomerClicks = () => {
    setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  // const defaultSorted = [
  //   {
  //     dataField: "_id",
  //     order: "desc",
  //   },
  // ]

  /** set Date formate */
  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  return (
    <React.Fragment>
      <EcommerceCustomersImportModal
        isOpen={modal1}
        toggle={toggleViewModal}
        customers={customerList}
        dataFields={dataFields}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteAllModal
        show={deleteAllModal}
        onDeleteClick={handleDeleteAllCustomers}
        onCloseClick={() => setDeleteAllModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Customers | Scrollit</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title="Ecommerce"
            count={customers.length}
            breadcrumbItem="Customers"
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="email"
                    columns={EcommerceCustomerColumns}
                    data={customers}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="email"
                        data={customers || []}
                        columns={EcommerceCustomerColumns}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end btn-grp">
                                  <Button
                                    type="file"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={toggleViewModal}
                                  >
                                    <i className="me-2 me-2 fa fa-file-import " />
                                    Import
                                  </Button>
                                  <UncontrolledDropdown
                                    direction="left"
                                    className="d-inline mb-2 me-2 align-middle"
                                  >
                                    <DropdownToggle
                                      className=" btn-rounded btn-primary align-middle mb-2"
                                      color="success"
                                      href="#"
                                    >
                                      <i className="me-2 me-2 fa fa-file-export " />{" "}
                                      Export
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem
                                        href="#"
                                        onClick={() =>
                                          handleExportCustomers("xlsx")
                                        }
                                        disabled={customerList.length === 0}
                                      >
                                        <i className="fas fa-file-excel text-success me-2" />
                                        Save as Customers.xlsx
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={() =>
                                          handleExportCustomers("csv")
                                        }
                                        disabled={customerList.length === 0}
                                      >
                                        <i className="fas fa-file-excel text-success me-2" />
                                        Save as Customers.csv
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={() =>
                                          handleDownloadTemplate("xlsx")
                                        }
                                      >
                                        <i className="fas fa-file-excel text-success me-2" />
                                        Download template - xlsx
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={() =>
                                          handleDownloadTemplate("csv")
                                        }
                                      >
                                        <i className="fas fa-file-excel text-success me-2" />
                                        Download template - csv
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={handleCustomerClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    New customer
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
                                    Delete all customers
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    // defaultSorted={defaultSorted}
                                    classes={"table align-middle table-nowrap"}
                                    keyField="email"
                                    {...toolkitProps.baseProps}
                                    onTableChange={handleTableChange}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit
                                      ? "Edit Customer"
                                      : "Add Customer"}
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
                                              UserName
                                            </Label>
                                            <Input
                                              name="username"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.username || ""
                                              }
                                              invalid={
                                                validation.touched.username &&
                                                validation.errors.username
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.username &&
                                            validation.errors.username ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.username}
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
                                              onChange={validation.handleChange}
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
                                              Email Id
                                            </Label>
                                            <Input
                                              name="email"
                                              type="email"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.email || ""
                                              }
                                              invalid={
                                                validation.touched.email &&
                                                validation.errors.email
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.email &&
                                            validation.errors.email ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.email}
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
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.address || ""
                                              }
                                              invalid={
                                                validation.touched.address &&
                                                validation.errors.address
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.address &&
                                            validation.errors.address ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.address}
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
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.rating || ""
                                              }
                                              invalid={
                                                validation.touched.rating &&
                                                validation.errors.rating
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.rating &&
                                            validation.errors.rating ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.rating}
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
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values
                                                  .walletBalance || ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .walletBalance &&
                                                validation.errors.walletBalance
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.walletBalance &&
                                            validation.errors.walletBalance ? (
                                              <FormFeedback type="invalid">
                                                {
                                                  validation.errors
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
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.joiningDate ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .joiningDate &&
                                                validation.errors.joiningDate
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.joiningDate &&
                                            validation.errors.joiningDate ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.joiningDate}
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

EcommerceCustomers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
}

export default EcommerceCustomers
