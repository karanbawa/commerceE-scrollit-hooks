import React from "react"
import update from "immutability-helper"
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
  CardGroup,
} from "reactstrap"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import CollectionProductPreview from "./CollectionProductPreview"
import { useCallback } from "react"

export default function EcommerceCollectionDetails() {
  const [collection, setCollection] = useState({
    name: "All products",
  })
  const [isMutable, setIsMutable] = useState(true)

  const [products, setProducts] = useState([
    { id: 1, text: "Im a dog", img: "https://picsum.photos/id/1024/200" },
    { id: 2, text: "Im a cat", img: "https://picsum.photos/id/1028/200" },
    { id: 3, text: "Im a bird", img: "https://picsum.photos/id/1035/200" },
    { id: 4, text: "Im a elephant", img: "https://picsum.photos/id/1040/200" },
    { id: 5, text: "Im a lion", img: "https://picsum.photos/id/1047/200" },
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
          img={CollectionProductPreviewItem.img}
          text={CollectionProductPreviewItem.text}
          moveCollectionProductPreview={moveCollectionProductPreview}
        />
      )
    },
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="mx-auto" style={{ maxWidth: "1100px" }}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Link to={"/ecommerce-collections"}>Collections</Link> &gt;{" "}
                  {collection.name}
                </Col>
              </Row>
              <Row className="display-6 m-3">{collection.name}</Row>
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
            <Col className="p-3" xs="8">
              <Card className="h-100">
                <CardHeader>
                  <Col>
                    <CardTitle>Products in Collection</CardTitle>
                  </Col>
                  <Col></Col>
                </CardHeader>
                <CardBody>
                  <DndProvider backend={HTML5Backend}>
                    <Row>
                      <CardGroup>
                        {products.map((CollectionProductPreview, i) =>
                          renderCollectionProductPreview(
                            CollectionProductPreview,
                            i
                          )
                        )}
                      </CardGroup>
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
                  <div className="m-1">
                    Collection Name
                    <Input className="m-1" />
                  </div>
                  <div className="m-1 mt-3">
                    Collection Image
                    <div className="mh-50">
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
