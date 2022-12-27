import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "../../assets/scss/custom/pages/_addproductV3.scss";
import MetaTags from 'react-meta-tags';
import { Editor } from "react-draft-wysiwyg";
import BootstrapTable from "react-bootstrap-table-next";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const tempData = [
  {
    variant: "Black | large",
    name: "item-name0",
    price: 200,
  },
  {
    variant: "Black | Medium",
    name: "item-name1",
    price: 200,
  },
  {
    variant: "Purple",
    name: "item-name2",
    price: 200,
  },
  {
    variant: "Blue",
    name: "item-name3",
    price: 200,
  },
  {
    variant: "White",
    name: "item-name4",
    price: 200,
  },
];
const optionGroup3 = [
  {
    label: "Option",
    options: [
      { label: "List", value: "list" },
      { label: "Color", value: "color" },
    ],
  },
];
const optionGroup = [
  {
    label: "Size",
    options: [
      { label: "Large", value: "large" },
      { label: "Medium", value: "medium" },
      { label: "Small", value: "small" },
    ],
  },
];
const optionGroup2 = [
  {
    label: "Color",
    options: [
      { label: "Black", value: "black" },
      { label: "White", value: "white" },
      { label: "Gray", value: "gray" },
    ],
  },
];

const EcommerceAddProduct = () => {
  const isMounted = useRef(false);
  const [selectedFiles, setselectedFiles] = useState([]);
  // const selectedFiles = useRef([]);
  const [toggleSwitchLarge, setToggleSwitchLarge] = useState(false);
  const [toggleSwitchLarge2, setToggleSwitchLarge2] = useState(false);
  const [modal_large, setModal_large] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [customTextList, setCustomTextList] = useState([]);
  const [periodType, setPeriodType] = useState("color");
  const [selectedMulti, setSelectedMulti] = useState(null);
  const [setOption, setSetOption] = useState("list");
  const [imgOptionModal, setImgOptionModal] = useState(false);
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [toggleSwitchLarge3, setToggleSwitchLarge3] = useState(false);
  const [connect_modal, setConnect_modal] = useState(false);
  const [selectedImgOptionIndex, setSelectedImgOptionIndex] = useState(null);
  const [selectedImgOptionList, setSelectedImgOptionList] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [tog_inventory_modal, setTog_inventory_modal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [productConnectedImages, setProductConnectedImages] = useState([]);   
  const [selectedItem, setSelectedItem] = useState({});
  const [seletedSubItem, setSeletedSubItem] = useState({});
  const [price, setPrice] = useState(0);
  const [priceDiff, setPriceDiff] = useState(0);

  const options = [
    { value: "AK", label: "Alaska" },
    { value: "HI", label: "Hawaii" },
    { value: "CA", label: "California" },
    { value: "NV", label: "Nevada" },
    { value: "OR", label: "Oregon" },
    { value: "WA", label: "Washington" }
  ]

  const columns = [
    {
      dataField: "productColor",
      text: "Variant",
      formatter: (cellContent, row) => {
        return (
          <div>{`${row.productColor ? row.productColor : ""}|${
            row.productSize
          }`}</div>
        );
      },
    },
    {
      dataField: "priceDiff",
      text: `Price difference (+/-) `,
      style: {
        width: "20%",
        paddingRight: "50px",
      },
      formatter: (cellContent, row) => {
        return (
          <input
            type="text"
            name=""
            id=""
            className=" price-input h4 p-3 mt-1 w-100 "
            placeholder=""
            value={priceDiff}
            onChange={event => {
              setPriceDiff(event.target.value)
            }}
          />
        );
      },
    },
    {
      dataField: "productPrice",
      text: "Variant Price",
    },
    {
      dataField: "costOfGoods",
      text: "Cost of goods",
      style: {
        width: "12%",
      },
      formatter: () => {
        return (
          <input
            type="text"
            name=""
            id=""
            className="i3 h4 p-3 mt-1 w-100"
            placeholder="0"
          />
        );
      },
    },
    {
      dataField: "sku",
      text: "SKU",
      headerAlign: "center",
      style: {
        width: "16%",

        paddingLeft: "50px",
      },
      formatter: () => {
        return (
          <input
            type="text"
            name=""
            id=""
            className="i3 h4 p-3 mt-1 w-100"
            placeholder="0"
          />
        );
      },
    },
    {
      dataField: "inStock",
      text: "In Stock",
      style: {
        width: "10%",
      },
      formatter: () => {
        return (
          <select defaultValue="0" className="form-select mt-1 ">
            <option value="inStock">In stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        );
      },
    },
    {
      dataField: "shippingWeight",
      text: "Shipping Weight",
      style: {
        width: "10%",
      },
      formatter: () => {
        return (
          <input
            type="text"
            name=""
            id=""
            className="i3 h4 p-3 mt-1 w-100"
            placeholder="0"
          />
        );
      },
    },
    {
      dataField: "visiblity",
      text: "Visiblity",
      style: {
        textAlign: "center",
      },
      formatter: () => {
        return (
          <h2>
            <i className="bx bx-show b-color "></i>
          </h2>
        );
      },
    },
  ];

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size)
      })
    )

    setselectedFiles((previousState) => {
      return [...previousState, files];
    })
    // selectedFiles.current = [...selectedFiles.prevState, files];
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleMulti = selectedMulti => {
    setSelectedMulti(selectedMulti);
  };

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return <Button>Follow</Button>;
  };

  const NavVisible = () => {
    if (window.scrollY >= 80) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  const handleSelectGroup = selectedGroup => {
    setSelectedGroup(selectedGroup);
  };

  const tog_large = () => {
    setModal_large(prevState => ({
      modal_large: !prevState.modal_large,
    }));
    this.removeBodyCss();
  }

  const tog_connect_modal = () => {
    setConnect_modal(prevState => ({
      connect_modal: !prevState.connect_modal,
    }));
    this.removeBodyCss();
  }

  const tog_img_option_modal =() => {
    setImgOptionModal(prevState => ({
      imgOptionModal: !prevState.imgOptionModal,
    }));
    this.removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current ) {
      window.addEventListener("scroll", NavVisible);
    }
    return () => { isMounted.current = false }
  }, []);

