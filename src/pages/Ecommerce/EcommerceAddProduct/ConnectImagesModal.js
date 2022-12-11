import React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Button, ModalBody, ModalFooter } from "reactstrap"

export default function ConnectImagesModal({variants}) {
    const [selectedOption, setSelectedOption] = useState()
  return (
    <React.Fragment>
      <ModalBody></ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Button>Cancel</Button>
        <Button>Apply</Button>
      </ModalFooter>
    </React.Fragment>
  )
}

ConnectImagesModal.propTypes = {
    variants : PropTypes.object,
    
}