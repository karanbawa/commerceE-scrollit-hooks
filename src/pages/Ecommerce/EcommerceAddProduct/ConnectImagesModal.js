import React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Col, ModalBody, ModalFooter, Row } from "reactstrap"
import Select from "react-select"

export default function ConnectImagesModal({ variants }) {
  const [selectedOption, setSelectedOption] = useState({
    value: Object.keys(variants)[0],
    label: Object.keys(variants)[0],
  })

  return (
    <React.Fragment>
      <ModalBody>
        <Row>
          <Col>
            Select an option and connect images you want customers to see when
            they click on that options choices.
          </Col>
        </Row>
        <Row>
          <Col>
            <div>Select an option</div>
            <Select
              value={selectedOption}
              onChange={changedValue => {
                setSelectedOption(changedValue)
              }}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Button>Cancel</Button>
        <Button>Apply</Button>
      </ModalFooter>
    </React.Fragment>
  )
}

ConnectImagesModal.propTypes = {
  variants: PropTypes.object,
}
