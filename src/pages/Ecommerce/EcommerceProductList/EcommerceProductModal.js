import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

import classnames from "classnames";

import { isEmpty } from "lodash";

class EcommerceProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "2",
      product: {},
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.imageShow = this.imageShow.bind(this);
  }
  toggleTab(tab) {
    const tab2 = tab.toString();
    if (this.state.activeTab !== tab2) {
      this.setState({
        activeTab: tab2,
      });
    }
  }

  imageShow(img, id) {
    const expandImg = document.getElementById("expandedImg" + id);
    expandImg.src = img;
  }

  render() {
    const { product } = this.props;

    return (
      <React.Fragment>
        <Modal
          size="lg"
          isOpen={this.props.isOpen}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabIndex="-1"
          toggle={this.props.toggle}
        >
          <div className="modal-content">
            <ModalHeader toggle={this.props.toggle}>
              Product Details
            </ModalHeader>
            <ModalBody>
              <React.Fragment>
                {!isEmpty(product) && (
                  <div className="product-detai-imgs justify-content-center">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <Col md={{ size: 7, offset: 1 }} xs="9">
                        {product.productImages.length == 1 ? (
                          <div>
                            <img
                              src={product.productImages[0]}
                              alt=""
                              id="expandedImg1"
                              className="img-fluid mx-auto d-block  "
                              style={{ maxHeight: "300px" }}
                            />
                          </div>
                        ) : (
                          <TabContent activeTab={this.state.activeTab}>
                            {product.productImages.map((image, index) => (
                              <TabPane tabId={`${index + 1}`} key={index}>
                                <div>
                                  <img
                                    src={image}
                                    alt=""
                                    id={`expandedImg${index + 1}`}
                                    className="img-fluid mx-auto d-block "
                                    style={{ maxHeight: "300px" }}
                                  />
                                </div>
                              </TabPane>
                            ))}
                          </TabContent>
                        )}
                      </Col>
                      <div className=" mt-4 ">
                        <Nav className="" pills>
                          {/* {product.productImages.map((image, index) => (
                            <>
                              <NavItem key={index}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.activeTab === index + 1,
                                  })}
                                  onClick={() => {
                                    this.toggleTab(index + 1);
                                  }}
                                >
                                  <img
                                    src={image}
                                    alt=""
                                    onClick={() => {
                                      this.imageShow(image, index + 1);
                                    }}
                                    className="avatar-sm"
                                  />
                                </NavLink>
                              </NavItem>
                            </>
                          ))} */}
                        </Nav>
                      </div>
                      <div className="mt-4 mx-4">
                        <Link to="#" className="text-primary">
                          T shirts
                        </Link>
                        <h4 className="mt-1 mb-3">Half sleeve tshirt</h4>

                        {/* {!!product.isOffer && (
                              <h6 className="text-success text-uppercase">
                                10 % Off
                              </h6>
                            )} */}
                        <h5 className="mb-4">
                          Price :{" "}
                          {/* <span className="text-muted me-2">
                                <del>${product.oldPrice} USD</del>
                              </span>{" "} */}
                          <b>$405 USD</b>
                        </h5>
                        <p className="text-muted mb-4 text-wrap w-75">
                          To achieve this, it would be necessary to have uniform
                          grammar pronunciation and more common words If several
                          languages coalesce
                        </p>
                        <Row className="mb-3 row">
                          <Col className=" d-flex flex-wrap justify-content-between col-md-6">
                            {product?.productSeachKeywords.map(
                              (item, index) => (
                                <>
                                  <div key={index}>
                                    <p className="text-muted">
                                      <i className="fa fa-caret-right  font-size-16 align-middle text-primary me-2"></i>
                                      {item}
                                    </p>
                                  </div>
                                </>
                              )
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="secondary"
                onClick={this.props.toggle}
              >
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

EcommerceProductModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  product: PropTypes.object,
};

export default EcommerceProductModal;
