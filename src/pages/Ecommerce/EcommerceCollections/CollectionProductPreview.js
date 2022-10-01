import PropTypes from "prop-types"
import React from "react"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap"
import "./CollectionProductPreview-styles.scss"

export default function CollectionProductPreview({
  id,
  text,
  img,
  index,
  moveCollectionProductPreview,
}) {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "CollectionProductPreview",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      moveCollectionProductPreview(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "CollectionProductPreview",
    item: () => {
      return { id, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))
  return (
    <div
      className="collection-product-preview col-lg-3"
      ref={ref}
      data-handler-id={handlerId}
    >
      <Card className="pw-3 pe-3">
        <CardHeader className="position-absolute-top">{index + 1}</CardHeader>
        <img src={img} width="100%"></img>
        <CardFooter>{text}</CardFooter>
      </Card>
    </div>
  )
}

CollectionProductPreview.propTypes = {
  id: PropTypes.any,
  text: PropTypes.string,
  index: PropTypes.any,
  moveCollectionProductPreview: PropTypes.func,
  img: PropTypes.string,
}
