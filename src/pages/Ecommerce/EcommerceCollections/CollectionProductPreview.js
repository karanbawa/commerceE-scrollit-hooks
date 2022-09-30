import PropTypes from "prop-types"
import React from "react"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Card, Col, CardBody, CardSubtitle, CardFooter } from "reactstrap"

export default function CollectionProductPreview({
  id,
  text,
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
    <div className="col-3" ref={ref} data-handler-id={handlerId}>
      <Card>
        <img src="https://picsum.photos/200" />
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
}
