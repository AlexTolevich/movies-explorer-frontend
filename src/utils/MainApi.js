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
    return fetch(`${this._baseUrl}movies`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._token}`,
      },
    })
      .then(this._checkResponse);
  }

  postMovie(data) {
    return fetch(`${this._baseUrl}movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        country: data.country || 'unknown',
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN || 'unknown'
      }),
    })
      .then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}movies/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._token}`,
      },
    })
      .then(this._checkResponse);
  }

  signup(data) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email: data.email, password: data.password, name: data.name})
    })
      .then(this._checkResponse);
  }

  signin(data) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email: data.email, password: data.password})
    })
      .then(this._checkResponse);
  }

  patchUser(data) {
    return fetch(`${this._baseUrl}users/me`,
      {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this._token}`,
        },
        body: JSON.stringify({name: data.name, email: data.email})
      })
      .then(this._checkResponse);
  }

  checkToken(token) {
    this._token = token;
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._token}`,
      }
    })
      .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.kuznetsov.nomoredomains.work/',
  // baseUrl: 'http://localhost:3010/',
  headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json',
  },
});

export {mainApi};