//   useEffect(() => {
//     if(!props.fetched) {
//         props.fetchRules();
//     }
//     console.log('mount it!');
// }, []);

  // componentDidMount() {
  //   this._isMounted = true;
  //   if (this._isMounted) {
  //     window.addEventListener("scroll", this.NavVisible);
  //   }
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }
    const dragItem = React.createRef(null);
    const dragOverItem = React.createRef(null);
    console.log(inventoryProducts);

    const handleSort = () => {
      let _selectedFiles = [...selectedFiles.prevState];

      const draggedItemContent = _selectedFiles.splice(dragItem.current, 1)[0];

      _selectedFiles.splice(dragOverItem.current, 0, draggedItemContent);

      dragItem.current = null;
      dragOverItem.current = null;

      //update the actual array
      setSelectedFiles(_selectedFiles);
      // selectedFiles.current = _selectedFiles;
    };

    const remove = fileIndex => {
      const newFiles = [...selectedFiles.prevState];
      newFiles.splice(fileIndex, 1);
      setSelectedFiles(newFiles);
      // selectedFiles.current = newFiles;
    };

    const handleAddCustomTextInput = e => {
      e.preventDefault();
      setCustomTextList([...customTextList, { item: "" }]);
    };

    const handleDeleteCustomTextInput = (e, index) => {
      e.preventDefault();
      setCustomTextList(customTextList.splice(index, 1));
    };

    const productOptionChange = event => {
      setSetOption(event.target.value);
      setSelectedMulti(null);
    };

    const handleOptionsAdd = (event, selectedMulti) => {
      event.preventDefault();
      const newList = { productOption: setOption, optionList: selectedMulti };
      setSelectedOptionsList(prevState => ({
        selectedOptionsList: [newList, ...prevState.selectedOptionsList],
      }),
      manageInventory);
      setModal_large(false);
    };

    const manageInventory = () => {
      const selectedColor = selectedOptionsList.find(
        item => item.productOption === "color"
      );
      const selectedSize = selectedOptionsList.find(
        item => item.productOption === "list"
      );

      if ((selectedColor == undefined) & (selectedSize != null)) {
        selectedSize.optionList.forEach(subItem =>
          setInventoryProducts(prevState => ({
            inventoryProducts: [
              ...prevState.inventoryProducts,
              {
                productColor: "",
                productSize: subItem.value,
                productPrice: this.state.price,
              },
            ],
          }))
        );
      } else {
        setInventoryProducts([]);
        selectedColor?.optionList.forEach(item =>
          selectedSize?.optionList.forEach(subItem =>
            setInventoryProducts(prevState => ({
              inventoryProducts: [
                ...prevState.inventoryProducts,
                {
                  productColor: item.value,
                  productSize: subItem.value,
                  productPrice: this.state.price,
                },
              ],
            }))
          )
        );
      }
    };

    const ManageSelectedImages = () => {
      console.log(selectedImgOptionList);
    };

    const handleDeleteOptionRow = (index, event) => {
      event.preventDefault();

      const listupdt = selectedOptionsList.splice(index, 1);
      setSelectedOptionsList(listupdt);
    };

    const handleEditOptionRow = (index, event) => {
      event.preventDefault();
      const selectedRow = selectedOptionsList[index];
      setSelectedMulti(selectedRow.optionList);
      setSetOption(selectedRow.productOption);
      this.tog_large();
    };

    const getOptionImgIndex = (index, item) => {
      setSelectedImgOptionIndex(index);
    };

    const addImageOption = event => {
      const selectedImage =
        selectedFiles[selectedImgOptionIndex];
        setSelectedImgOptionList(prevState => ([
            prevState,
            { optionName: currentOption, ...selectedImage },
        ]),ManageSelectedImages);
        setImgOptionModal(false);
    };

    const getRowIndex = (rowIndex, optionName) => {
      setCurrentOption(optionName);
    };


  return (
    <React.Fragment>
       <div className="main-container page-content ">
        <Modal
          size="xl"
          isOpen={toggleSwitchLarge3}
          toggle={() => tog_inventory_modal}
          scrollable={true}
          centered={true}
          contentClassName="inventory-modal"
        >
          <div className="modal-header">
            <h2 className="modal-title mt-0">Manage Variants</h2>
            <button
              type="button"
              onClick={() => setToggleSwitchLarge3(false)}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <BootstrapTable
                keyField="id"
                data={inventoryProducts}
                columns={columns}
                bordered={false}
                headerClasses="table-info"
                selectRow={{ mode: "checkbox" }}
              />
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={imgOptionModal}
          toggle={() => tog_img_option_modal}
          centered={true}
          contentClassName="img-option-modal"
        >
          <div>
            <button
              onClick={() => setImgOptionModal(false)}
              type="button"
              className="close mt-2  close-btn"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="d-flex justify-content-around m-4 mt-5 ">
              {selectedFiles.map((item, index) => (
                <div
                  key={index}
                  className=""
                  onClick={() => getOptionImgIndex(index, item)}
                >
                  <img src={item.preview} alt="" height={95} width={95} />
                </div>
              ))}
            </div>
            <div className=" done-btn">
              <button
                className="btn btn-primary btn-rounded"
                onClick={event => addImageOption(event)}
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          size="lg"
          isOpen={connect_modal}
          toggle={() => tog_connect_modal}
          centered={true}
          scrollable={true}
          contentClassName="connect-modal"
        >
          <div className="modal-header">
            <h2 className="modal-title mt-3 mx-4" id="myLargeModalLabel">
              Connect Images to an option
            </h2>
            <button
              onClick={() => setConnect_modal(false)}
              type="button"
              className="close mt-2  close-btn"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="mx-4 nav-text text-dark  mb-4">
              Select an option and connect images you want customers to see when
              they click on that options choices.
            </p>
            <p className="mx-4 nav-text text-dark h5 mb-3">Option:</p>
            <p className="mx-4 nav-text text-dark h5">Color</p>
            <div className="mt-5 mx-4  w-75">
              <table className=" w-100">
                <tr className=" mb-4">
                  <th>Choices</th>
                  <th>Product Images</th>
                </tr>
                {selectedOptionsList.map((item, index) => (
                  <div key={index}>
                    {item.optionList.map((subitem, index) => {
                      return (
                        <tr className="tb-row" key={index}>
                          <td>{subitem.label}</td>
                          {selectedImgOptionList.map(
                            (item, index) => {
                              return item.optionName == subitem.label ? (
                                <td key={index} className="">
                                  <img
                                    src={item.preview}
                                    alt=""
                                    height={45}
                                    width={45}
                                  />
                                </td>
                              ) : (
                                ""
                              );
                            }
                          )}
                          <td>
                            <div
                              className="option-img-add d-flex align-items-center justify-content-center"
                              onClick={() => {
                                getRowIndex(index, subitem.label);
                                tog_img_option_modal();
                              }}
                            >
                              <i className="bx bx-plus h3 mt-2 "></i>
                            </div>
                          </td>
                          <hr />
                        </tr>
                      );
                    })}
                  </div>
                ))}
              </table>
            </div>
          </div>
        </Modal> 
        {showNav == false ? (
          <div className="one-cont">
            <div className="">
              <h4 className="main-nav">
                <span className="nav-text">Products</span>
                <span className="nav-text-2">
                  {" "}
                  {">"} &emsp; Untited Product
                </span>
              </h4>
            </div>
            <div className="d-flex justify-content-between sec-cont">
              <div className="r-btns ">
                <h1 className="main-title">Untitled Product</h1>
              </div>
              <div className={`d-flex   justify-content-around btn-cont `}>
                <button className="btn-rounded dot-btn mx-2 ">
                  {" "}
                  <i className="bx bx-dots-horizontal-rounded btn-rounded "></i>
                </button>
                <button className=" btn-save mx-2">Save</button>
                <button className=" btn-save mx-2 bg-white text-primary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="one-cont-nav">
            <div className="d-flex  justify-content-between">
              <div className="">
                <h4 className="main-nav-2">
                  <span className="nav-text text-dark">Products</span>
                  <span className="nav-text-2 text-dark">
                    {" "}
                    {">"} &emsp; Untited Product
                  </span>
                </h4>
              </div>

              <div className="d-flex  w-25 justify-content-around btn-cont2 align-items-center ">
                <button className="btn-rounded dot-btn2 ">
                  {" "}
                  <i className="bx bx-dots-horizontal-rounded"></i>
                </button>
                <button className=" btn-save2">Save</button>
                <button className=" btn-save2 text-white bg-primary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

         <div className="second-cont">
          <Row className="p-3 cont-2">
            <Col className="w-75 rounded">
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 ">
                    <h3 className="text-dark ">Product Images</h3>
                  </CardTitle>
                  <hr />
                  {selectedFiles.length != 0 ? (
                    <div>
                      <Row className="d-flex ">
                        <Col className="d-flex justify-content-start mx-3  col-3  ">
                          <div
                            draggable
                            onDragStart={e => (dragItem.current = 0)}
                            onDragEnter={e => (dragOverItem.current = 0)}
                            onDragEnd={handleSort}
                            onDragOver={e => e.preventDefault()}
                            className="product-lg-img"
                          >
                            <div className="overlay-big">
                              <h1 className="cross-big">
                                {" "}
                                <i className="bx bx-move cross-arrow " />
                              </h1>
                              <button
                                className="remove-btn-big"
                                onClick={() => {
                                  remove(0);
                                }}
                              >
                                x
                              </button>
                            </div>
                            <img
                              src={selectedFiles[0]?.preview}
                              alt=""
                              height={237}
                              width={237}
                              className="product-lg-img"
                            />
                          </div>
                        </Col>
                        <Col className="d-flex flex-wrap justify-content-start  col-6  ">
                          {selectedFiles
                            .slice(1)
                            .map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  draggable
                                  onDragStart={e =>
                                    (dragItem.current = index + 1)
                                  }
                                  onDragEnter={e =>
                                    (dragOverItem.current = index + 1)
                                  }
                                  onDragEnd={handleSort}
                                  onDragOver={e => e.preventDefault()}
                                  className="product-images-sm"
                                >
                                  <div className="overlay">
                                    <h1>
                                      <i className=" bx bx-move cross-arrow" />
                                    </h1>
                                    <button
                                      className="remove-btn"
                                      onClick={e => remove(index + 1)}
                                    >
                                      <i className="bx bx-x" />
                                    </button>
                                  </div>
                                  <img
                                    src={item.preview}
                                    alt=""
                                    height={104}
                                    width={104}
                                    className="mx-3 img-cont-sm"
                                  />
                                </div>
                              );
                            })}
                          <div className=" dropzone-custom mx-3">
                            <Dropzone
                              onDrop={acceptedFiles => {
                                handleAcceptedFiles(acceptedFiles);
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div>
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <h1 className="plus-sign">+</h1>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div className=" dropzone-big mx-2 ">
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div>
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
                                  <i className="bx bx-images plus-sign mx-2 "></i>
                                  <h3 className="font-weight-light opacity-50">
                                    Add Images
                                  </h3>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-1 ">
                    <h3 className="text-dark mx-4 info-title ">Product Info</h3>
                  </CardTitle>
                  <hr />
                  <div className="product-info basic-info mt-4">
                    <p className="p-4  h5">BASIC INFO</p>
                    <div className="d-flex justify-content-between mt-4 p-4 ">
                      <div className="name-cont ">
                        <p className="h5 font-weight-light text-muted">Name</p>
                        <input
                          type="text"
                          className="name-input text-muted p-3 h4 font-weight-light mt-2"
                          placeholder="Add a product name"
                        />
                      </div>
                      <div className="ribbon-cont">
                        <p className=" font-weight-light h5 text-muted">
                          Ribbon
                        </p>
                        <input
                          type="text"
                          className="ribbon-input h4 p-3 mt-2"
                          placeholder="e.g., New Arrival "
                        />
                      </div>
                    </div>

                    <p className="mt-4 mx-4 h5">Description</p>
                    <div className="text-editor mx-4">
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-1 ">
                    <h3 className="text-dark mx-4 info-title ">Pricing</h3>
                  </CardTitle>
                  <hr />
                  <p className="mt-5 mx-4 h4 opacity-75">Price</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="mx-4 price-input h4 p-3 mt-1"
                    placeholder="₹  85"
                    value={price}
                    onChange={event => {
                      setPrice(event.target.value);
                    }}
                  />

                  <div className="form-check form-switch form-switch-lg mb-3 mt-4 mx-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      onClick={() => setToggleSwitchLarge(!toggleSwitchLarge)}
                    />
                    <label
                      className="form-check-label h4 mt-1 opacity-75"
                      htmlFor="customSwitchsizelg"
                    >
                      On Sale
                    </label>
                  </div>
                  <div
                    className={
                      toggleSwitchLarge ? "" : "input-display"
                    }
                  >
                    <div className="d-flex justify-content-start mx-4">
                      <div className="mr-5">
                        <p className=" h4 opacity-75 ">Sales Price</p>
                        <div className="d-flex">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="sale-input h4 p-3 mt-1"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="mx-5">
                        <p className=" h4 opacity-75">Discount</p>
                        <div className="d-flex">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="dis-input h4 p-3 mt-1"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-check form-switch form-switch-lg mb-3 mt-5 mx-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      onClick={() => setToggleSwitchLarge2(!toggleSwitchLarge2)}
                    />
                    <label
                      className="form-check-label h4 mt-1 opacity-75"
                      htmlFor="customSwitchsizelg"
                    >
                      Show price per unit
                    </label>
                  </div>
                  <div
                    className={
                      toggleSwitchLarge2 ? " " : "unit-display"
                    }
                  >
                    <div className="d-flex mt-5 justify-content-start mx-4 unit-display ">
                      <div className="">
                        <p className=" h4 opacity-75 ">
                          Total Product Quantity in units
                        </p>
                        <div className="d-flex">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="i1 h4 p-3 mt-1"
                            placeholder="0"
                          />
                          <select
                            defaultValue="g"
                            className="form-select i2 h4 p-3 mt-1"
                          >
                            <option value="g">g </option>
                            <option value="mg">mg</option>
                            <option value="kg">kg</option>
                          </select>
                        </div>
                      </div>
                      <div className="mx-5">
                        <p className=" h4 opacity-75">Base units</p>
                        <div className="d-flex">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="i1 h4 p-3 mt-1"
                            placeholder="0"
                          />
                          <select
                            defaultValue="0"
                            className="form-select i2 h4 p-3 mt-1"
                          >
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mt-5 mx-4 justify-content-start">
                    <div className="">
                      <p className=" h4 opacity-75 ">Cost of goods</p>
                      <div className="d-flex">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="i3 h4 p-3 mt-1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="">
                      <p className=" h4 opacity-75 ">Profit</p>
                      <div className="d-flex">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="i3 h4 p-3 mt-1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="">
                      <p className=" h4 opacity-75 ">Margin</p>
                      <div className="d-flex">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="i3 h4 p-3 mt-1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-1 mt-1 ">
                    <h3 className="text-dark mx-4 info-title mb-3 ">
                      Custom Text
                    </h3>
                  </CardTitle>
                  <p className="mx-4 font-weight-light text-muted h5">
                    Allow Customers to personalize this product with a customer
                    text field
                  </p>
                  <hr />

                  {customTextList.length == 0 ? (
                    <div className="mt-5">
                      <button
                        onClick={e => handleAddCustomTextInput(e)}
                        className="mx-4 add-btn border border-primary h5 text-primary bg-white "
                      >
                        Add Custom Text Field
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div>
                        {customTextList.map((singleItem, index) => (
                          <div key={index}>
                            <Row className="d-flex justify-content-start">
                              <Col className="col-md-8 ">
                                <div>
                                  <p className="mt-4 mx-4 h4 opacity-75">
                                    Text field
                                  </p>
                                  <input
                                    type="text"
                                    className="w-100 mx-4 price-input h4 p-3 mt-1"
                                    placeholder="eg., What you would like to engrave on your watch?"
                                  />
                                </div>
                              </Col>
                              <Col className="col-md-3">
                                <p className="mt-4 mx-4 h4 opacity-75">
                                  Char limit
                                </p>
                                <input
                                  type="text"
                                  value={500}
                                  className=" mx-4 price-input h4 p-3 mt-1 w-50"
                                />
                              </Col>
                              <Col className="mt-4">
                                <button
                                  className="btn btn-link"
                                  onClick={e => handleDeleteCustomTextInput(e, index)}
                                >
                                  <i className="bx bx-trash  h3 opacity-75 text-primary "></i>
                                </button>
                              </Col>
                            </Row>
                            <div className="form-check mb-3 mx-4 mt-3">
                              <input
                                className="form-check-input h4 border border-primary "
                                type="checkbox"
                                value=""
                                id="defaultCheck1"
                              />
                              <label
                                className="form-check-label h5 mt-1"
                                htmlFor="defaultCheck1"
                              >
                                Mandatory Field
                              </label>
                            </div>
                            <hr className="mt-5" />
                          </div>
                        ))}
                      </div>
                      <p className="d-flex mx-4 ">
                        {" "}
                        <a
                          href=""
                          className="d-flex "
                          onClick={e => handleAddCustomTextInput(e)}
                        >
                          <p className="text-primary mx-1 h4">+</p>
                          <p className="text-primary h5 mt-1">Add Another</p>
                        </a>
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-1 d-flex justify-content-between ">
                    <div>
                      <h3 className="text-dark mx-4 info-title mt-2 ">
                        Product Options
                      </h3>
                      {selectedOptionsList.length != 0 ? (
                        <>
                          <p className="nav-text mx-4 text-dark h4">
                            Manage the options this product comes in
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mx-5">
                      {selectedOptionsList.length != 0 && (
                        <div className=" mt-2 opactiy-75">
                          <p
                            className="h5 text-primary"
                            onClick={ () => tog_connect_modal}
                          >
                            <i className="bx bx-images "></i>
                            <span className="mx-3">Connect Images&emsp;|</span>
                            <i className="bx bx-cog  "></i>
                          </p>
                        </div>
                      )}
                    </div>
                    <hr />
                  </CardTitle>
                  {selectedOptionsList.length != 0 ? (
                    <div>
                      <hr />
                      {selectedOptionsList.map((item, index) => (
                        <div key={Math.random()}>
                          <Row className="d-flex justify-content-between option-row">
                            <Col className="h4 nav-text text-dark mx-4 font-weight-bold col-md-2">
                              {item.productOption}
                            </Col>
                            <Col className="col-md-4">
                              <div className="d-flex flex-row ">
                                {item.optionList.map((subItem, index) => (
                                  <div key={index} className="d-flex">
                                    {item.productOption == "color" ? (
                                      <div
                                        className="color-div rounded-circle"
                                        style={{
                                          backgroundColor: `${subItem.value}`,
                                        }}
                                      ></div>
                                    ) : (
                                      ""
                                    )}

                                    <p
                                      key={Math.random()}
                                      className="mx-2 h4 nav-text text-dark"
                                    >
                                      {subItem.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </Col>
                            <Col className="d-flex hidden-btns col-md-3">
                              <button
                                className="rounded-circle btn-icon "
                                onClick={event => handleEditOptionRow(index, event)}
                              >
                                <i className="bx bx-pencil icon-size  "></i>
                              </button>
                              <button
                                className="rounded-circle btn-icon mx-3"
                                onClick={event => handleDeleteOptionRow(index, event)}
                              >
                                <i className="bx bx-trash icon-size "></i>
                              </button>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      ))}
                      <p className="d-flex mx-4   ">
                        {" "}
                        <a
                          href=""
                          className="d-flex  "
                          onClick={event => {
                            event.preventDefault();
                            setSelectedMulti(null);
                            tog_large();
                          }}
                        >
                          <p className="text-primary mx-1 h4 mt-2">+</p>
                          <p className="text-primary h5 mt-2">Add Another</p>
                        </a>
                      </p>
                      <hr />
                      <div className="form-check form-switch form-switch-lg mb-3 mt-4 mx-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customSwitchsizelg"
                          onClick={() => {
                            setToggleSwitchLarge3(!toggleSwitchLarge3);
                          }}
                        />
                        <label
                          className="form-check-label h4 mt-1 opacity-75"
                          htmlFor="customSwitchsizelg"
                        >
                          Manage Inventory
                        </label>
                      </div>
                    </div>
                  ) : (
                    <Row>
                      <Col className="col-md-9">
                        <p className="text-dark h4 nav-text mb-3 text-wrap mx-4 w-75 mt-3">
                          Does your product come in different options, like
                          size, color or material? Add them here.
                        </p>
                        <button
                          className="  subscribe-btn btn-primary h5 mx-4 text-white mt-5 btn-rounded border border-light  "
                          onClick={() => tog_large}
                        >
                          + Add Option
                        </button>
                      </Col>
                      <Col className="col-md-3">
                        <img
                          src="https://static.parastorage.com/services/wix-ecommerce-storemanager/2.0.6727/assets/images/productOptions/no-options-illustration.svg"
                          height={180}
                          width={180}
                          alt=""
                        />
                      </Col>
                    </Row>
                  )}
                </CardBody>
              </Card>
              <Modal
                size="lg"
                isOpen={modal_large}
                toggle={() => tog_large}
                centered={true}
                contentClassName="add-option-modal"
              >
                <div className="modal-header">
                  <h2 className="modal-title mt-3 mx-4" id="myLargeModalLabel">
                    Add Product Option
                  </h2>
                  <button
                    onClick={() => setModal_large(false)}
                    type="button"
                    className="close mt-2  close-btn"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="option-img-modal">
                  <Row className="d-flex align-items-center">
                    <Col className="col-md-7 ">
                      <p className=" mx-4 h4  nav-text text-dark">
                        Type in an option name
                      </p>
                      <div className="mx-4 b-col">
                        <Select
                          value={selectedGroup}
                          onChange={() => handleSelectGroup}
                          options={optionGroup3}
                          classNamePrefix="select2-selection "
                        />
                      </div>
                    </Col>
                    <Col className="col-md-5 ">
                      <p className=" mx-4 h4 nav-text text-dark ">
                        Show in product page as
                      </p>
                      <div>
                        <Row className="tab-option mx-3 ">
                          <Col className="col-md-6  ">
                            <Label className="card-radio-label mb-3 b-col ">
                              <Input
                                type="radio"
                                name="product-option"
                                id="product-option1"
                                className="card-radio-input "
                                value="list"
                                checked={setOption === "list"}
                                onChange={event => productOptionChange(event)}
                              />

                              <div className="card-radio tab-change-option d-flex align-items-center ">
                                <i className="fab fa-cc-mastercard font-size-24 text-primary align-middle me-2" />{" "}
                                <span className="">List</span>
                              </div>
                            </Label>
                          </Col>

                          <Col className="col-md-6 color-tab ">
                            <Label className="card-radio-label mb-3 b-col ">
                              <Input
                                type="radio"
                                name="product-option2"
                                id="product-option3"
                                className="card-radio-input "
                                value="color"
                                checked={setOption === "color"}
                                onChange={event => productOptionChange(event)}
                              />

                              <div className="card-radio tab-change-option  d-flex align-items-center">
                                <i className="fab fa-cc-paypal font-size-24 text-primary align-middle me-2" />{" "}
                                <span className="">Color</span>
                              </div>
                            </Label>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <div className="m-3  d-flex justify-content-start flex-column mt-5 select-tab">
                    {" "}
                    <p className="  h4  nav-text text-dark mb-3">
                      Type in choices for this option
                    </p>
                    <Select
                      value={selectedMulti}
                      isMulti={true}
                      onChange={() => handleMulti}
                      options={
                        setOption == "list"
                          ? optionGroup
                          : optionGroup2
                      }
                      className=" mx-2 b-col  "
                    />
                  </div>
                </div>
                <div className="opt-btn-cont d-flex mb-3 mt-2">
                  <button className="btn btn-lg bg-white text-primary border border-primary">
                    Cancel
                  </button>
                  <button
                    className="mx-3 btn-lg btn btn-primary "
                    disabled={
                      selectedOptionsList.length >= 2 ? true : false
                    }
                    onClick={event => {
                      handleOptionsAdd(event, selectedMulti);
                      manageInventory();
                    }}
                  >
                    Add
                  </button>
                </div>
                <hr />
                <div className="video-opt mb-3">
                  <p className="text-center h5 mt-3 text-primary ">
                    Watch how to add and manage product options.
                  </p>
                </div>
              </Modal>
              <Card>
                <CardBody>
                  <CardTitle className="mb-1 ">
                    <h3 className="text-dark mx-4 info-title ">
                      Inventory and Shipping
                    </h3>
                  </CardTitle>
                  <hr />
                  <div className="form-check form-switch form-switch-lg mb-3 mt-5 mx-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      onClick={() => {
                        setToggleSwitchLarge(!toggleSwitchLarge)
                      }}
                    />
                    <label
                      className="form-check-label h4 mt-1 opacity-75"
                      htmlFor="customSwitchsizelg"
                    >
                      Track Inventory
                    </label>
                  </div>
                  <div className="d-flex mt-5 mx-4 justify-content-start">
                    <div className="">
                      <p className=" h4 opacity-75 ">Status</p>
                      <div className="d-flex">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="i3 h4 p-3 mt-1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="">
                      <p className=" h4 opacity-75 ">SKU</p>
                      <div className="d-flex">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="i3 h4 p-3 mt-1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="">
                      <p className=" h4 opacity-75 ">Shipping weight</p>
                      <div className="d-flex">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="i3 h4 p-3 mt-1"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Row className="m-3">
                    <Col className="col-md-7 mt-4">
                      <h3 className="mb-3">Hire a professional</h3>
                      <p className="text-dark h3 nav-text mb-3">
                        Optimize your stores product pages with the help of an
                        expert.
                      </p>
                      <button className="  subscribe-btn btn-primary h5 text-white mt-3 btn-rounded border border-light  ">
                        + Create Subscription
                      </button>
                    </Col>
                    <Col className="col-md-5 mt-4  d-flex justify-content-center ">
                      <img
                        src="https://i.imgur.com/TJ3XrQv.png"
                        alt=""
                        height={180}
                        width={300}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="col-md-4">
              <Card className="rounded">
                <CardBody>
                  <div className="form-check mb-3 mx-4 mt-3">
                    <input
                      className="form-check-input h4  border border-primary "
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label
                      className="form-check-label h5 mx-1 mt-1"
                      htmlFor="defaultCheck1"
                    >
                      Show Collection
                    </label>
                  </div>
                </CardBody>
              </Card>
              <Card className="rounded">
                <CardBody>
                  <CardTitle className="mb-3 h1 mt-2 mb-4">
                    <h3 className="mx-1">Collection</h3>
                  </CardTitle>
                  <hr />
                  <div className="form-check mb-3 mx-4 mt-5">
                    <input
                      className="form-check-input h4  border border-primary "
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label
                      className="form-check-label h4 mx-1 mt-1"
                      htmlFor="defaultCheck1"
                    >
                      All products
                    </label>
                  </div>
                  <div className="mx-3 mt-5 ">
                    <p className="h4 text-primary">+ Create Collection</p>
                  </div>
                  <Form className="h-75"></Form>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 h1 mt-2 mb-4">
                    <h3 className="mx-1">Promote</h3>
                  </CardTitle>
                  <hr className=" " />
                  <div className=" mb-3 mx-4 mt-5">
                    <p className="mx-2 h4 text-dark nav-text mb-4  ">
                      Create Coupon
                    </p>
                    <p className="mx-2 h4 text-dark nav-text mb-4">
                      Promote this product
                    </p>
                    <p className="mx-2 h4 text-dark nav-text">
                      Edit SEO settings
                    </p>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 h1 mt-2 mb-4">
                    <h3 className="mx-1">Advanced</h3>
                  </CardTitle>
                  <hr className=" " />
                  <p className="mt-5 mx-4 h4 opacity-75">Price</p>
                  <Select className="select2-selection w-75 mx-4" />

                  <p className="mt-5 mx-4 h4 opacity-75">Brand</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="mx-4 price-input h4 p-3 mt-1 w-75"
                    placeholder="Start Typing Brand Name"
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Row className="m-3">
                    <Col className="col-md-8">
                      <h5 className="mb-3">Hire a professional</h5>
                      <p className="text-dark h5 nav-text mb-3">
                        -Optimize your stores product pages with the help of an
                        expert.
                      </p>
                      <a href="" className="h5 text-primary ">
                        get started
                      </a>
                    </Col>
                    <Col className="col-md-4 mt-4 ">
                      <img
                        src="https://static.parastorage.com/services/wix-ecommerce-storemanager/2.0.6727/assets/images/arena/arena.svg"
                        alt=""
                        height={80}
                        width={88}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div> 
      </div>
    </React.Fragment>
  )
}

export default EcommerceAddProduct
