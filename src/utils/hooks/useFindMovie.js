import React, {useEffect} from 'react';

/**
 * Кастомный Хук для фильтрации массива по ключевым символам введенным в input и состоянию чекбокса
 * @param movies - [] массив входящих данных
 * @param isSaved - "" текстовые данные используемые для формирования имени ключа сохраняемых данных в LocalStorage
 * @param initialStateRender - true/false - состояние наполнения массива (movies/[]) при отсутствии данных в input
 * @param getFilm - функция загрузки фильмов
 * @returns {{setFilteredMovies: (value: (((prevState: *[]) => *[]) | *[])) => void, handleShort: handleShort, setInputSearch: (value: (((prevState: string) => string) | string)) => void, handleChange: handleChange, updateFilteredMovies: updateFilteredMovies, short: boolean, filteredMovies: *[], inputSearch: string, setShort: (value: (((prevState: boolean) => boolean) | boolean)) => void, onSubmitSearch: onSubmitSearch}}
 */
export function useFindMovie(movies, isSaved, initialStateRender, getFilm) {
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

  function handleInputChange(event) {
    const query = event.target.value.toLowerCase();
    updateInputSearch(query);
  }

  function filterMovies(movies, input, shortCheck) {
    if (input.length === 0 && !initialStateRender) {
      !initialStateRender && updateFilteredMovies([]);
    } else {
      updateFilteredMovies(movies
        .filter(({
                   nameRU,
                   nameEN,
                   duration,
                 }) => (nameRU.toLowerCase().includes(input) || nameEN?.toLowerCase().includes(input))
          & (!shortCheck || duration <= 40)))
    }
  }

  function handleSwitchShort(event) {
    const inputShortCheckBox = event.target.checked;
    updateShort(inputShortCheckBox);
    filterMovies(movies, inputSearch, inputShortCheckBox);
  }

  function onSubmitSearch(event) {
    event.preventDefault();
    if (!initialStateRender) {
      getFilm();
    } else {
      filterMovies(movies, inputSearch, short);
    }

  }

  return {
    short,
    filteredMovies,
    setFilteredMovies,
    inputSearch,
    setInputSearch,
    setShort,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    updateFilteredMovies,
    filterMovies,
  }
}