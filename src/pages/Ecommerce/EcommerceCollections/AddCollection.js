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
  Label,
  Toast,
  ToastHeader,
  ToastBody,
  Spinner,
} from "reactstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import CollectionProductPreview from "./CollectionProductPreview"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCollection, getProductList } from "store/actions"
import { useEffect } from "react"
import FileResizer from "react-image-file-resizer"
import { CirclePicker, SketchPicker } from "react-color"
import IconSelector from "./IconSelector"

export default function AddCollection() {
  const dispatch = useDispatch()
  const history = useHistory()

  // Getting collections and products from store
  const { products } = useSelector(state => ({
    products: state.ecommerce.productList,
  }))

  //states for Modals
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showIconSelector, setShowIconSelector] = useState(false)
  const [toast, setToast] = useState(false)
  const [toastDetails, setToastDetails] = useState({ title: "", message: "" })
  const toggle1 = () => setModal1(!modal1)
  const toggle2 = () => setShowIconSelector(!showIconSelector)
  const toggleToast = () => setToast(!toast)

  //states for data
  const [productList, setProductList] = useState([])
  const [collectionName, setCollectionName] = useState("")
  const [collectionImage, setCollectionImage] = useState("")
  const [collectionProductIds, setCollectionProductIds] = useState([])
  const [collectionColor, setCollectionColor] = useState("#607d8b")
  const [collectionIcon, setCollectionIcon] = useState("zip-disk")
  const [productsToAdd, setProductsToAdd] = useState([])

  // call APIs if products or collections is empty
  useEffect(() => {
    if (products && !products.length) {
      dispatch(getProductList())
    }
  }, [products])

  useEffect(() => {
    setProductList(products)
  }, [products])

  useEffect(() => {
    setProductsToAdd(
      products.filter(product => !collectionProductIds.includes(product._id))
    )
  }, [collectionProductIds, products])

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

  // delete products in array
  const deleteCollectionProductPreview = useCallback(deleteIndex => {
    setCollectionProductIds(prevCards =>
      update(prevCards, {
        $splice: [[deleteIndex, 1]],
      })
    )
  })

  // rendering drag drop product cards
  const renderCollectionProductPreview = useCallback(
    (CollectionProductId, index, products) => {
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
          deleteCollectionProductPreview={deleteCollectionProductPreview}
        />
      )
    },
    []
  )

  // handling create action
  const handleCreateCollection = () => {
    dispatch(
      addCollection({
        name: collectionName ? collectionName : "Untitled Collection",
        image: collectionImage ? collectionImage : "broken!",
        productIds: collectionProductIds,
        color: collectionColor,
        icon: collectionIcon,
      })
    )
    history.push("/ecommerce-collections")
  }

  // update fuction after save collection to site is defined
  const handleSaveCollectiontoSite = () => {
    console.log("I do nothing!!")
  }
  const toggle = () => setModal(!modal)

  const resizeFile = file =>
    new Promise(resolve => {
      FileResizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        uri => {
          setCollectionImage(uri)
        },
        "base64"
      )
    })

  if (!productList.length) {
    return (
      <React.Fragment>
        <div className="page-content">
          <Spinner
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          />
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid className="mx-auto" style={{ maxWidth: "1300px" }}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Link to={"/ecommerce-collections"}>Collections</Link> &gt;{" "}
                    {collectionName ? collectionName : "Untitled Collection"}
                  </Col>
                </Row>
                <Row className="display-6 m-3">
                  {collectionName ? collectionName : "Untitled Collection"}
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
                      <DropdownItem
                        href="#"
                        onClick={handleSaveCollectiontoSite}
                      >
                        <i className="mdi mdi-plus text-success me-2" />
                        Add Collection to Site
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
                      handleCreateCollection()
                    }}
                  >
                    Create Collection
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
                                i,
                                products
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
                      <Label for="cname">Collection Name</Label>
                      <Input
                        id="cname"
                        className="m-1"
                        value={collectionName}
                        onChange={event => {
                          setCollectionName(event.target.value)
                        }}
                      />
                    </div>
                    <div className="m-1 mt-3">
                      <Label for="cimg">Collection Image</Label>
                      <div className="mh-50">
                        <Input
                          id="cimg"
                          onChange={async e => {
                            if (
                              ["jpeg", "jpg", "png"].includes(
                                e.target.files[0].name.split(".").pop()
                              )
                            ) {
                              setToastDetails({
                                title: "Image Uploaded",
                                message: `${e.target.files[0].name} has been uploaded.`,
                              })
                              setToast(true)
                              const image = await resizeFile(e.target.files[0])
                            } else {
                              setToastDetails({
                                title: "Invalid image",
                                message:
                                  "Please upload images with jpg, jpeg or png extension",
                              })
                              setToast(true)
                            }
                          }}
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="m-1 mt-3">
                      <Row>
                        <Col>
                          <Label for="cimg">Collection Colour</Label>
                          <div>
                            <div
                              style={{
                                padding: "5px",
                                background: "#fff",
                                borderRadius: "1px",
                                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                                display: "inline-block",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setShowColorPicker(!showColorPicker)
                              }}
                            >
                              <div
                                style={{
                                  width: "36px",
                                  height: "14px",
                                  borderRadius: "2px",
                                  backgroundColor: collectionColor,
                                }}
                              />
                            </div>
                            {showColorPicker ? (
                              <SketchPicker
                                width="130%"
                                color={collectionColor}
                                onChange={e => {
                                  setCollectionColor(e.hex)
                                }}
                              />
                            ) : null}
                          </div>
                        </Col>
                        <Col>
                          <Label for="cimg">Collection Icon</Label>
                          <div>
                            <i
                              onClick={() => {
                                setShowIconSelector(!showIconSelector)
                              }}
                              className={`mdi mdi-${collectionIcon}`}
                              style={{
                                fontSize: "23px",
                                cursor: "pointer",
                                padding: 0,
                                margin: 0,
                              }}
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="m-1 mt-3"></div>
                  </CardBody>
                  <CardFooter className="text-sm-center">
                    <Button
                      type="button"
                      color="success"
                      className="btn-rounded  m-3"
                      onClick={handleSaveCollectiontoSite}
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
                <i className="mdi mdi-alert-outline me-2"></i>The Changes you
                made will be lost !
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
            <ModalHeader toggle={toggle1}>Add Products</ModalHeader>
            <ModalBody style={{ overflowY: "scroll" }}>
              <ListGroup style={{ maxHeight: "50vh" }}>
                {productsToAdd.map(product => (
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
                    <div className="d-flex">
                      <div>
                        <img
                          style={{ maxWidth: "10vh" }}
                          src={product.media[0].url}
                        />
                      </div>
                      <div className="w-100 mx-3 m-2">
                        <div style={{ fontWeight: 500, fontSize: "16px" }}>
                          {product.name}
                        </div>
                        <div className="mt-1">
                          {product.productItemsSummary}
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
              {productsToAdd.length ? null : (
                <Row>
                  <Col className="text-sm-center">
                    This category includes all of the available products.
                  </Col>
                </Row>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle1}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showIconSelector} toggle={toggle2}>
            <ModalHeader toggle={toggle2}>Icon Selector</ModalHeader>
            <ModalBody>
              <IconSelector
                setShowIconSelector={setShowIconSelector}
                collectionIcon={collectionIcon}
                setCollectionIcon={setCollectionIcon}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle2}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <div
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: "1005" }}
          >
            <Toast isOpen={toast}>
              <ToastHeader toggle={toggleToast}>
                {toastDetails.title}
              </ToastHeader>
              <ToastBody>{toastDetails.message}</ToastBody>
            </Toast>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
