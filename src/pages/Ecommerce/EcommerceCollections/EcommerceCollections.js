import React from "react"
import { useState } from "react"
import { Container, Card, Row, Col, Button } from "reactstrap"
import CollectionItem from "./CollectionItem"

export default function EcommerceCollections() {
  const [collections, setCollections] = useState([])

  return (
    <div className="main-container page-content">
      <div className="p-4">
        <Row className="d-flex justify-content-end">
          <Col className="">
            <h1>
              Collections{" "}
              <span className="text-secondary t">{collections.length}</span>
            </h1>
          </Col>
          <Col>
            <div className="text-sm-end">
              <Button className="btn-rounded mb-2 me-2">
                <i className="fas fa-search" />
              </Button>
              <Button className="btn-rounded mb-2 me-2">
                <i className="mdi mdi-plus me-1 ml-2" />
                New Collection
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="me-2 mb-3">
            Group related products into collections and add them to your site.
            <a className=""> Learn How</a>
          </div>
        </Row>
        <Row className="mx-auto w-100">
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
          <CollectionItem />
        </Row>
      </div>
    </div>
  )
}
