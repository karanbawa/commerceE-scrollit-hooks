import { Tooltip } from "chart.js"
import { LatLng, point } from "leaflet"
import React, { useEffect } from "react"
import { useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardLink,
  CardSubtitle,
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { addCollection, getCollections } from "store/actions"
import * as convert from "convert-units"
import RichTextEditor from "react-rte"
import AddInfoSectionModal from "./AddInfoSectionModal"
import Creatable from "react-select/creatable"
import AddProductVariants from "./AddProductVariants"

export default function EcommerceAddProduct() {
  const dispatch = useDispatch()

  // ---STATES FOR PRODUCT DATA--

  // Images
  const [productMedia, setProductMedia] = useState([])

  // Product information
  const [productName, setProductName] = useState("")
  const [productTag, setProductTag] = useState("")
  const [descCont, setDescCont] = useState({
    value: RichTextEditor.createEmptyValue(),
  })

  // Collections
  const [collectionList, setCollectionList] = useState([])
  const [newCollection, setNewCollection] = useState({
    name: "",
  })
  const [productCollections, setProductCollection] = useState(["all-products"])

  const [priceDetails, setPriceDetails] = useState({
    price: 0,
    discount: 0,
    salePrice: 0,
    isPercent: true,
    cost: 0,
  })
  const [inventoryDetails, setInventoryDetails] = useState({
    status: "In stock",
    SKU: "",
    shippingWeight: 0,
  })
  const [preOrderDetails, setPreorderDetails] = useState({
    message: "",
    limit: false,
    limitCount: 0,
  })
  const [perUnitDetails, setPerUnitDetails] = useState({
    total: 0,
    tunits: "g",
    base: 0,
    bunits: "mcg",
  })
  const [customTextDetails, setCustomTextDetails] = useState({
    title: "",
    charLin: 500,
    mandatoryField: false,
  })
  const [basePricePerUnit, setBasePricePerUnit] = useState(0)
  const [additionalInfoSections, setAdditionalInfoSections] = useState([])
  const [infosection, setInfosection] = useState({
    title: "",
    id: "",
    description: "",
  })
  // states for toggles
  const [inventoryShipping, setInventoryShipping] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [addNewCollection, setAddNewCollection] = useState(false)
  const [showPricePerUnit, setShowPricePerUnit] = useState(false)
  const [showInWebstie, setShowInWebsite] = useState(false)
  const [preOrder, setPreorder] = useState(false)
  const [customText, setCustomText] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [addProductOption, setAddProductOption] = useState(false)
  const [editVariantsModal, setEditVariantsModal] = useState(false)
  const [variants, setVariants] = useState({})
  const infoModalToggle = () => setInfoModal(!infoModal)
  const addProductOptionToggle = () => {
    if (addProductOption) {
      setEditVariant(null)
    }
    setAddProductOption(!addProductOption)
  }
  const editVariantsModalToggle = () => setEditVariantsModal(!editVariantsModal)
  const [editVariant, setEditVariant] = useState(null)

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

  const desChnage = value => {
    setDescCont({ value })
  }

  console.log({
    name: productName,
    tag: productTag,
    productItemsSummary: descCont.value.toString("html"),
    additionalInfo: additionalInfoSections.map((section, index) => ({
      title: section.title,
      description: section.description.toString("html"),
      index: index + 1,
    })),
    price: priceDetails.price,
    costAndProfitData: {
      itemCost: priceDetails.cost,
    },
    formattedPricePerUnit: priceDetails.salePrice,
    pricePerUnitData: {
      totalMeasurementUnit: perUnitDetails.tunits,
      totalQuantity: perUnitDetails.total,
      baseQuantity: perUnitDetails.base,
      baseMeasurementUnit: perUnitDetails.bunits,
    },
    currency: "INR",
    customTextFields: [
      customText
        ? {
            inputLimit: customTextDetails.charLin,
            isMandatory: customTextDetails.mandatoryField,
            title: customTextDetails.title.length,
          }
        : null,
    ],
    discount: onSale
      ? {
          mode: priceDetails.isPercent ? "PERCENT" : "AMOUNT",
          value: priceDetails.discount,
        }
      : { mode: "PERCENT", value: 0 },
    isVisible: showInWebstie,
  })

  useEffect(() => {
    try {
      const s =
        (onSale
          ? priceDetails.salePrice
          : priceDetails.price /
            parseFloat(
              convert(perUnitDetails.total)
                .from(perUnitDetails.tunits)
                .to(perUnitDetails.bunits)
            )) * perUnitDetails.base
      setBasePricePerUnit(s ? s : 0.0)
    } catch {
      console.log(e)
    }
  }, [perUnitDetails, priceDetails])

  console.log(variants)

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
                  Create
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="8" className="me-4">
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {productMedia.length ? (
                      <div></div>
                    ) : (
                      <div>There are no images</div>
                    )}
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Product information</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="col-7">
                        <FormGroup>
                          <Label for="productName">Name</Label>
                          <Input
                            id="productName"
                            name="productname"
                            value={productName}
                            onChange={e => {
                              setProductName(e.target.value)
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="ribbon">Tag</Label>
                          <Input
                            id="ribbon"
                            name="ribbon"
                            value={productTag}
                            onChange={e => {
                              setProductTag(e.target.value)
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label for="description">Description</Label>
                      <Col>
                        <RichTextEditor
                          value={descCont.value}
                          onChange={desChnage}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Additional information sections</CardTitle>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ListGroup flush>
                      {additionalInfoSections.length ? (
                        additionalInfoSections.map(section => (
                          <ListGroupItem
                            onClick={() => {
                              setInfosection(section)
                              infoModalToggle()
                            }}
                            key={section.id}
                            tag="button"
                            style={{ textAlign: "start" }}
                          >
                            <Row className="d-flex">
                              <Col
                                className="col-4"
                                style={{ fontWeight: 500 }}
                              >
                                {section.title}
                              </Col>
                              <Col>
                                {section.description.toString("markdown")}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))
                      ) : (
                        <div className="p-2 mx-3 mt-2">
                          Share information like return policy or care
                          instructions with your customers.
                        </div>
                      )}
                      <ListGroupItem
                        tag={"button"}
                        onClick={() => {
                          setInfosection(null)
                          infoModalToggle()
                        }}
                        className="text-primary"
                        style={{ textAlign: "start" }}
                      >
                        <i className="mdi mdi-plus me-1" /> Add information
                        section
                      </ListGroupItem>
                    </ListGroup>
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
                      <Row className="my-3">
                        <Col>
                          <div className="col-4">
                            <Label for="price">Price</Label>
                            <div className="d-flex">
                              <Input
                                type="number"
                                id="price"
                                value={priceDetails.price}
                                onChange={e => {
                                  const pri = parseInt(e.target.value)
                                  setPriceDetails({
                                    ...priceDetails,
                                    price: pri,
                                    salePrice: priceDetails.isPercent
                                      ? Math.round(
                                          (1 - priceDetails.discount / 100) *
                                            pri
                                        )
                                      : pri - priceDetails.discount,
                                  })
                                }}
                              />
                              <div
                                className={"mx-3"}
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                &#8377;
                              </div>
                            </div>
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
                                    setPriceDetails({
                                      ...priceDetails,
                                      discount: 0,
                                      salePrice: priceDetails.price,
                                    })
                                    setOnSale(!onSale)
                                  }}
                                ></Input>
                              </FormGroup>
                              <div
                                style={{ fontSize: "0.9rem", fontWeight: 500 }}
                                className="mx-1"
                              >
                                On Sale
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {onSale ? (
                          <Row>
                            <Col>
                              <Label for="discount">Discount</Label>
                              <div className="d-flex">
                                <Input
                                  className="me-2"
                                  type="number"
                                  id="discount"
                                  value={priceDetails.discount}
                                  onChange={e => {
                                    let dis = parseInt(e.target.value)
                                    setPriceDetails({
                                      ...priceDetails,
                                      discount: dis,
                                      salePrice: priceDetails.isPercent
                                        ? Math.round(
                                            priceDetails.price *
                                              (1 - parseInt(dis) / 100)
                                          )
                                        : priceDetails.price - parseInt(dis),
                                    })
                                  }}
                                />
                                <div
                                  onClick={() => {
                                    setPriceDetails({
                                      ...priceDetails,
                                      isPercent: true,
                                      salePrice:
                                        priceDetails.price *
                                        (1 - priceDetails.discount / 100),
                                    })
                                  }}
                                  className={
                                    priceDetails.isPercent
                                      ? "text-primary mx-2"
                                      : "mx-2"
                                  }
                                  style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  %
                                </div>
                                <div
                                  onClick={() => {
                                    setPriceDetails({
                                      ...priceDetails,
                                      isPercent: false,
                                      salePrice:
                                        priceDetails.price -
                                        priceDetails.discount,
                                    })
                                  }}
                                  className={
                                    priceDetails.isPercent
                                      ? "mx-2"
                                      : "text-primary mx-2"
                                  }
                                  style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  &#8377;
                                </div>
                              </div>
                            </Col>
                            <Col>
                              <Label for="saleprice">Sale Price</Label>
                              <div className="d-flex">
                                <Input
                                  type="number"
                                  id="saleprice"
                                  value={priceDetails.salePrice}
                                  onChange={e => {
                                    const sal = parseInt(e.target.value)
                                    setPriceDetails({
                                      ...priceDetails,
                                      salePrice: sal,
                                      discount: priceDetails.isPercent
                                        ? ((priceDetails.price - sal) /
                                            priceDetails.price) *
                                          100
                                        : priceDetails.price - sal,
                                    })
                                  }}
                                />{" "}
                                <div
                                  className={"text-primary mx-3"}
                                  style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  &#8377;
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Row>
                          <Col>
                            <div className="d-flex mx-2">
                              <FormGroup switch>
                                <Input
                                  type="checkbox"
                                  checked={showPricePerUnit}
                                  onClick={() => {
                                    setShowPricePerUnit(!showPricePerUnit)
                                  }}
                                ></Input>
                              </FormGroup>
                              <div
                                style={{ fontSize: "0.9rem", fontWeight: 500 }}
                                className="mx-1"
                              >
                                Show price per unit
                                <i
                                  id="sppr-info"
                                  className="mdi mdi-information me-2 mx-1"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="sppr-info"
                                >
                                  Let customers see prices based on fixed
                                  measurement units, e.g., price per 100 grams
                                  of cheese.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {showPricePerUnit ? (
                          <div>
                            <Row className="my-3">
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
                                    calculate the base price, e.g., for a
                                    product weighing 1 kilo, you may set the
                                    base units to 100 g.
                                  </UncontrolledTooltip>
                                </Label>
                                <Row>
                                  <Col xs="8">
                                    <Input
                                      id="pqunits"
                                      type="number"
                                      min={0}
                                      value={perUnitDetails.total}
                                      onChange={e => {
                                        setPerUnitDetails({
                                          ...perUnitDetails,
                                          total: parseInt(e.target.value),
                                        })
                                      }}
                                    />
                                  </Col>
                                  <Col>
                                    <Input
                                      value={perUnitDetails.tunits}
                                      type="select"
                                      onChange={e => {
                                        setPerUnitDetails({
                                          ...perUnitDetails,
                                          tunits: e.target.value,
                                        })
                                      }}
                                    >
                                      <option
                                        style={{
                                          fontWeight: 700,
                                          backgroundColor: "whitesmoke",
                                        }}
                                        disabled
                                      >
                                        Length
                                      </option>
                                      {convert()
                                        .possibilities("length")
                                        .map(metric => (
                                          <option key={"mn" + metric}>
                                            {metric}
                                          </option>
                                        ))}
                                      <option
                                        style={{
                                          fontWeight: 700,
                                          backgroundColor: "whitesmoke",
                                        }}
                                        disabled
                                      >
                                        Mass
                                      </option>
                                      {convert()
                                        .possibilities("mass")
                                        .map(metric => (
                                          <option key={"mn" + metric}>
                                            {metric}
                                          </option>
                                        ))}
                                      <option
                                        disabled
                                        style={{
                                          fontWeight: 700,
                                          backgroundColor: "whitesmoke",
                                        }}
                                      >
                                        Volume
                                      </option>
                                      {convert()
                                        .possibilities("volume")
                                        .map(metric => (
                                          <option key={"mn" + metric}>
                                            {metric}
                                          </option>
                                        ))}
                                      <option
                                        style={{
                                          fontWeight: 700,
                                          backgroundColor: "whitesmoke",
                                        }}
                                        disabled
                                      >
                                        Area
                                      </option>
                                      {convert()
                                        .possibilities("area")
                                        .map(metric => (
                                          <option key={"mn" + metric}>
                                            {metric}
                                          </option>
                                        ))}
                                    </Input>
                                  </Col>
                                </Row>
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
                                    e.g., if your product weighs 100 grams and
                                    the unit is grams, then the quantity is 100.
                                  </UncontrolledTooltip>
                                </Label>
                                <Row>
                                  <Col>
                                    <Input
                                      id="baseunits"
                                      type="number"
                                      min={0}
                                      value={perUnitDetails.base}
                                      onChange={e => {
                                        setPerUnitDetails({
                                          ...perUnitDetails,
                                          base: parseInt(e.target.value),
                                        })
                                      }}
                                    />
                                  </Col>
                                  <Col>
                                    <Input type="select">
                                      {convert()
                                        .from(perUnitDetails.tunits)
                                        .possibilities()
                                        .map(metric => (
                                          <option key={"syb" + metric}>
                                            {metric}
                                          </option>
                                        ))}
                                    </Input>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row className="">
                              <div style={{ fontWeight: 600 }}>
                                Base Price per unit
                              </div>
                              <div>&#8377; {basePricePerUnit}</div>
                            </Row>
                          </div>
                        ) : null}
                      </div>
                      <Row className="my-4">
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
                          <div className="d-flex ">
                            <Input
                              id="costofgoods"
                              type="number"
                              min={0}
                              value={priceDetails.cost}
                              onChange={e => {
                                const cos = parseInt(e.target.value)
                                setPriceDetails({ ...priceDetails, cost: cos })
                              }}
                            />
                            <div
                              className={" mx-3"}
                              style={{
                                fontSize: "20px",
                              }}
                            >
                              &#8377;
                            </div>
                          </div>
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
                          <div className="d-flex">
                            <Input
                              type="number"
                              disabled={true}
                              value={priceDetails.salePrice - priceDetails.cost}
                              id="profit-fixed"
                            />
                            <div
                              className={"mx-3"}
                              style={{
                                fontSize: "20px",
                              }}
                            >
                              &#8377;
                            </div>
                          </div>
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
                          <div className="d-flex">
                            <Input
                              id="margin"
                              disabled
                              type="number"
                              value={Math.round(
                                ((priceDetails.salePrice - priceDetails.cost) /
                                  priceDetails.salePrice) *
                                  100
                              )}
                            />
                            <div
                              className={"mx-3"}
                              style={{
                                fontSize: "20px",
                              }}
                            >
                              %
                            </div>
                          </div>
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
                    {customText ? (
                      <div>
                        <Row>
                          <Col>
                            <div
                              onClick={() => {
                                setCustomText(!customText)
                              }}
                              className="text-sm-end text-danger"
                              style={{ fontSize: "20px", cursor: "pointer" }}
                            >
                              <span className="mdi mdi-delete"></span>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Label for="cus-title">Text field title</Label>
                            <Input
                              id="cus-title"
                              placeholder="e.g., 'What would you like engraved on your watch?'"
                              onChange={e => {
                                setCustomTextDetails({
                                  ...customTextDetails,
                                  title: e.target.value,
                                })
                              }}
                            />
                          </Col>
                          <Col xs="3">
                            <Label for="char-lim">Char limit</Label>
                            <Input
                              type="number"
                              id="char-lim"
                              value={customTextDetails.charLin}
                              onChange={e => {
                                setCustomTextDetails({
                                  ...customTextDetails,
                                  charLin: parseInt(e.target.value),
                                })
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <div className="d-flex mt-3">
                            <FormGroup>
                              <Input
                                type="checkbox"
                                checked={customTextDetails.mandatoryField}
                                onClick={() => {
                                  setCustomTextDetails({
                                    ...customTextDetails,
                                    mandatoryField:
                                      !customTextDetails.mandatoryField,
                                  })
                                }}
                                value={customTextDetails.mandatoryField}
                              ></Input>
                            </FormGroup>
                            <div className="mx-2">Mandatory Field</div>
                          </div>
                        </Row>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setCustomText(!customText)
                        }}
                        className="btn-rounded"
                        color="success"
                        outline
                      >
                        Add Custom Text Field
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <CardTitle>Product options</CardTitle>
                    {Object.keys(variants).length ? (
                      <ListGroup>
                        {Object.keys(variants).map((variant, index) => (
                          <ListGroupItem key={index}>
                            <Row>
                              <Col
                                className="col-3"
                                style={{ fontWeight: 500 }}
                              >
                                {variant}
                              </Col>
                              <Col>
                                {variants[variant].map((option, index) => (
                                  <span key={index}>
                                    {option.label}
                                    {index === variants[variant].length - 1
                                      ? ""
                                      : ", "}
                                  </span>
                                ))}
                              </Col>
                              <Col className="col-2">
                                <i
                                  onClick={() => {
                                    setEditVariant({
                                      [variant]: variants[variant],
                                    })
                                    addProductOptionToggle()
                                  }}
                                  className="fas fa-pencil-alt text-success me-2"
                                  style={{cursor: 'pointer'}}
                                />
                                <i
                                  onClick={() => {
                                    delete variants[variant]
                                    setVariants({ ...variants })
                                  }}
                                  className="fas fa-trash-alt text-danger me-1"
                                  style={{cursor: 'pointer'}}
                                />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))}
                        <ListGroupItem
                          className="text-primary text-sm-start"
                          tag="button"
                          onClick={() => {
                            addProductOptionToggle()
                          }}
                        >
                          <i className="mdi mdi-plus me-1" /> Add Another Option
                        </ListGroupItem>
                      </ListGroup>
                    ) : (
                      <div>
                        <CardText
                          className="text-wrap"
                          style={{ maxWidth: "80%" }}
                        >
                          Does your product come in different options, like
                          size, color or material? Add them here.
                        </CardText>

                        <Button
                          className="btn-success btn-rounded"
                          onClick={() => {
                            addProductOptionToggle()
                          }}
                        >
                          <i className="mdi mdi-plus me-1" />
                          Add Options
                        </Button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Inventory and Shipping</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        <div className="d-flex">
                          <FormGroup switch>
                            <Input
                              type="checkbox"
                              checked={inventoryShipping}
                              onClick={() => {
                                setInventoryShipping(!inventoryShipping)
                              }}
                            ></Input>
                          </FormGroup>
                          <div>Track Inventory</div>
                          <i
                            href="#"
                            id="inventory-info"
                            className="mdi mdi-information me-2 mx-1"
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target="inventory-info"
                          >
                            Track this products inventory by adding stock
                            quantities per variant.
                          </UncontrolledTooltip>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-3">
                      {inventoryShipping ? (
                        <Col>
                          <Label for="inv-set">Inventory</Label>
                          <Input id="inv-set" type="number" />
                        </Col>
                      ) : (
                        <Col>
                          <Label for="status-set">Status</Label>
                          <Input id="status-set" type="select">
                            <option>In stock</option>
                            <option>Out of stock</option>
                          </Input>
                        </Col>
                      )}
                      <Col>
                        <Label for="sku">
                          SKU
                          <i
                            id="cost-info"
                            className="mdi mdi-information me-2 mx-1"
                          />
                          <UncontrolledTooltip placement="top" target="sku">
                            A “Stock Keeping Unit” is a unique code you can
                            create for each product or variant you have in your
                            store. Using SKUs helps with tracking inventory.
                          </UncontrolledTooltip>
                        </Label>
                        <Input
                          value={inventoryDetails.SKU}
                          onChange={e => {
                            setInventoryDetails({
                              ...inventoryDetails,
                              SKU: e.target.value,
                            })
                          }}
                          id="sku"
                        />
                      </Col>
                      <Col>
                        <div>
                          <Label for="shpwgt">
                            Shipping Weight
                            <i
                              id="shwgt-info"
                              className="mdi mdi-information me-2 mx-1"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="shwgt-info"
                            >
                              A “Stock Keeping Unit” is a unique code you can
                              create for each product or variant you have in
                              your store. Using SKUs helps with tracking
                              inventory.
                            </UncontrolledTooltip>
                          </Label>
                          <Input
                            id="shpwgt"
                            value={parseInt(inventoryDetails.shippingWeight)}
                            onChange={e => {
                              setInventoryDetails({
                                ...inventoryDetails,
                                shippingWeight: parseInt(e.target.value),
                              })
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="p-0">
                  <CardHeader>
                    <CardTitle>Pre-Order</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div>
                          Let customers buy this product before it’s released or
                          when it’s out of stock.
                        </div>
                        <CardLink>Learn about pre-order</CardLink>
                      </div>
                      <FormGroup switch className="m-3">
                        <Input
                          type="checkbox"
                          checked={preOrder}
                          onClick={() => {
                            setPreorder(!preOrder)
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                    {preOrder ? (
                      <div>
                        <div>
                          <CardTitle>PRE-ORDER MESSAGE</CardTitle>
                          <CardSubtitle>
                            Add a note that customers will see on the product
                            page and during checkout.
                          </CardSubtitle>
                          <Input />
                        </div>
                        <div>
                          <CardTitle>RE-ORDER LIMIT</CardTitle>
                          <CardSubtitle>
                            Limit the total number of items available for
                            pre-order. If this product has variants, the limit
                            will apply to each one individually.
                          </CardSubtitle>
                          <div>No limit</div>
                          <div className="d-flex">
                            <div>Limit to</div> <Input type="number" />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card className="p-0">
                  <CardBody>
                    <div className="p-2">
                      <Input
                        type="checkbox"
                        checked={showInWebstie}
                        onClick={() => {
                          setShowInWebsite(!showInWebstie)
                        }}
                        className="p-1 mx-2"
                      />
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
                            onClick={() => {
                              newCollection.name
                                ? dispatch(
                                    addCollection({
                                      name: newCollection.name,
                                      icon: "broken",
                                      color: "black",
                                    })
                                  )
                                : null
                              setAddNewCollection(!addNewCollection)
                            }}
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
          <Modal centered toggle={infoModalToggle} isOpen={infoModal}>
            <AddInfoSectionModal
              toggle={infoModalToggle}
              setAdditionalInfoSections={setAdditionalInfoSections}
              additionalInfoSections={additionalInfoSections}
              section={infosection}
            />
          </Modal>
          <Modal
            centered
            toggle={addProductOptionToggle}
            isOpen={addProductOption}
          >
            <AddProductVariants
              addProductOptionToggle={addProductOptionToggle}
              variants={variants}
              setVariants={setVariants}
              editVariant={editVariant}
              setEditVariant={setEditVariant}
            />
          </Modal>
          <Modal toggle={editVariantsModalToggle} isOpen={editVariantsModal}>
            <ModalHeader toggle={editVariantsModalToggle}>
              Manage Variants
            </ModalHeader>
            <ModalBody></ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  )
}
