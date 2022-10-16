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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  CardLink,
} from "reactstrap"
import Dropzone from "react-dropzone"
import { Link, useHistory, useParams } from "react-router-dom"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import CollectionProductPreview from "./CollectionProductPreview"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteCollection,
  getCollections,
  getProductList,
  updateCollection,
  updateProductInList,
} from "store/actions"
import { useEffect } from "react"

export default function EcommerceCollectionDetails() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { _id } = useParams()

  // Getting collections and products from store
  const { collections, products } = useSelector(state => ({
    collections: state.ecommerce.collections,
    products: state.ecommerce.productList,
  }))

  //states for Modals
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const toggle1 = () => setModal1(!modal1)

  //states for data
  const [productList, setProductList] = useState([])

  // Getting page specific collection from collections
  const collection = collections.filter(collection => collection._id === _id)[0]

  // Creating a local set of values that will enable editing
  const [collectionName, setCollectionName] = useState(
    collection ? collection.name : ""
  )
  const [collectionImage, setCollectionImage] = useState(
    collection ? collection.image : ""
  )
  const [collectionProductIds, setCollectionProductIds] = useState(
    collection ? collection.productIds : []
  )

  // call APIs if products or collections is empty
  useEffect(() => {
    if (products && !products.length) {
      dispatch(getProductList())
    }
  }, [products])

  useEffect(() => {
    if (collections && !collections.length) {
      dispatch(getCollections())
    }
  }, [collections])

  // redirect to collections page if a wrong id is entered in the address bar by the user
  useEffect(() => {
    if (!collection && _id !== "untitled-collection") {
      history.push("/ecommerce-collections")
    }
  }, [collection, products])

  useEffect(() => {
    setProductList(products)
  })

  // updating products array after drag drop action
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

  // rendering drag drop product cards
  const renderCollectionProductPreview = useCallback(
    (CollectionProductId, index) => {
      const prod = products.filter(
        product => product._id === CollectionProductId
      )[0]
      return (
        <CollectionProductPreview
          key={prod._id}
          index={index}
          id={prod._id}
          price={prod.price}
          img={prod.media[0].url}
          text={prod.name}
          moveCollectionProductPreview={moveCollectionProductPreview}
          collectionProductIds={collectionProductIds}
          setCollectionProductIds={id => {
            setCollectionProductIds(
              collectionProductIds.filter(pid => pid !== id)
            )
          }}
        />
      )
    },
    []
  )

  // handling save action
  const handleSaveCollection = () => {
    if (_id === "untitled-collection") {
    }
    if (
      collection.name === collectionName &&
      collection.image === collectionImage &&
      JSON.stringify(collectionProductIds) ==
        JSON.stringify(collection.productIds)
    ) {
      history.push("/ecommerce-collections")
      return
    } else {
      dispatch(
        updateCollection({
          name: collectionName,
          image: collectionImage,
          _id: _id,
          productIds: collectionProductIds,
        })
      )
    }
    history.push("/ecommerce-collections")
  }

  // update fuction after save collection to site is defined
  const handleSaveCollectiontoSite = () => {
    console.log("I do nothing!!")
  }

  const handleDeleteCollection = () => {
    dispatch(deleteCollection(_id))
    history.push("/ecommerce-collections")
  }
  const toggle = () => setModal(!modal)

  console.log(collectionProductIds)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="mx-auto" style={{ maxWidth: "1300px" }}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Link to={"/ecommerce-collections"}>Collections</Link> &gt;{" "}
                  {collection ? collection.name : "Untitled Product"}
                </Col>
              </Row>
              <Row className="display-6 m-3">
                {collection ? collection.name : "Untitled Product"}
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
                    <DropdownItem href="#" onClick={handleSaveCollection}>
                      <i className="mdi mdi-plus text-success me-2" />
                      Add Collection to Site
                    </DropdownItem>
                    <DropdownItem
                      href="#"
                      onClick={() => {
                        handleDeleteCollection()
                      }}
                    >
                      <i className="mdi mdi-delete text-danger me-2" />
                      Delete Collection
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Button
                  type="button"
                  className="btn-rounded  mb-2 me-2"
                  outline
                  onClick={() => {
                    toggle()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  color="success"
                  className="btn-rounded  mb-2 me-2"
                  onClick={() => {
                    handleSaveCollection()
                  }}
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
                    <Row>
                      <Col>
                        <CardTitle>Products in Collection</CardTitle>
                      </Col>
                      <Col>
                        <Row>
                          <CardLink
                            className="text-sm-end"
                            onClick={() => {
                              toggle1()
                            }}
                          >
                            <i className="mdi mdi-plus" /> Add Products
                          </CardLink>
                        </Row>
                      </Col>
                    </Row>
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
                    <Input
                      className="m-1"
                      value={collectionName}
                      onChange={event => {
                        setCollectionName(event.target.value)
                      }}
                      disabled={_id === "all-products"}
                    />
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
                    onClick={handleSaveCollection}
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
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <Alert color="warning">
              <i className="mdi mdi-alert-outline me-2"></i>The Changes you made
              will be lost !
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Go Back
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => {
                toggle()
                history.push("/ecommerce-collections")
              }}
            >
              Discard Changes
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modal1} toggle={toggle1}>
          <ModalHeader toggle={toggle1}>
            Add Product to {collection.name}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {products
                .filter(product => !collectionProductIds.includes(product._id))
                .map(product => (
                  <ListGroupItem
                    onClick={() => {
                      setCollectionProductIds([
                        ...collectionProductIds,
                        product._id,
                      ])
                    }}
                    key={product._id}
                    style={{ cursor: "pointer" }}
                  >
                    {product.name}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle1}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  )
}
