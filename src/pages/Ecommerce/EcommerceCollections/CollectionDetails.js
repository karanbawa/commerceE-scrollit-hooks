import React from "react"
import { useState } from "react"
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap"

export default function EcommerceCollectionDetails() {
  const [collection, setCollection] = useState({
    name: "All products",
  })
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>Collections &gt; {collection.name}</Col>
          </Row>
          <Row>
            <Col className="display-5">{collection.name}</Col>
            <Col>
              <div className="text-sm-end">
                <Button
                  outline
                  type="button"
                  className="btn-rounded  mb-2 me-2"
                >
                  <i className="mdi mdi-dots-horizontal" />
                </Button>
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
          <Row className="mx-auto">
            <Col className="p-3" xs="6">
              <Card className="h-100">
                <CardHeader>
                  <CardTitle>Products in Collection</CardTitle>
                </CardHeader>
                <CardBody>prfgdfgdfgdfoduct</CardBody>
              </Card>
            </Col>
            <Col className="p-3" xs="4">
              <Card>
                <CardHeader>
                  <CardTitle>Collection Info</CardTitle>
                </CardHeader>
                <CardBody>
                  <div></div>
                </CardBody>
                <CardFooter className="text-sm-center">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded  m-3"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add Collection to Site
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Promote</CardTitle>
                </CardHeader>
                <CardBody>
                  <ListGroup flush>
                    <ListGroupItem>
                      <i className="mdi mdi-plus me-1" />
                      Create coupon
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-email-open me-1" />
                      Send email campaign
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
