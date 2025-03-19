export interface Airport {
  _id: "5382147f-1cec-4d6a-8ed0-5bcf154f81e4";
  name: "Noi Bai International Airport";
  city: "Hanoi";
  country: "Vietnam";
}

export type Airports = Pick<Airport, "name" | "city" | "country">;
