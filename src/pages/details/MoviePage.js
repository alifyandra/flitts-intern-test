import React, { useEffect, useState } from "react";
import axios from "axios";
import getPrice from "../../utils/getPrice";
import Title from "./components/Title";
import Poster from "./components/Poster";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Purchase from "./components/Purchase";
import Cast from "./components/Cast";
import Recommendations from "./components/Recommendations";
import Duration from "./components/Duration";
import Similar from "./components/Similar";

const MoviePage = ({
  ownedMovies,
  setOwnedMovies,
  pathName,
  setPathName,
  API_URL,
  API_KEY,
  balance,
  setBalance,
  currPage,
  setCurrPage,
}) => {
  const [movie, setMovie] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    setPathName(window.location.pathname);
    var splitIndex = pathName.indexOf("-");
    var [movieId] = [
      pathName.slice(0, splitIndex),
      pathName.slice(splitIndex + 1),
    ];

    // Fetch general movie details
    axios
      .get(
        API_URL +
          "/movie" +
          movieId +
          "?api_key=" +
          API_KEY +
          "&language=en-us" +
          "&append_to_response=credits"
      )
      .then((res) => {
        setMovie(res.data);
      });

    // Fetch movie recommendations
    axios
      .get(
        API_URL +
          "/movie" +
          movieId +
          "/recommendations?api_key=" +
          API_KEY +
          "&language=en-us&page=1"
      )
      .then((res) => {
        setRecommendations(res.data.results);
      });

    // Fetch similar movies
    axios
      .get(
        API_URL +
          "/movie" +
          movieId +
          "/similar?api_key=" +
          API_KEY +
          "&language=en-US&page=1"
      )
      .then((res) => {
        setSimilar(res.data.results);
      });
  }, [pathName, currPage]);

  return (
    <div className="container" style={{ padding: "1.5em" }}>
      <Title movieTitle={movie.original_title} />
      <Poster imgUrl={movie.poster_path} />
      <Rating rating={movie.vote_average} />
      <Duration duration={movie.runtime} />
      <Description desc={movie.overview ? movie.overview : "No description"} />
      <Cast casts={movie?.credits?.cast ?? []} />
      <Purchase
        movieId={movie.id}
        price={getPrice(movie)}
        owned={ownedMovies.includes(movie.id)}
        setOwnedMovies={setOwnedMovies}
        ownedMovies={ownedMovies}
        balance={balance}
        setBalance={setBalance}
      />
      <Recommendations
        recs={recommendations}
        setCurrPage={setCurrPage}
        ownedMovies={ownedMovies}
      />
      <Similar
        similar={similar}
        setCurrPage={setCurrPage}
        ownedMovies={ownedMovies}
      />
    </div>
  );
};

export default MoviePage;
