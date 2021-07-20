import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchSearch } from "../../actions";
import ShowList from "../main/ShowList";
import Loader from "../main/Loader";

function ShowSearch(props) {
  const { fetchSearch, items, loading } = props;
  const title = new URLSearchParams(props.location.search).get("title");

  useEffect(() => {
    fetchSearch(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ShowList items={items} title={title} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { items: Object.values(state.books.list), loading: state.loading };
};

export default connect(mapStateToProps, { fetchSearch })(ShowSearch);
