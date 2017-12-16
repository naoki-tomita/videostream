
export type EventCallback = (...params: any[]) => void;

export class Observable {
  private events: { 
    [key: string]: EventCallback[] 
  } = {};

  on(type: string, cb: EventCallback) {
    this.events[type] || (this.events[type] = []);
    this.events[type].push(cb);
  }

  dispatch(type: string, params?: any[]) {
    this.events[type] && this.events[type].forEach(e => e(...params));
  }
}