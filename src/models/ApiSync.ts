import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public baseUrl: string) {}

  fetch(id: number): AxiosPromise<T> {
    return axios.get(`${this.baseUrl}/${id}`);
  }

  save(data: T): AxiosPromise<T> {
    const { id } = data;

    if (id) {
      return axios.put(`${this.baseUrl}/${id}`, data);
    }

    return axios.post(this.baseUrl, data);
  }
}
