import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchGenre } from "../../actions";

function NavbarDetail(props) {
  const { fetchGenre, genres } = props;

  useEffect(() => {
    fetchGenre(101901);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

const mapStateToProps = (state) => {
  return { genres: state.books.genre };
};

export default connect(mapStateToProps, { fetchGenre })(NavbarDetail);
