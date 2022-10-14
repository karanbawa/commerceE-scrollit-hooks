import { Tooltip } from "chart.js"
import React, { useEffect } from "react"
import { useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { getCollections } from "store/actions"

export default function EcommerceAddProduct() {
  const dispatch = useDispatch()

  // states for data
  const [collectionList, setCollectionList] = useState([])
  const [newCollection, setNewCollection] = useState({
    name: "",
  })
  const [productCollections, setProductCollection] = useState(["all-products"])
  const [priceDetails, setPriceDetails] = useState({
    price: 0,
    discont: 0,
    salePrice: 0,
  })

  // states for toggles
  const [inventoryShipping, setInventoryShipping] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [addNewCollection, setAddNewCollection] = useState(false)
  const [isPercent, setIsPercent] = useState("PERCENT")
  const [showPricePerUnit, setShowPricePerUnit] = useState(false)

  const { collections } = useSelector(state => ({
    collections: state.ecommerce.collections,
  }))

  useEffect(() => {
    if (collections && !collections.length) {
      dispatch(getCollections())
    }
  }, [collections])

  useEffect(() => {
    setCollectionList(collections)
  }, [collections])

  console.log(productCollections)

  return (
    <React.Fragment>
      <MetaTags>
        <title>Add Product | Scrollit</title>
      </MetaTags>
      <div className="page-content">
        <Container fluid className="p-2" style={{ maxWidth: "1300px" }}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Link to={"/ecommerce-products"}>Products</Link> &gt; Untitled
                  Product
                </Col>
              </Row>
              <Row className="display-6 m-3">Untitled Product</Row>
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
            <Col xs="8" className="me-4">
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Images and videos</CardTitle>
                  </CardHeader>
                  <CardBody>asdasd</CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Product info</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="col-7">
                        <FormGroup>
                          <Label for="productName">Name</Label>
                          <Input id="productName" name="productname" />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="ribbon">Ribbon</Label>
                          <Input id="ribbon" name="ribbon" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label for="description">Description</Label>
                      <Col>
                        <Input
                          id="description"
                          name="text"
                          type="textarea"
                          className="col-10"
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="m-3">
                      <Row className="my-2">
                        <Col>
                          <div className="col-4">
                            <Label for="price">Price</Label>
                            <Input id="price"></Input>
                          </div>
                        </Col>
                      </Row>
                      <div className="my-3">
                        <Row>
                          <Col>
                            <div className="d-flex m-2">
                              <FormGroup switch>
                                <Input
                                  type="checkbox"
                                  checked={onSale}
                                  onClick={() => {
                                    setOnSale(!onSale)
                                  }}
                                ></Input>
                              </FormGroup>
                              <div>On Sale</div>
                            </div>
                          </Col>
                        </Row>
                        {onSale ? (
                          <Row>
                            <Col>
                              <Label for="discount">Discount</Label>
                              <Input id="discount" />
                            </Col>
                            <Col>
                              <Label for="saleprice">Sale Price</Label>
                              <Input id="saleprice" />
                            </Col>
                          </Row>
                        ) : null}
                      </div>
                      <Row>
                        <Col>
                          <div className="d-flex">
                            <FormGroup switch>
                              <Input
                                type="checkbox"
                                checked={showPricePerUnit}
                                onClick={() => {
                                  setShowPricePerUnit(!showPricePerUnit)
                                }}
                              ></Input>
                            </FormGroup>
                            <div>
                              Show price per unit{" "}
                              <i
                                id="sppr-info"
                                className="mdi mdi-information me-2 mx-1"
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target="sppr-info"
                              >
                                Let customers see prices based on fixed
                                measurement units, e.g., price per 100 grams of
                                cheese.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {showPricePerUnit ? (
                        <div>
                          <Row>
                            <Col>
                              <Label for="pqunits">
                                Total product Quantity in units
                                <i
                                  id="product-quanitiy-info"
                                  className="mdi mdi-information me-2 mx-1"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="product-quanitiy-info"
                                >
                                  Set your product’s unit of measurement to
                                  calculate the base price, e.g., for a product
                                  weighing 1 kilo, you may set the base units to
                                  100 g.
                                </UncontrolledTooltip>
                              </Label>
                              <Input id="pqunits" />
                            </Col>
                            <Col>
                              <Label for="baseunits">
                                Base units
                                <i
                                  id="base-info"
                                  className="mdi mdi-information me-2 mx-1"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="base-info"
                                >
                                  Set your product’s total quantity in units,
                                  e.g., if your product weighs 100 grams and the
                                  unit is grams, then the quantity is 100.
                                </UncontrolledTooltip>
                              </Label>
                              <Input id="baseunits" />
                            </Col>
                          </Row>
                          <Row>
                            <div>Base Price per unit</div>
                            <div>0.00</div>
                          </Row>
                        </div>
                      ) : null}
                      <Row>
                        <Col>
                          <Label for="costofgoods">
                            Cost of Goods
                            <i
                              id="cost-info"
                              className="mdi mdi-information me-2 mx-1"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="cost-info"
                            >
                              The amount you’re spending to produce and sell
                              this product. Your customers won’t see this.
                            </UncontrolledTooltip>
                          </Label>
                          <Input id="costofgoods" />
                        </Col>
                        <Col>
                          <Label for="profit-fixed">
                            Profit
                            <i
                              id="profit-fixed-info"
                              className="mdi mdi-information me-2 mx-1"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="profit-fixed-info"
                            >
                              The price of the product minus your cost of goods.
                            </UncontrolledTooltip>
                          </Label>
                          <Input id="profit-fixed" />
                        </Col>
                        <Col>
                          <Label for="margin">
                            Margin
                            <i
                              id="margin-info"
                              className="mdi mdi-information me-2 mx-1"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="margin-info"
                            >
                              The percentage of the price that’s left after
                              deducting your cost of goods.
                            </UncontrolledTooltip>
                          </Label>
                          <Input id="margin" />
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <CardTitle>Custom Text</CardTitle>
                    <CardText className="text-wrap" style={{ maxWidth: "80%" }}>
                      Allow customers to personalize this product with a custom
                      text field.
                    </CardText>
                    <Button className="btn-rounded" color="success" outline>
                      Add Custom Text Field
                    </Button>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <CardTitle>Product options</CardTitle>
                    <CardText className="text-wrap" style={{ maxWidth: "80%" }}>
                      Does your product come in different options, like size,
                      color or material? Add them here.
                    </CardText>
                    <Button className="btn-success btn-rounded">
                      <i className="mdi mdi-plus me-1" />
                      Add Options
                    </Button>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Inventory and Shipping</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <FormGroup switch>
                        <Input type="checkbox"></Input>
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col xs="3">
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <div className="p-2">
                      <Input type="checkbox" className="p-1 mx-2" />
                      Show in online store
                    </div>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Collections</CardTitle>
                  </CardHeader>
                  <ListGroup flush>
                    {collectionList.map(collection => (
                      <ListGroupItem key={collection._id}>
                        <Input
                          type="checkbox"
                          key={collection._id}
                          checked={productCollections.includes(collection._id)}
                          disabled={collection._id === "all-products"}
                          className="mx-2"
                          onClick={() => {
                            productCollections.includes(collection._id)
                              ? setProductCollection(
                                  productCollections.filter(
                                    cid => cid !== collection._id
                                  )
                                )
                              : setProductCollection([
                                  ...productCollections,
                                  collection._id,
                                ])
                          }}
                        />
                        {collection.name}
                      </ListGroupItem>
                    ))}
                    <ListGroupItem>
                      {addNewCollection ? (
                        <div className="d-flex align-items-center ">
                          <Input
                            className="p-1 mx-1 me-3"
                            value={newCollection.name}
                            onChange={e => {
                              setNewCollection({
                                included: newCollection.included,
                                name: e.target.value,
                              })
                            }}
                          />
                          <i
                            className="mdi mdi-check mdi-24px mx-2 text-success"
                            style={{ cursor: "pointer" }}
                          />
                          <i
                            onClick={() => {
                              setAddNewCollection(!addNewCollection)
                            }}
                            className="mdi mdi-close mdi-24px me-1 text-danger"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      ) : (
                        <CardLink
                          className="mx-2"
                          onClick={() => {
                            setAddNewCollection(!addNewCollection)
                          }}
                        >
                          {" "}
                          <i className="mdi mdi-plus me-1" />
                          Add new collection
                        </CardLink>
                      )}
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Promote</CardTitle>
                  </CardHeader>
                  <ListGroup flush>
                    <ListGroupItem>
                      <i className="mdi mdi-ticket me-2" />
                      Create coupon
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-email-open me-2" />
                      Send email campaign
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="mdi mdi-web me-2" />
                      Edit SEO settings
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Advanced</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <Label for="fulfilled-select">
                        Fulfilled by{" "}
                        <i
                          href="#"
                          id="fulfilled-info"
                          className="mdi mdi-information me-2 mx-1"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="fulfilled-info"
                        >
                          Choose who is packing and shipping this product.
                        </UncontrolledTooltip>
                      </Label>
                      <Input
                        id="fulfilled-select"
                        name="select"
                        type="select"
                        disabled
                      >
                        <option>You (self fulfilled)</option>
                        <option>Some Other option</option>
                      </Input>
                    </div>
                    <div className="mt-3">
                      <Label for="brand">
                        Brand
                        <i
                          id="brand-info"
                          className="mdi mdi-information me-2 mx-1"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="brand-info"
                        >
                          Including a brand name can help improve your site’s
                          visibility on search engines.
                        </UncontrolledTooltip>
                      </Label>
                      <Input id="brand" />
                    </div>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card>
                  <CardBody>
                    <CardTitle>Hire a professional</CardTitle>
                    <CardText>
                      Optimize your stores product pages with the help of an
                      expert.
                    </CardText>
                    <CardLink>Get Started</CardLink>
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
