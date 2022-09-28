import React from "react"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Col,
  Row,
} from "reactstrap"

export default function CollectionItemTile() {
  return (
    <Container
      fluid
      className="col-sm-3 bg-primary m-3"
      style={{ width: "500px", height: "500px" }}
    >
      <Row>
        <Col className="text-sm-end">...</Col>
      </Row>
      <Row className="h-50 align-bottom">
        <Col className="  bg-secondary">
          All products <span>14</span>
        </Col>
      </Row>
    </Container>
  )
}
