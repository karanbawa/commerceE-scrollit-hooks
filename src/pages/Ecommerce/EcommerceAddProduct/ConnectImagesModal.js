import React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Col, Input, ModalBody, ModalFooter, Row } from "reactstrap"
import Select from "react-select"
import FileResizer from "react-image-file-resizer"

export default function ConnectImagesModal({
  variants,
  optionMedia,
  setOptionMedia,
}) {
  const [selectedOption, setSelectedOption] = useState({
    value: Object.keys(variants)[0],
    label: Object.keys(variants)[0],
  })
  const [uploadedImage, setUploadedImage] = useState()
  const [toast, setToast] = useState(false)
  const [toastDetails, setToastDetails] = useState({ title: "", message: "" })
  const toggleToast = () => setToast(!toast)
  const [productImage, setProductImage] = useState("")

  const resizeFile = (file, option) =>
    new Promise(resolve => {
      FileResizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        uri => {
          if(optionMedia[option]){
            optionMedia[option].push(uri)
          } else {
            optionMedia[option] = [uri]
          }
        },
        "base64"
      )
    })

  // console.log(optionMedia)

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
              options={Object.keys(variants).map(variantCate => ({
                label: variantCate,
                value: variantCate,
              }))}
            />
          </Col>
        </Row>
        {variants[selectedOption.value].map((option, index) => (
          <Row key={index} className="p-2">
            <Col className="col-3">{option.value}</Col>
            <Col>
              {optionMedia[option]
                ? optionMedia[option].map((os, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundImage: os,
                      }}
                    ></div>
                  ))
                : null}
            </Col>
            <Col>
              <Input
                key={index}
                type="file"
                onChange={async e => {
                  if(e.target.files.length){
                    if (
                      ["jpeg", "jpg", "png"].includes(
                        e.target.files[0].name.split(".").pop()
                      )
                    ) {
                      setToastDetails({
                        title: "Image Uploaded",
                        message: `${e.target.files[0].name} has been uploaded.`,
                      })
                      setToast(true)
                      const image = await resizeFile(e.target.files[0],option)
                    } else {
                      setToastDetails({
                        title: "Invalid image",
                        message:
                          "Please upload images with jpg, jpeg or png extension",
                      })
                      setToast(true)
                    }
                  }
                }}
              />
            </Col>
          </Row>
        ))}
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
  optionMedia: PropTypes.object,
  setOptionMedia: PropTypes.func,
}
