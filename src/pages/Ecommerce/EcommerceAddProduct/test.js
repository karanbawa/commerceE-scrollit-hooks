import React from "react"
import { PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

export default function test() {
  return (
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
                      keyField="email"
                      {...toolkitProps.baseProps}
                      onTableChange={handleTableChange}
                      {...paginationTableProps}
                      ref={node}
                    />
                  </div>
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Customer" : "Add Customer"}
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
                              <Label className="form-label">UserName</Label>
                              <Input
                                name="username"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ""}
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
                              <Label className="form-label">Phone No</Label>
                              <Input
                                name="phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
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
                              <Label className="form-label">Email Id</Label>
                              <Input
                                name="email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
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
                              <Label className="form-label">Address</Label>
                              <Input
                                name="address"
                                type="textarea"
                                rows="3"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
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
                              <Label className="form-label">Rating</Label>
                              <Input
                                name="rating"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rating || ""}
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
                                value={validation.values.walletBalance || ""}
                                invalid={
                                  validation.touched.walletBalance &&
                                  validation.errors.walletBalance
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.walletBalance &&
                              validation.errors.walletBalance ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.walletBalance}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Joining Date</Label>
                              <Input
                                name="joiningDate"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.joiningDate || ""}
                                invalid={
                                  validation.touched.joiningDate &&
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
                  <PaginationListStandalone {...paginationProps} />
                </Col>
              </Row>
            </React.Fragment>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  )
}
