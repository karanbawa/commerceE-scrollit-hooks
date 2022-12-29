import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteCollection } from 'store/actions';

function CollectionTile({ _id, name, icon, color, productIds, isMutable }) {
  const dispatch = useDispatch();
  const handleCollectionDelete = () => {
    dispatch(deleteCollection(_id));
  };

  return (
    <div className="col-4 pt-4">
      <Link
        to={`/ecommerce-collection-details/${_id}`}
        className={`${color ? '' : 'bg-secondary '} rounded d-flex flex-column justify-content-between`}
        style={{ minHeight: '280px', background: color }}
      >
        <Row>
          <Col className="text-sm-end m-3 mx-4">
            <UncontrolledDropdown direction="left">
              <DropdownToggle
                tag={Button}
                className="card-drop"
                color="link"
              >
                <i className="mdi mdi-dots-horizontal mdi-24px text-white" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  tag={Button}
                  color="link"
                  onClick={() => console.log('hello!!')}
                >
                  <i className="mdi mdi-file-image me-3" />
                  Update Image
                </DropdownItem>
                {_id !== 'all-products' ? (
                  <DropdownItem
                    tag={Button}
                    color="link"
                    onClick={handleCollectionDelete}
                  >
                    <i className="fas fa-trash-alt me-3" />
                    Delete
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
        <div className="m-2 position-fixed-bottom text-white p-2 mx-3 font-size-18">
          {name}
          <span className="mx-2">{productIds ? productIds.length : 0}</span>
        </div>
      </Link>
    </div>
  );
}

CollectionTile.propTypes = {
  _id: PropTypes.string,
  isMutable: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  productIds: PropTypes.array,
};

export default CollectionTile;
