import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Col,
  Row,
  Card,
  CardSubtitle,
  CardTitle,
  Alert,
} from "reactstrap"
import * as XLSX from "xlsx"
import { useDispatch } from "react-redux"

import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { importCustomers } from "store/actions"

const EcommerceCustomersImportModal = props => {
  const dispatch = useDispatch()
  const { isOpen, toggle, customers } = props
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState(false)
  const [preview, setPreview] = useState(false)
  const [uploadData, setUploadData] = useState([])
  const [dataSelector, setDataSelector] = useState([])
  const [filteredData, setFilteredData] = useState([])

  async function handleImportCustomers(importButtonEvent) {
    const inpFile = importButtonEvent.target.files[0]
    if (!inpFile) return
    const fileExtension = inpFile.name.split(".").pop().toLowerCase()
    if (!(fileExtension == "xlsx" || fileExtension == "csv")) {
      setError(true)
      return
    } else {
      setError(false)
      setFileName(inpFile.name)
      const data = await inpFile.arrayBuffer()
      const wb = XLSX.read(data, {dateNF:'yyyy-mm-dd'})
      const sheet = wb.Sheets[wb.SheetNames[0]]
      dataHandler(XLSX.utils.sheet_to_json(sheet), customers)
    }
  }

  const dataHandler = (upload, customers) => {
    const emailIds = []
    customers.forEach(customer => {
      emailIds.push(customer.email)
    })
    const fil = upload.filter(entry => {
      return !emailIds.includes(entry.email)
    })
    setUploadData(upload)
    setFilteredData(fil)
    setPreview(true)
  }

  const pageOptions = {
    sizePerPage: 4,
    totalSize: dataSelector ? uploadData.length : filteredData.length, // replace later with size(customers),
    custom: true,
  }

  const HandleImportSubmitClick = () => {
    const res = filteredData.map(entry => {
      return {
        ...entry,
        walletBalance: entry.walletBalance.toString(),
        phone: entry.phone.toString(),
      }
    })
    dispatch(
      importCustomers({
        customerInfo: res,
      })
    )
  }

  const EcommerceCustomerImportColumns = [
    {
      text: "username",
      dataField: "username",
      sort: true,
    },
    {
      dataField: "email",
      text: "email",
      sort: true,
    },
    {
      dataField: "phone",
      text: "phone",
      sort: true,
    },
    {
      dataField: "address",
      text: "address",
      sort: true,
    },
    {
      dataField: "rating",
      text: "rating",
      sort: true,
    },
    {
      dataField: "walletBalance",
      text: "walletBalance",
      sort: true,
    },
    {
      dataField: "joiningDate",
      text: "joiningDate",
      sort: true,
    },
  ]
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>
          {preview ? fileName : "Import Customers"}
        </ModalHeader>
        <ModalBody>
          {!preview ? (
            <>
              <Card>
                <CardTitle>Select a File to import entries from</CardTitle>
                <CardSubtitle>
                  Supported file formats are .xlsx(Microsoft Excel Spreadsheet)
                  and .csv.
                </CardSubtitle>
              </Card>
              {error ? (
                <Alert color="danger">
                  The uploaded file is not supported. Please use files with
                  .xlsx or .csv extensions
                </Alert>
              ) : null}
              <Input type="file" onChange={handleImportCustomers} />
            </>
          ) : (
            <>
              <Card>
                <Alert color="warning">
                  <h5 className="alert-heading">Warning</h5>
                  This action is not revertable. All new entries will be
                  imported.
                </Alert>
                <div className="btn-group">
                  <Button
                    color="secondary"
                    type="button"
                    outline={!dataSelector}
                    onClick={() => {
                      !dataSelector ? setDataSelector(!dataSelector) : null
                    }}
                    className="btn-sm"
                  >
                    All Data {uploadData.length} Items
                  </Button>
                  <Button
                    color="secondary"
                    type="button"
                    outline={!!dataSelector}
                    onClick={() => {
                      dataSelector ? setDataSelector(!dataSelector) : null
                    }}
                    className="btn-sm"
                  >
                    New Entries {filteredData.length} Items
                  </Button>
                </div>
              </Card>
              <Col>
                <PaginationProvider
                  pagination={paginationFactory(pageOptions)}
                  keyField="email"
                  columns={EcommerceCustomerImportColumns}
                  data={dataSelector ? uploadData : filteredData}
                >
                  {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                      keyField="email"
                      data={dataSelector ? uploadData : filteredData}
                      columns={EcommerceCustomerImportColumns}
                      bootstrap4
                      search
                    >
                      {toolkitProps => (
                        <React.Fragment>
                          <Row>
                            <Col xl="12">
                              <div className="table-responsive">
                                <BootstrapTable
                                  responsive
                                  bordered={false}
                                  striped={false}
                                  // defaultSorted={defaultSorted}
                                  classes={"table align-middle table-nowrap"}
                                  // keyField="email"
                                  {...toolkitProps.baseProps}
                                  {...paginationTableProps}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="align-items-md-center mt-2 ">
                            <Col className="pagination pagination-rounded justify-content-end mt-2 inner-custom-pagination">
                              <PaginationListStandalone {...paginationProps} />
                            </Col>
                          </Row>
                        </React.Fragment>
                      )}
                    </ToolkitProvider>
                  )}
                </PaginationProvider>
              </Col>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {preview ? (
            <>
              <Button
                type="button"
                color="success"
                onClick={() => {
                  HandleImportSubmitClick()
                  toggle()
                }}
              >
                Import
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={() => {
                  setPreview(false)
                }}
              >
                Upload different file
              </Button>
            </>
          ) : null}

          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

EcommerceCustomersImportModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  customers: PropTypes.array,
  dataFields: PropTypes.array,
}

export default EcommerceCustomersImportModal
