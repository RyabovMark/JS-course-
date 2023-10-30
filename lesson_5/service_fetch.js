class BaseFetch {
  constructor(url) {
    this.baseUrl = url;
  }

  async fetchData(endpoint = "", options = {}) {
    try {
      const request = await fetch(this.baseUrl + endpoint, options);
      return [await request.json(), request.ok];
    } catch (error) {
      console.log(error);
    }
  }
}

export default class FetchService extends BaseFetch {
  constructor(url) {
    super(url);
  }

  async createFetchElement({ name, info = true, isImportant = true }) {
    try {
      const [data, status] = await this.fetchData(this.url, {
        method: "POST",
        "Content-Type": "application/json; charset=utf-8",
        body: JSON.stringify({
          name,
          info,
          isImportant,
        }),
      });
      if (status) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getCollection() {
    try {
      const [data, status] = await this.fetchData();
      if (status) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getFetchElement(id) {
    try {
      const [data, status] = await this.fetchData(id);
      if (status) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateFetchElement({ name, info = true, isImportant = true, id }) {
    try {
      const [data, status] = await this.fetchData(id, {
        method: "PATCH",
        "Content-Type": "application/json; charset=utf-8",
        body: JSON.stringify({
          name,
          info,
          isImportant,
        }),
      });
      if (status) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFetchElement(id) {
    try {
      const [_, status] = await this.fetchData(id, {
        method: "DELETE",
        "Content-Type": "application/json; charset=utf-8",
      });
      if (status) {
        return true
      }
    } catch (error) {
      console.error(error);
    }
  }
}

