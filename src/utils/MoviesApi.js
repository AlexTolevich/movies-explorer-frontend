class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.getMovies = this.getMovies.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  /**
   *публичный метод загрузки данных с сервера
   * @returns {Promise<any>}
   */
  getMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { moviesApi };
