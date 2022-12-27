import React from "react"
import {
  Button,
  CardTitle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap"
import PropTypes from "prop-types"
import { useState } from "react"
import RichTextEditor from "react-rte"

export default function AddInfoSectionModal(props) {
  const [title, setTitle] = useState(props.section ? props.section.title : "")
  const [descCont, setDescCont] = useState(
    props.section
      ? { value: props.section.description }
      : {
          value: RichTextEditor.createEmptyValue(),
        }
  )
  const desChnage = value => {
    setDescCont({ value })
  }
  return (
    <React.Fragment>
      <ModalHeader toggle={props.toggle} style={{fontWeight: 600}}>
          {props.section ? "Add Info Section" : "Edit Info Section"}
      </ModalHeader>
      <ModalBody>
        <Label>Info section title</Label>
        <Input
          value={title}
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
        <Label className="mt-3">Info section description</Label>
        <RichTextEditor
          toolbarConfig={{
            // Optionally specify the groups to display (displayed in the order listed).
            display: [
              "INLINE_STYLE_BUTTONS",
              "BLOCK_TYPE_BUTTONS",
              "LINK_BUTTONS",
              "BLOCK_TYPE_DROPDOWN",
              "HISTORY_BUTTONS",
            ],
            INLINE_STYLE_BUTTONS: [
              { label: "Bold", style: "BOLD", className: "custom-css-class" },
              { label: "Italic", style: "ITALIC" },
              { label: "Underline", style: "UNDERLINE" },
            ],
            BLOCK_TYPE_DROPDOWN: [
              { label: "Normal", style: "unstyled" },
              { label: "Heading Large", style: "header-one" },
              { label: "Heading Medium", style: "header-two" },
              { label: "Heading Small", style: "header-three" },
            ],
            BLOCK_TYPE_BUTTONS: [
              { label: "UL", style: "unordered-list-item" },
              { label: "OL", style: "ordered-list-item" },
            ],
          }}
          value={descCont.value}
          onChange={desChnage}
        />
      </ModalBody>
      <ModalFooter className="justify-content-between">
        {props.section ? (
          <Button
            className="btn-danger"
            onClick={() => {
              props.setAdditionalInfoSections(prev =>
                prev.filter(section => section.id !== props.section.id)
              )
              props.toggle()
            }}
          >
            Delete
          </Button>
        ) : null}
        <div>
          <Button className="mx-2" onClick={props.toggle}>
            Cancel
          </Button>
          {props.section ? (
            <Button
              className="btn-success"
              onClick={() => {
                props.setAdditionalInfoSections(prev => [
                  {
                    id: props.section.id,
                    title: title,
                    description: descCont.value,
                  },
                  ...prev.filter(section => section.id !== props.section.id),
                ])
                props.toggle()
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              className="btn-success"
              onClick={() => {
                props.setAdditionalInfoSections([
                  {
                    id: Math.random(),
                    title: title,
                    description: descCont.value,
                  },
                  ...props.additionalInfoSections,
                ])
                props.toggle()
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </ModalFooter>
    </React.Fragment>
  )
}

AddInfoSectionModal.propTypes = {
  section: PropTypes.object,
  description: PropTypes.string,
  setAdditionalInfoSections: PropTypes.func,
  additionalInfoSections: PropTypes.array,
  toggle: PropTypes.func,
}
