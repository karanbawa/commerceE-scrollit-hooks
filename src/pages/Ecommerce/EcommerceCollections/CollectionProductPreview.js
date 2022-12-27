import PropTypes from "prop-types"
import React from "react"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Badge, Button, Card, CardFooter } from "reactstrap"
import "./CollectionProductPreview-styles.scss"

export default function CollectionProductPreview({
  id,
  text,
  img,
  index,
  moveCollectionProductPreview,
  deleteCollectionProductPreview,mutable
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
      <Card className="mx-2">
        <img className="mh-100 position-relative" src={img} width="100%"></img>

        <div className="position-absolute font-size-18 pt-2 d-flex align-items-center justify-content-between w-100">
          <Badge pill color="light " className=" opacity-75 mx-3">
            {index + 1}
          </Badge>
          {mutable ? <Button
            className="btn-transparent btn-rounded border-0 mx-2 delete-product-in-collection"
            outline
            onClick={() => {
              deleteCollectionProductPreview(index)
            }}
          >
            <i className="mdi mdi-close text-sm-end text-white opacity-100" />
          </Button> : null}
        </div>
        <CardFooter className="bg-white w-100 h-25">{text}</CardFooter>
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
  collectionProductIds: PropTypes.array,
  deleteCollectionProductPreview: PropTypes.func,
  mutable : PropTypes.bool
}