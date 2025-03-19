export interface Seat {
  _id: "HG01";
  name: "Economy Class";
  price: 100;
  description: "Basic seating with standard amenities.";
}
export type Seats = Pick<Seat, "name" | "price" | "description">;
