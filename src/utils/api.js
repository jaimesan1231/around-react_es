class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async getInitialCards() {
    try {
      const response = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error:${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async getUserInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error:${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async editProfile(body) {
    const { name, about } = body;
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async editAvatar(link) {
    try {
      const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async changeLikeCardStatus(cardId, isLiked) {
    try {
      let response;
      if (isLiked) {
        response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: this.headers,
        });
      } else {
        response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
          method: "PUT",
          headers: this.headers,
        });
      }
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async postCard(body) {
    const { title, link } = body;
    try {
      const response = await fetch(`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: title,
          link: link,
        }),
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async deleteCard(cardId, onDeleteCard) {
    try {
      const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      });
      if (response.ok) {
        onDeleteCard();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    authorization: "64b42335-e161-40b8-8c1c-d5789010cc5e",
    "content-type": "application/json",
  },
});

export default api;
