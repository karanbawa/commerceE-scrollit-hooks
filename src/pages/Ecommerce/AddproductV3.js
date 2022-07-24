import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import "../../assets/scss/custom/pages/_addproductV3.scss";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  InputGroup,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Button,
} from "reactstrap";

export class AddproductV3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],
      toggleSwitchLarge: false,
      toggleSwitchLarge2: false,
    };
  }
  render() {
    const dragItem = React.createRef(null);
    const dragOverItem = React.createRef(null);

    const handleSort = () => {
      //duplicate items
      let _selectedFiles = [...this.state.selectedFiles];

      //remove and save the dragged item content
      const draggedItemContent = _selectedFiles.splice(dragItem.current, 1)[0];

      //switch the position
      _selectedFiles.splice(dragOverItem.current, 0, draggedItemContent);

      //reset the position ref
      dragItem.current = null;
      dragOverItem.current = null;

      //update the actual array
      this.setState({ selectedFiles: _selectedFiles });
    };

    const handleAcceptedFiles = files => {
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      this.setState(prevState => ({
        selectedFiles: prevState.selectedFiles.concat(files),
      }));
    };

    const formatBytes = (bytes, decimals = 2) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const remove = fileIndex => {
      const newFiles = [...this.state.selectedFiles];
      newFiles.splice(fileIndex, 1);
      this.setState({ selectedFiles: newFiles });
    };
    return (
      <div className="main-container page-content ">
        <div className="one-cont">
          <h4 className="main-nav">
            <span className="nav-text">Products</span>
            <span className="nav-text-2"> {">"} &emsp; Untited Product</span>
          </h4>
          <div className="d-flex justify-content-between r-btns">
            <h1 className="main-title">Untitled Product</h1>
            <div className="d-flex  w-25 justify-content-around btn-cont">
              <button className="btn-rounded dot-btn ">
                {" "}
                <i className="bx bx-dots-horizontal-rounded"></i>
              </button>
              <button className=" btn-save">Save</button>
              <button className=" btn-save">Cancel</button>
            </div>
          </div>
        </div>

        <div className="second-cont">
          <Row className="p-3 cont-2">
            <Col className="w-75 rounded">
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 ">
                    <h3 className="text-dark ">Product Images</h3>
                  </CardTitle>
                  <hr />
                  {this.state.selectedFiles.length != 0 ? (
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
                              src={this.state.selectedFiles[0]?.preview}
                              alt=""
                              height={237}
                              width={237}
                              className="product-lg-img"
                            />
                          </div>
                        </Col>
                        <Col className="d-flex flex-wrap justify-content-start  col-6  ">
                          {this.state.selectedFiles
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
                                    <i className=" bx bx-move cross-arrow"/>
                                   
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
                          <div className=" dropzone mx-3">
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
                  />

                  <div className="form-check form-switch form-switch-lg mb-3 mt-4 mx-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      onClick={() => {
                        this.setState({
                          toggleSwitchLarge: !this.state.toggleSwitchLarge,
                        });
                      }}
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
                      this.state.toggleSwitchLarge ? "" : "input-display"
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
                      onClick={() => {
                        this.setState({
                          toggleSwitchLarge2: !this.state.toggleSwitchLarge2,
                        });
                      }}
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
                      this.state.toggleSwitchLarge2 ? " " : "unit-display"
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
            </Col>
            <Col className="col-md-4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 h4">Product Images</CardTitle>
                  <hr />

                  <Form className="h-75"></Form>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3 h4">Product Images</CardTitle>
                  <hr />

                  <Form className="h-75"></Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

AddproductV3.propTypes = {};

const mapStateToProps = state => ({
  products: state.ecommerce.products,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddproductV3));
