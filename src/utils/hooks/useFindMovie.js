import React, {useEffect} from 'react';

export function useFindMovie(movies, isSaved) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState('');
  const [short, setShort] = React.useState(false);

  function updateFilteredMovies(filteredMovies) {
    setFilteredMovies(filteredMovies);
    localStorage.setItem(`${isSaved}FilteredMovies`, JSON.stringify(filteredMovies));
  }

  function updateInputSearch(inputSearch) {
    setInputSearch(inputSearch);
    localStorage.setItem(`${isSaved}InputSearch`, inputSearch);
  }

  function updateShort(short) {
    setShort(short);
    localStorage.setItem(`${isSaved}Short`, JSON.stringify(short));
  }

  useEffect(() => {
    updateFilteredMovies(JSON.parse(localStorage.getItem(`${isSaved}FilteredMovies`) || '[]'));
    updateInputSearch(localStorage.getItem(`${isSaved}InputSearch`) || '');
    updateShort(JSON.parse(localStorage.getItem(`${isSaved}Short`) || 'false'));
  }, []);

  useEffect(() => {
    if (inputSearch.length >= 1) {
      setTimeout(filterMovies, 200, movies, inputSearch);
    }
  }, [inputSearch]);

  function handleChange(event) {
    updateInputSearch(event.target.value.toLowerCase());
  }

  function filterMovies(movies, input) {
    updateFilteredMovies(movies
      .filter(({
                 nameRU,
                 nameEN
               }) => nameRU.toLowerCase().includes(input) || nameEN?.toLowerCase().includes(input)))
  }

  function handleShort() {
    updateShort(!short);
  }

  function onSubmitSearch(event) {
    event.preventDefault();
    filterMovies(movies, inputSearch);
  }

  return {
    short,
    filteredMovies,
    setFilteredMovies,
    inputSearch,
    setInputSearch,
    setShort,
    handleShort,
    handleChange,
    onSubmitSearch,
    updateFilteredMovies
  }
}