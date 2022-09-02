import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Modal, ModalBody, Row } from "reactstrap";

export class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.show}
          toggle={this.props.onCloseClick}
          centered={true}
        >
          <ModalBody className="py-3 px-5">
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <i
                    className="mdi mdi-alert-circle-outline"
                    style={{ fontSize: "9em", color: "orange" }}
                  />
                  <h2>Are you sure?</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-lg me-2"
                    onClick={this.props.onEditClick}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg me-2"
                    onClick={this.props.onCloseClick}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
EditModal.propTypes = {
  onCloseClick: PropTypes.func,
  onEditClick: PropTypes.func,
  show: PropTypes.any,
};

export default EditModal;
