import React, {useEffect} from 'react';

export function useFindMovie(movies, isSaved) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState('');
  const [short, setShort] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

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

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    updateInputSearch(query);
    if (query.length >= 1) {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        filterMovies(movies, query);
      }, 700));
    }
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