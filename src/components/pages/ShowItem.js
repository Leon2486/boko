import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEBook } from "../../store/book-action-creator";
import Show from "../main/Show";

function ShowItem(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const item = useSelector((state) => state.books.list[id]);

  useEffect(() => {
    dispatch(fetchEBook(id));
  }, [id, dispatch]);

  return (
    <div className="container">
      <Show item={item} />
    </div>
  );
}

export default ShowItem;
