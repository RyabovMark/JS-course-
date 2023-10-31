class BaseXml {
  constructor(url) {
    this.baseUrl = url;
  }

  requestData(endpoint = "", method = "GET", body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + "/" + endpoint, true);

      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => reject(xhr.response);
      xhr.send(body ? JSON.stringify(body) : null);
    });
  }
}

export default class XmlService extends BaseXml {
  constructor(url) {
    super(url);
  }

  async findOne(id) {
    const collection = await this.requestData("", "GET");
    return collection.find((el) => el.id === id);
  }

  async createElement({ name, info = true, isImportant = true }) {
    return await this.requestData("", "POST", { name, info, isImportant });
  }

  async getCollection() {
    return await this.requestData();
  }

  async getElement(id) {
    const unique = await this.findOne(id);
    if (!unique) {
      throw new Error(
        `Невозможно получить элемент с id: ${id}, его нет в коллекции, используйте другой id`,
      );
    }
    return await this.requestData(id, "GET");
  }

  async updateElement(id, { name, info = true, isImportant = true }) {
    const unique = await this.findOne(id);
    if (!unique) {
      throw new Error(
        `Невозможно изменить элемент с id: ${id}, его нет в коллекции, используйте другой id`,
      );
    }
    return await this.requestData(id, "PATCH", { name, info, isImportant });
  }

  async deleteElement(id) {
    const collection = await this.requestData();
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

    await this.requestData(lastId, "DELETE");

    return lastId
  }
}
