import React, { useState, useEffect, useMemo } from "react";
import { gameData } from "./data/games";

const GameList = () => {
  /* 
    instruction: set up the following states
    - games: array of games. use gameData as initial value
    - perPage: number of games per page
    - currentPage: current page number
    - totalPages: total number of pages
    - searchTerm: search term for title search
    - sort: sort by title or rating
  */
  const [games, setGames] = useState(gameData);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState([]);

  const genres = useMemo(() => {
    let options = [];
    // instruction: get all genres from gameData
    gameData.forEach((game) => {
      game.genres.forEach((genre) => {
        if (!options.includes(genre)) {
          options.push(genre);
        }
      });
    });
    return options;
  }, [gameData]);

  useEffect(() => {
    let newGames = [...gameData];

    // instruction: do title search using the searchTerm state
    if (search) {
      newGames = newGames.filter(
        (g) => g.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );
    }

    // instruction: do genre filter using the selectedGenre state
    if (selectedGenre !== "") {
      newGames = newGames.filter((g) => g.genres.includes(selectedGenre));
    }
    // instruction: retrieve total pages
    const total = Math.ceil(newGames.length / perPage);
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    setTotalPages(pages);

    // instruction: set totalPages state

    // instruction: sort by title or rating
    switch (sort) {
      case "title":
        newGames = newGames.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      case "rating":
        newGames = newGames.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
      default:
        newGames = newGames.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
    }

    // instruction: do pagination using the currentPage and perPage states
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    newGames = newGames.slice(start, end);

    setGames(newGames);
    // instruction: set games state with newGames variable
  }, [gameData, selectedGenre, sort, search, perPage, currentPage]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value
            value={search}
            onChange={(e) => {
              // instruction: set searchTerm state
              setSearch(e.target.value);
              // instruction: reset current page back to 1
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              setSort(e.target.value);
              // instruction: reset current page back to 1
              setCurrentPage(1);
            }}
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedGenre state to value

            onChange={(e) => {
              // instruction: set selectedGenre state
              setSelectedGenre(e.target.value);
              // instruction: reset current page back to 1
              setCurrentPage(1);
            }}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className="me-1 mb-1"
            // instruction: assign perPage state to value
            value={perPage}
            onChange={(e) => {
              // instruction: set perPage state
              // instruction: reset current page back to 1
              setPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={6}>6 per page</option>
            <option value={10}>10 per page</option>
            <option value={gameData.length}>All</option>
          </select>
        </div>
      </div>
      {/* 
        instruction: 
        - display the games here
        - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop
      */}
      <div className="row">
        {games.map((game) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={game.title}>
            <div className="card">
              <div className="card-image d-flex justify-content-center align-items-center">
                <img src={"/images/" + game.image} className="w-100 h-50 " />
              </div>
              <div className="card-body">
                <h4 className="card-title">{game.title}</h4>
                <p className="card-text">Genres: {game.genres.join(", ")}</p>
                <p className="card-text">Rating: {game.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        {/* instruction: display pagination buttons here */}
        <span
          style={{
            marginRight: "10px",
          }}
        >
          Page {currentPage} of {totalPages.length}
        </span>
        {totalPages.map((page) => {
          return (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameList;
