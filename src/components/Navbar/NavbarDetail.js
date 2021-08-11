import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchGenre } from "../../store/book-action-creator";

function NavbarDetail(props) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.books.genre);

  useEffect(() => {
    dispatch(fetchGenre(101901));
  }, [dispatch]);

  const renderGenres = () => {
    if (genres) {
      return genres.map(({ child }) => {
        return (
          <li className="navbar__detail-item" key={child.koboGenreId}>
            <Link
              to={`/genre/${child.koboGenreId}`}
              className="navbar__detail-genre"
            >
              {child.koboGenreName}
            </Link>
          </li>
        );
      });
    }
    return null;
  };

  return (
    <div className="navbar__detail">
      <ul className="navbar__detail-items">{renderGenres()}</ul>
    </div>
  );
}

export default NavbarDetail;
