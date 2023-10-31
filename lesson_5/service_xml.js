class BaseXml {
  constructor(url) {
    this.baseUrl = url;
  }

  requestData(endpoint = "", method = "GET", body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + endpoint, true);

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

      xhr.send(JSON.stringify(body));
    });
  }
}

export default class XmlService extends BaseXml {
  constructor(url) {
    super(url);
  }

  async createElement({ name, info = true, isImportant = true }) {
    return await this.requestData("", "POST", { name, info, isImportant });
  }

  async getCollection() {
    return await this.requestData();
  }

  async getElement(id) {
    return await this.requestData(id);
  }

  async updateElement({ name, info = true, isImportant = true, id }) {
    return await this.requestData(id, "PATCH", { name, info, isImportant });
  }

  async deleteElement(id) {
    return await this.requestData(id,'DELETE');
  }
}
