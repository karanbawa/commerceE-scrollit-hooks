import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
const orderRepeater = ({ index, formRep, setFormRep }) => {
    const st = formRep.filter((form) => form.index === index)[0];
    return (
        
        <Row key={key}>
        <Col className="mb-3">
          <div className="mb-3">
            <Label className="form-label">
              Product Name
            </Label>
            <input
            name="productName"
            type="select"
                value={
                    formRep.filter((form) => form.index === index)[0].product
                }
                onChange={(e) => {
                    setFormRep([
                        ...formRep.filter((form) => form.index !== index),
                        {
                            index: st.index,
                            product: e.target.value,
                            quantity: st.quantity,
                        },
                    ]);
                }}
            >  {products.length > 0 && products.map((item, index) =>
              <option key={index}>{item.name}</option>
            )
            }</input>
            {validation.touched.productName &&
              validation.errors.productName ? (
              <FormFeedback type="invalid">
                {
                  validation.errors
                    .productName
                }
              </FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col className="mb-3">
        <div className="mb-3">
          <Label className="form-label">
            Product Quality
          </Label>
            <input
            name="productQuality"
            type="number"
            validate={{
              required: { value: true },
            }}
            invalid={
              validation.touched
                .productQuality &&
                validation.errors.productQuality
                ? true
                : false
            }
                value={
                    formRep.filter((form) => form.index === index)[0].quantity
                }
                onChange={(e) => {
                    setFormRep([
                        ...formRep.filter((form) => form.index !== index),
                        {
                            index: st.index,
                            product: st.product,
                            quantity: e.target.value,
                        },
                    ]);
                }}
            ></input>
            {validation.touched.productQuality &&
              validation.errors.productQuality ? (
              <FormFeedback type="invalid">
                {validation.errors.productQuality}
              </FormFeedback>
            ) : null}
          </div>

        </Col>
        
        <Col className="align-self-center">
        <div className="d-grid mb-2">
            <button
                onClick={() => {
                    setFormRep(formRep.filter((form) => form.index !== index));
                }}
            >
                delete
            </button>
        </div>
      </Col>
      </Row>
    );
};

export default orderRepeater;