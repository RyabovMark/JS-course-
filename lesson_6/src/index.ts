import { Methods } from './types/enums';
import { IBody, IPost } from './types/interfaces';
import { Options, PartialPost } from './types/types';

class BaseFetch {
  readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async fetchData<T>(endpoint = '', method: Methods, options: Options = null): Promise<T> {
    try {
      const response: Response = await fetch(this.baseUrl + '/' + endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: options,
      });

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

class FetchService extends BaseFetch {
  constructor(url: string) {
    super(url);
  }

  async findOne(id: string): Promise<PartialPost> {
    const data: Response = await this.fetchData('', 'GET');
    const collection = await data.json();
    return collection.find((el): boolean => el.id == id);
  }

  async createElement({ name, info = true, isImportant = true }: IBody): Promise<PartialPost> {
    const element: Response = await this.fetchData(
      '',
      'POST',
      JSON.stringify({
        name,
        info,
        isImportant,
      })
    );
    return await element.json();
  }

  async getCollection(): Promise<PartialPost[]> {
    const data: Response = await this.fetchData('', 'GET');
    return await data.json();
  }

  async getElement(id: string): Promise<PartialPost> {
    const unique = await this.findOne(id);
    if (!unique) {
      throw new Error(`Невозможно получить элемент с id: ${id}, его нет в коллекции, используйте другой id`);
    }

    const element: Response = await this.fetchData(id, 'GET');
    return await element.json();
  }

  async updateElement(id: string, { name, info = true, isImportant = true }: IBody): Promise<PartialPost> {
    const unique = await this.findOne(id);

    if (!unique) {
      throw new Error(`Невозможно обновить элемент с id: $ {id}, его нет в коллекции, используйте другой id`);
    }

    const modified: Response = await this.fetchData(
      id,
      'PATCH',
      JSON.stringify({
        name,
        info,
        isImportant,
      })
    );
    return await modified.json();
  }

  async deleteElement(id: string | null = null): Promise<number | boolean> {
    const data = await this.fetchData('', 'GET');
    const collection = await data.json();
    let lastId;

    if (id) {
      const findOne = collection.find((el) => el.id === id);
      if (!findOne) {
        throw new Error(`Невозможно удалить элемент с id: ${id}, его нет в коллекции, используйте другой id`);
      }

      lastId = id;
    } else {
      lastId = collection[collection.length - 2].id;
    }

    const response = await this.fetchData(lastId, 'DELETE');

    if (response.status >= 200 && response.status < 300) {
      return lastId;
    }

    return false;
  }
}
