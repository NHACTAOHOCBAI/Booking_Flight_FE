export interface Flight {
  id: string;
}
export type Flights = Pick<Flight, "id">;
