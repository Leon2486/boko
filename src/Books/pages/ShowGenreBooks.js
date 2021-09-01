import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEBooks } from "../../store/book-action-creator";
import ShowList from "../components/ShowList";
import Loader from "../../shared/UI/Loader";

function Genre(props) {
  const dispatch = useDispatch();

  const { id } = props.match.params;
  const items = useSelector((state) => Object.values(state.books.list));
  const bookLoading = useSelector((state) => state.books.loading);

  useEffect(() => {
    dispatch(fetchEBooks(id));
  }, [id, dispatch]);

  if (bookLoading) {
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

export default Genre;
