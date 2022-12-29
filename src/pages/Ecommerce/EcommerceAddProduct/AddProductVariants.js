import React from "react"
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import CreatableSelect from "react-select/creatable"
import PropTypes from "prop-types"
import { useState } from "react"

export default function AddProductVariants({
  addProductOptionToggle,
  variants,
  setVariants,
  editVariant,
  setEditVariant,
}) {
  const [optionCategoryName, setOptionCategoryName] = useState(
    editVariant ? Object.keys(editVariant)[0] : ""
  )
  const [showOptionAs, setShowOptionAs] = useState("list")
  const [optionValue, setOptionValue] = useState(
    editVariant ? editVariant[Object.keys(editVariant)[0]] : []
  )
  const [inputValue, setInputValue] = useState("")

  const createOption = label => ({
    label : label,
    value: label,
    color: "green",
  })

  const keyHandleDown = event => {
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case "Tab":
        setOptionValue(prev => [...prev, createOption(inputValue)])
        setInputValue("")
        event.preventDefault()
    }
  }

  const keyHandleDownForColor = event => {
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case "Tab":
        setOptionValue(prev => [...prev, createOption(inputValue)])
        setInputValue("")
        event.preventDefault()
    }
  }

  return (
    <React.Fragment>
      <ModalHeader toggle={addProductOptionToggle}>
        {editVariant ? "Update Product Option" : "Add Product Option"}
      </ModalHeader>
      <ModalBody>
        {editVariant ? (
          Object.keys(variants)
            .filter(variant => variant !== Object.keys(editVariant)[0]).map(variant => (variant?.toUpperCase()))
            .includes(optionCategoryName?.toUpperCase()) ? (
            <Alert color="danger">A product option with the same name already exists.</Alert>
          ) : null
        ) : Object.keys(variants).map(variant => (variant.toUpperCase())).includes(optionCategoryName?.toUpperCase()) ? (
          <Alert color="danger">A product option with the same name already exists.</Alert>
        ) : null}
        <Row>
          <Col className="col-7">
            <Row>
              <Col>
                <Label for="optioncat">Type in an option name</Label>
                <Input
                  id="optioncat"
                  value={optionCategoryName}
                  onChange={e => {
                    setOptionCategoryName(e.target.value)
                  }}
                  placeholder="e.g. Size or Colour"
                ></Input>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Label>Show in product page:</Label>
              <ButtonGroup>
                <Button
                  outline
                  active={showOptionAs === "list"}
                  onClick={() => {
                    setShowOptionAs("list")
                  }}
                >
                  List
                </Button>
                <Button
                  outline
                  active={showOptionAs === "color"}
                  onClick={() => {
                    setShowOptionAs("color")
                  }}
                >
                  Color
                </Button>
              </ButtonGroup>
            </Row>
          </Col>
        </Row>
        <Row className="my-2">
          <Label>Type in choices for this option</Label>
          {showOptionAs === "list" ? (
            <CreatableSelect
              isMulti
              isClearable
              value={optionValue}
              onChange={changedValue => setOptionValue(changedValue)}
              components={{ DropdownIndicator: null }}
              menuIsOpen={false}
              inputValue={inputValue}
              onInputChange={newValue => setInputValue(newValue)}
              onKeyDown={keyHandleDown}
            />
          ) : (
            <CreatableSelect
              isMulti
              isClearable
              value={optionValue}
              onChange={changedValue => setOptionValue(changedValue)}
              components={{ DropdownIndicator: null }}
              menuIsOpen={false}
              inputValue={inputValue}
              onInputChange={newValue => setInputValue(newValue)}
              onKeyDown={keyHandleDown}
              styles={{multiValueLabel: (styles, {data}) => ({...styles, color : data.color})}}
            />
          )}
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            className="mx-2"
            onClick={() => {
              addProductOptionToggle()
            }}
          >
            Cancel
          </Button>
          {editVariant ? (
            <Button className="btn-success" onClick={() => {
              if(Object.keys(variants).includes(optionCategoryName)){
                variants[optionCategoryName] = optionValue
                setVariants({...variants})
              } else {
                delete variants[Object.keys(editVariant)[0]]
                variants[optionCategoryName] = optionValue
                setVariants({...variants})
              }
              addProductOptionToggle()
            }}> Update
            </Button>
          ) : (
            <Button
              className="btn-success"
              onClick={() => {
                setVariants(previous => ({
                  ...previous,
                  [optionCategoryName]: optionValue,
                }))
                addProductOptionToggle()
              }}
              disabled={
                (!(
                  Object.keys(optionValue).length && optionCategoryName.length
                ) ||
                (editVariant
                  ? Object.keys(variants)
                      .filter(
                        variant => variant !== Object.keys(editVariant)[0]
                      )
                      .includes(optionCategoryName)
                    ? true
                    : false
                  : Object.keys(variants).includes(optionCategoryName)
                  ? true
                  : false))
              }
            >
              Add
            </Button>
          )}
        </div>
      </ModalBody>
      <ModalFooter
        className="justify-content-center text-primary"
        style={{ cursor: "pointer" }}
      >
        Watch how to add and manage product options
      </ModalFooter>
    </React.Fragment>
  )
}

AddProductVariants.propTypes = {
  addProductOptionToggle: PropTypes.func,
  variants: PropTypes.object,
  setVariants: PropTypes.func,
  editVariant: PropTypes.object,
  setEditVariant: PropTypes.func,
}
