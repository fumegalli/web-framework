import { AxiosPromise } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>,
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);

    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw Error('Cannot fetch without an id');
    }

    const { data } = await this.sync.fetch(id);

    this.set(data);
  }

  async save(): Promise<void> {
    const user = this.attributes.getAll();

    try {
      await this.sync.save(user);

      this.events.trigger('save');
    } catch (_) {
      this.events.trigger('error');
    }
  }
}
