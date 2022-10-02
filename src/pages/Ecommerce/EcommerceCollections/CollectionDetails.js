import React from "react"
import update from "immutability-helper"
import { useState } from "react"
import PropTypes from "prop-types"
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
import { Link, useParams } from "react-router-dom"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import CollectionProductPreview from "./CollectionProductPreview"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductList } from "store/actions"
import { useEffect } from "react"

export default function EcommerceCollectionDetails() {
  const { _id } = useParams()
  const { collections, products } = useSelector(state => ({
    collections: state.ecommerce.collections,
    products: state.ecommerce.productList
  }))

  const collection = collections.filter(collection => collection._id === _id)[0]

  const [collectionName, setCollectionName] = useState(collection.name)
  const [collectionImage, setCollectionImage] = useState(collection.image)
  const [collectionProductIds, setCollectionProductIds] = useState(
    collection.productIds
  )

  useEffect(() => {
    if (products && !products.length) {
      dispatch(getProductList())
    }
  }, [])

  // useEffect(() => {
  //   if (collections) {
  //     setCollection(collections.filter(collection => collection._id === _id)[0])
  //     console.log(collection)
  //   }
  // }, [])

  const moveCollectionProductPreview = useCallback((dragIndex, hoverIndex) => {
    setCollectionProductIds(prevCards =>
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
          key={CollectionProductPreviewItem._id}
          index={index}
          id={CollectionProductPreviewItem.id}
          img={"https://picsum.photos/200"}
          text={CollectionProductPreviewItem.name}
          moveCollectionProductPreview={moveCollectionProductPreview}
        />
      )
    },
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="mx-auto" style={{ maxWidth: "1300px" }}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Link to={"/ecommerce-collections"}>Collections</Link> &gt;{" "}
                  {collectionName}
                </Col>
              </Row>
              <Row className="display-6 m-3">
                {collectionName}
              </Row>
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
                        {collectionProductIds.map(
                          (CollectionProductPreview, i) =>
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
