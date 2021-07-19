import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";

import { fetchEBooks } from "../../actions";
import ShowList from "../main/ShowList";
import Loader from "../main/Loader";

function Genre(props) {
  const { id } = props.match.params;
  const { fetchEBooks, items, loading } = props;

  useEffect(() => {
    fetchEBooks(id);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Suspense>
        <ShowList items={items} />
      </Suspense>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { items: Object.values(state.books.list), loading: state.loading };
};

export default connect(mapStateToProps, { fetchEBooks })(Genre);
