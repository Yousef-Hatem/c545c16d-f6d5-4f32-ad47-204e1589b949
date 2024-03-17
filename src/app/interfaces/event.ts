export interface Event {
  _id: string;
  title: string;
  flyerFront: string;
  startTime: string;
  endTime: string;
  venue: {
    name: string;
    direction: string;
  };
  priority: boolean | undefined;
  date: string;
}
export interface EventsPackage {
  time: number;
  date: string;
  events: Event[];
}
