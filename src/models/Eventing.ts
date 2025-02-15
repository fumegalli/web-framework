type Callback = () => void;

export class Eventing {
  events: { [name: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    
    const handlers = this.events[eventName] || [];

    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (handlers?.length) {
      handlers.forEach(callback => callback());
    }
  }
}