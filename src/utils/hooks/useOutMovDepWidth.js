import React, {useEffect, useState} from 'react';

/**
 * Кастомный Хук обработки данных массива для отображения при различной ширине экрана и обработка нажатия кнопки "Ещё"
 * @param movies - [] массив входящих данных
 * @returns {{handleMoreMovies: handleMoreMovies, finalArrMovies}}
 */
export function useOutMovDepWidth(movies) {
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [timer, setTimer] = React.useState(0);
  const [howManyMovies, setHowManyMovies] = React.useState(16);

  function detectResize() {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      setWinWidth(window.innerWidth);
    }, 1000));
  }

  useEffect(() => {
    window.addEventListener('resize', detectResize);
    if (winWidth >= 1280) {
      setHowManyMovies(16);
    } else if (winWidth >= 1024) {
      setHowManyMovies(9);
    } else if (winWidth >= 638) {
      setHowManyMovies(8);
    } else if (winWidth >= 320) {
      setHowManyMovies(5);
    }

    return () => {
      window.removeEventListener('resize', detectResize);
    }
  }, [winWidth]);

  function handleMoreMovies() {
    if (winWidth >= 1280) {
      setHowManyMovies(howManyMovies + 4);
    } else if (winWidth >= 1024) {
      setHowManyMovies(howManyMovies + 3);
    } else if (winWidth >= 320) {
      setHowManyMovies(howManyMovies + 2);
    }
  }

  let finalArrMovies = movies.length > 0 ? movies.slice(0, howManyMovies) : [];

  return {
    finalArrMovies,
    handleMoreMovies,
  }
}