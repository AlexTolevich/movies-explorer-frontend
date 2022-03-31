class MainApi {
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

  getMovies() {
    return fetch(`${this._baseUrl}movies`, {headers: this._headers})
      .then(this._checkResponse);
  }

  postMovie(data) {
    return fetch(`${this._baseUrl}movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.direction,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      }),
    })
      .then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  signup(email, password, name) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password, name})
    })
      .then(this._checkResponse);
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(this._checkResponse)
      .then(data => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('email', data.email);
        return data;
      });
  }

  getUser() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  patchUser(data) {
    return fetch(`${this._baseUrl}users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name: data.name, email: data.email})
      })
      .then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.movies.kuznetsov.nomoredomains.work/',
  baseUrl: 'http://localhost:3010/',
  headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MDE0MTIxNzI2ZWFhZGM4Y2QyNDEiLCJpYXQiOjE2NDg2MjM5NTcsImV4cCI6MTY0OTIyODc1N30.vBsWlHv9XosPLvuGvXgG-0OCVjU2kaNBREslEBI_qwE',
  },
});

export {mainApi};
