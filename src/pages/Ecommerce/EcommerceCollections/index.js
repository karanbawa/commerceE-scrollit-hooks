import React from "react"
import { useState } from "react"
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  CardHeader,
  Input,
} from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { Link } from "react-router-dom"
import CollectionTile from "./CollectionTile"

export default function EcommerceCollections() {
  const [collections, setCollections] = useState([])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Collections | Scrollit</title>
        </MetaTags>
        <Container className="p-2" fluid style={{ maxWidth: "1100px" }}>
          <Row>
            <Col className="display-6 ">
              Collections{" "}
              <span className="text-secondary">{collections.length}</span>
            </Col>
            <Col className>
              <div className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                <div className="search-box me-2">
                  <div className="position-relative">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <i className="bx bx-search-alt search-icon" />
                  </div>
                </div>
                <Link to="/ecommerce-add-product">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded m-1"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add Collection
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="px-3 pt-1">
            Group related products into collections and add them to your site.
          </Row>
          <Row className="mt-2">
            <CollectionTile />
            <CollectionTile />
            <CollectionTile />
            <CollectionTile />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
