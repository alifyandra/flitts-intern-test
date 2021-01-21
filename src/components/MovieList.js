import CardColumns from "react-bootstrap/CardColumns";
import Movie from "./Movie";

const MovieList = ({ movieList }) => {
  return (
    <>
      <CardColumns>
        {movieList.map((movie, index) => {
          return <Movie key={index} movie={movie} />;
        })}
      </CardColumns>
    </>
  );
};

export default MovieList;
