import { Tooltip } from "chart.js"
import React from "react"
import { useState } from "react"
import { MetaTags } from "react-meta-tags"
import { Link } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown,
} from "reactstrap"

export default function EcommerceAddProduct() {
  const [inventoryShipping, setInventoryShipping] = useState(false)
  return (
    <React.Fragment>
      <MetaTags>
        <title>Add Product | Scrollit</title>
      </MetaTags>
      <div className="page-content">
        <Container fluid className="p-2" style={{ maxWidth: "1300px" }}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Link to={"/ecommerce-products"}>Products</Link> &gt; Untitled
                  Product
                </Col>
              </Row>
              <Row className="display-6 m-3">Untitled Product</Row>
            </Col>
            <Col className="h-100">
              <div className="text-sm-end align-bottom m-4">
                <UncontrolledDropdown
                  direction="left"
                  className="d-inline mb-2 me-2 align-middle"
                >
                  <DropdownToggle
                    outline
                    className=" btn-rounded align-middle mb-2"
                    href="#"
                  >
                    <i className="mdi mdi-dots-horizontal" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem href="#">
                      <i className="mdi mdi-plus text-success me-2" />
                      Add Collection to Site
                    </DropdownItem>
                    <DropdownItem href="#">
                      <i className="mdi mdi-delete text-danger me-2" />
                      Delete Collection
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Button
                  type="button"
                  className="btn-rounded  mb-2 me-2"
                  outline
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  color="success"
                  className="btn-rounded  mb-2 me-2"
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="8">
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Images and videos</CardTitle>
                  </CardHeader>
                  <CardBody>asdasd</CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Product info</CardTitle>
                  </CardHeader>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardBody></CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <CardTitle>Custom Text</CardTitle>
                    <CardText className="text-wrap" style={{ maxWidth: "80%" }}>
                      Allow customers to personalize this product with a custom
                      text field.
                    </CardText>
                    <Button className="btn-rounded" color="success" outline>
                      Add Custom Text Field
                    </Button>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <CardTitle>Product options</CardTitle>
                    <CardText className="text-wrap" style={{ maxWidth: "80%" }}>
                      Does your product come in different options, like size,
                      color or material? Add them here.
                    </CardText>
                    <Button className="btn-success btn-rounded">
                      <i className="mdi mdi-plus me-1" />
                      Add Options
                    </Button>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Inventory and Shipping</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <FormGroup switch>
                        <Input type="checkbox"></Input>
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col xs="4">
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <div className="p-2">
                      <Input type="checkbox" className="p-1 mx-2" />
                      Show in online store
                    </div>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Collections</CardTitle>
                  </CardHeader>
                  <ListGroup flush>
                    <ListGroupItem>
                      <Input type="checkbox" className="mx-2" />
                      Collection
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-email-open me-2" />
                      Send email campaign
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-web me-2" />
                      Edit SEO settings
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Promote</CardTitle>
                  </CardHeader>
                  <ListGroup flush>
                    <ListGroupItem>
                      <i className="mdi mdi-ticket me-2" />
                      Create coupon
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-email-open me-2" />
                      Send email campaign
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-web me-2" />
                      Edit SEO settings
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Advanced</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <Label for="fulfilled-select">
                        Fulfilled by{" "}
                        <i
                          id="fulfilled-info"
                          className="mdi mdi-information me-2 mx-1"
                        />
                      </Label>
                      <Input
                        id="fulfilled-select"
                        name="select"
                        type="select"
                        disabled
                      >
                        <option>You (self fulfilled)</option>
                        <option>Some Other option</option>
                      </Input>
                    </div>
                    <div className="mt-3">
                      <Label for="brand">
                        Brand
                        <i
                          id="brand-info"
                          className="mdi mdi-information me-2 mx-1"
                        />
                      </Label>
                      <Input id="brand" />
                    </div>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card>
                  <CardBody>
                    <CardTitle>Hire a professional</CardTitle>
                    <CardText>
                      Optimize your stores product pages with the help of an
                      expert.
                    </CardText>
                    <CardLink>Get Started</CardLink>
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
