class BaseFetch {
  constructor(url) {
    this.baseUrl = url;
  }

  async fetchData(endpoint = "", method, options = null) {
    try {
      return await fetch(this.baseUrl + "/" + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        ...options,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default class FetchService extends BaseFetch {
  constructor(url) {
    super(url);
  }

  async createElement({ name, info = true, isImportant = true }) {
    const element = await this.fetchData("", "POST", {
      body: JSON.stringify({
        name,
        info,
        isImportant,
      }),
    });
    return await element.json();
  }

  async getCollection() {
    const data = await this.fetchData("", "GET");
    return await data.json();
  }

  async getElement(id) {
    const data = await this.fetchData("", "GET");
    const collection = await data.json();
    const findOne = collection.find((el) => el.id === id);
    if (!findOne) {
      throw new Error(
        `Невозможно получить элемент с id: ${id}, его нет в коллекции, используйте другой id`,
      );
    }
    const element = await this.fetchData(id);
    return await element.json();
  }

  async updateElement(id, { name, info = true, isImportant = true }) {
    const data = await this.fetchData("", "GET");
    const collection = await data.json();
    const findOne = collection.find((el) => el.id === id);
    if (!findOne) {
      throw new Error(
        `Невозможно обновить элемент с id: ${id}, его нет в коллекции, используйте другой id`,
      );
    }
    const modified = await this.fetchData(id, "PATCH", {
      body: JSON.stringify({
        name,
        info,
        isImportant,
      }),
    });
    return await modified.json();
  }

  async deleteElement(id = null) {
    const data = await this.fetchData("", "GET");
    const collection = await data.json();
    let lastId;

    if (id) {
      const findOne = collection.find((el) => el.id === id);
      if (!findOne) {
        throw new Error(
          `Невозможно удалить элемент с id: ${id}, его нет в коллекции, используйте другой id`,
        );
      }

      lastId = id;
    } else {
      lastId = collection[collection.length - 2].id;
    }

    const response = await this.fetchData(lastId, "DELETE");

    if (response.status >= 200 && response.status < 300) {
      return lastId;
    }

    return false;
  }
}
