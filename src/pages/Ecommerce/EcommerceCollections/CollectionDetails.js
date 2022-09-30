import React from "react"
import update from 'immutability-helper'
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
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardSubtitle,
} from "reactstrap"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import CollectionProductPreview from "./CollectionProductPreview"
import { useCallback } from "react"
import { useRef } from "react"

export default function EcommerceCollectionDetails() {
  const ref = useRef(null)
  const [collection, setCollection] = useState({
    name: "All products",
  })

  const [products, setProducts] = useState([
    { id: 1, text: "Im a dog" },
    { id: 2, text: "Im a cat" },
    { id: 3, text: "Im a bird" },
    { id: 4, text: "Im a elephant" },
    { id: 5, text: "Im a lion" },
    { id: 6, text: "Im a bird" },
    { id: 7, text: "Im a elephant" },
    { id: 8, text: "Im a lion" },
    { id: 9, text: "Im a bird" },
    { id: 10, text: "Im a elephant" },
    { id: 11, text: "Im a lion" },
    { id: 12, text: "Im a bird" },
    { id: 13, text: "Im a elephant" },
    { id: 14, text: "Im a lion" },
  ])

  const moveCollectionProductPreview = useCallback((dragIndex, hoverIndex) => {
    setProducts(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])

  const renderCollectionProductPreview = useCallback(
    (CollectionProductPreviewItem, index) => {
      return (
        <CollectionProductPreview
          key={CollectionProductPreviewItem.id}
          index={index}
          id={CollectionProductPreviewItem.id}
          text={CollectionProductPreviewItem.text}
          moveCollectionProductPreview={moveCollectionProductPreview}
        />
      )
    },
    []
  )

  return (
    <React.Fragment>
      <div className="page-content" ref={ref}>
        <Container fluid className="mx-auto" style={{ maxWidth: "1100px" }}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Link to={"/ecommerce-collections"}>Collections</Link> &gt;{" "}
                  {collection.name}
                </Col>
              </Row>
              {window.scrollY ? null : <Row className="display-6 m-3">{collection.name}</Row>}
            </Col>
            <Col className="h-100">
              <div className="text-sm-end align-bottom">
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
            <Col className="p-3" xs="8">
              <Card className="h-100">
                <CardHeader>
                  <CardTitle>Products in Collection</CardTitle>
                </CardHeader>
                <CardBody>
                  <DndProvider backend={HTML5Backend}>
                    <Row>
                      {products.map((CollectionProductPreview, i) =>
                        renderCollectionProductPreview(
                          CollectionProductPreview,
                          i
                        )
                      )}
                    </Row>
                  </DndProvider>
                </CardBody>
              </Card>
            </Col>
            <Col className="p-3" xs="4">
              <Card>
                <CardHeader>
                  <CardTitle>Collection Info</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    Collection Name
                    <Input />
                  </div>
                  <div>
                    Collection Image
                    <Dropzone
                      onDrop={() => {
                        console.log("helloo!!")
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone "></div>
                      )}
                    </Dropzone>
                  </div>
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
                      <i className="mdi mdi-ticket me-2" />
                      Create coupon
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-email-open me-2" />
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
