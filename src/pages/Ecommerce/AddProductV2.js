import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../../assets/scss/custom/pages/_addproductV2.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  Card,
  CardBody,
  CardTitle,
  Col,
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
} from "reactstrap";

import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

class AddProductV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],
    };
  }

  /*
  on change rating checkbox method
  */

  render() {
    // const selectedImg = [
    //   {
    //     id: 1,
    //     img: "https://static.zara.net/photos///2022/I/0/2/p/1887/305/251/2/w/750/1887305251_6_1_1.jpg?ts=1657730582027",
    //   },
    //   {
    //     id: 2,
    //     img: "https://static.zara.net/photos///2022/I/0/2/p/1887/305/401/2/w/750/1887305401_6_1_1.jpg?ts=1657730545139",
    //   },
    //   {
    //     id: 3,
    //     img: "https://static.zara.net/photos///2022/I/0/2/p/1887/305/518/2/w/750/1887305518_6_1_1.jpg?ts=1657730544987",
    //   },
    // ];

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
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>
              Product Untitled Product | Skote - React Admin & Dashboard
              Template
            </title>
          </MetaTags>
          <Container fluid className="main-container">
            <div className="c-1">
              <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
            </div>

            <Row className="p-3 cont-2">
              <Col className="w-75">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3 ">
                      <h3 className="text-dark ">Product Images</h3>
                    </CardTitle>
                    <hr />
                    {this.state.selectedFiles.length != 0 ? (
                      <div>
                        <Row className="d-flex">
                          <Col className="d-flex justify-content-center">
                            <div
                              draggable
                              onDragStart={e => (dragItem.current = 0)}
                              onDragEnter={e => (dragOverItem.current = 0)}
                              onDragEnd={handleSort}
                              onDragOver={e => e.preventDefault()}
                              className="product-lg-img"
                            >
                              <div className="overlay-big">
                                <h1 className="cross-arrow-big">+</h1>
                                <button
                                  className="remove-btn-big"
                                  onClick={e => remove(index + 1)}
                                >
                                  x
                                </button>
                              </div>
                              <img
                                src={this.state.selectedFiles[0]?.preview}
                                alt=""
                                height={340}
                                width={320}
                              />
                            </div>
                          </Col>
                          <Col className="d-flex flex-wrap justify-content-start">
                            <div className="overlay">
                              <h1>+</h1>
                            </div>
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
                                      <h1 className="cross-arrow">+</h1>
                                      <button
                                        className="remove-btn"
                                        onClick={e => remove(index + 1)}
                                      >
                                        x
                                      </button>
                                    </div>
                                    <img
                                      src={item.preview}
                                      alt=""
                                      height={140}
                                      width={120}
                                      className="mx-2"
                                    />
                                  </div>
                                );
                              })}
                            <div className=" dropzone mx-2">
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
                                  <div className="d-flex align-items-center justify-content-center ">
                                    <h1 className="plus-sign mx-2 ">+</h1>
                                    <h3 className="font-weight-light">
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
              </Col>
              <Col className="col-md-4">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3 h4">Product Images</CardTitle>
                    <hr />

                    <Form className="h-75"></Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

AddProductV2.propTypes = {};

const mapStateToProps = state => ({
  products: state.ecommerce.products,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProductV2));
