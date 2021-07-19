import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchEBook } from "../../actions";
import Show from "../main/Show";

function ShowItem(props) {
  const { fetchEBook, item } = props;
  const { id } = props.match.params;

  useEffect(() => {
    fetchEBook(id);
  }, [id]);

  return (
    <div className="container">
      <Show item={item} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { item: state.books.list[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchEBook })(ShowItem);
