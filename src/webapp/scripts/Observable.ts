
export type EventCallback = () => void;

export class Observable {
  private events: { 
    [key: string]: EventCallback[] 
  } = {};

  on(type: string, cb: EventCallback) {
    this.events[type] || (this.events[type] = []);
    this.events[type].push(cb);
  }

  dispatch(type: string) {
    this.events[type] && this.events[type].forEach(e => e());
  }
}