import React from "react"
import { useState } from "react"
import { Container, Card, Row, Col, Button, CardHeader } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { MetaTags } from "react-meta-tags"

export default function EcommerceCollections() {
  const [collections, setCollections] = useState([])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Collections | Scrollit</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title="Ecommerce"
            count={collections.length}
            breadcrumbItem="Collections"
          />
          <Row>
            <Col>
              Group related products into collections and add them to your site.{" "}
              <a className="text-primary">Learn how</a>
            </Col>
            <Col>
              <div className="text-sm-end">
                <Button
                  outline
                  type="button"
                  className="btn-rounded  mb-2 me-2"
                >
                  <i className="mdi mdi-magnify" />
                </Button>
                <Button
                  type="button"
                  color="success"
                  className="btn-rounded  mb-2 me-2"
                >
                  <i className="mdi mdi-plus me-1" />
                  New Collection
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
