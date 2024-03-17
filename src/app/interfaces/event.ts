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
  date: string;
}
