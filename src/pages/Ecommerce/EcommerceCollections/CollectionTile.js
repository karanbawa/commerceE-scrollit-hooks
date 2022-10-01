import React from "react"
import { Link } from "react-router-dom"
import { Col, Row } from "reactstrap"

export default function CollectionTile({}) {
  const collection = {
    name: "Collection",
    products: [1, 2, 3],
  }
  return (
    <Link className="col-4 pt-4" to={`/ecommerce-collection-details/${1}`}>
      <div
        className="bg-secondary rounded d-flex flex-column justify-content-between"
        style={{ minHeight: "280px" }}
      >
        <Row>
          <Col className="text-sm-end m-3 mx-4">
            <Link>
              <i className="mdi mdi-dots-horizontal mdi-24px text-white" />
            </Link>
          </Col>
        </Row>
        <div className="m-2 position-fixed-bottom text-white p-2 mx-3 font-size-18">
          {collection.name}
          <span className="mx-2">{collection.products.length}</span>
        </div>
      </div>
    </Link>
  )
}
