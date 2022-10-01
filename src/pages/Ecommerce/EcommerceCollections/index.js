import React, { useState } from "react"
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  CardHeader,
  Input,
} from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { Link } from "react-router-dom"
import CollectionTile from "./CollectionTile"
import { useDispatch, useSelector } from "react-redux"
import { getCollections, getProductList } from "store/actions"
import { useEffect } from "react"

export default function EcommerceCollections() {
  const [collectionList, setCollectionList] = useState([])
  const [filteredCollectionList, setFilteredCollectionList] = useState([])

  const dispatch = useDispatch()
  const { collections } = useSelector(state => ({
    collections: state.ecommerce.collections,
    products: state.ecommerce.productList,
  }))

  //Getting Collections from store
  useEffect(() => {
    if (collections && !collections.length) {
      dispatch(getCollections())
    }
  }, [])

  useEffect(() => {
    setCollectionList(collections)
  }, [collections])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Collections | Scrollit</title>
        </MetaTags>
        <Container className="p-2" fluid style={{ maxWidth: "1100px" }}>
          <Row>
            <Col className="display-6 ">
              Collections{" "}
              <span className="text-secondary">{collections.length + 1}</span>
            </Col>
            <Col>
              <div className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                <div className="search-box me-2">
                  <div className="position-relative">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={event => {
                        if (!event.target.value) {
                          setFilteredCollectionList(collectionList)
                        }
                      }}
                    />
                    <i className="bx bx-search-alt search-icon" />
                  </div>
                </div>
                <Link to="/ecommerce-collection-details/untitled-collection">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded m-1"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add Collection
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="px-3 pt-1">
            Group related products into collections and add them to your site.
          </Row>
          <Row className="mt-2">
            <CollectionTile
              _id="all-products"
              name="All Products"
              productIds={[]}
            />
            {collectionList.map(collection => (
              <CollectionTile
                key={collection._id}
                _id={collection._id}
                name={collection.name}
                color={collection.color}
                icon={collection.icon}
                productIds={collection.productIds}
                isMutable={true}
              />
            ))}
            <div className="col-4 pt-4">
              <Link className=" rounded bg-success d-flex justify-content-center align-items-center h-100" to={`/ecommerce-collection-details/untitled-collection`}>
                <i className="mdi mdi-plus mdi-48px me-1 text-white" />
              </Link>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
