export interface Point {
  name: string;
  image: string | null;
  email: string | null;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  pointItems: PointItems[];
  neighborhoods: Neighborhood[];
  userId: string;
}

interface Neighborhood {
  name: string;
  frequency?: string | null;
  latitude: number;
  longitude: number;
  daysOfWeek: string;
  pointId: string;
}

interface Item {
  id: string;
  image: string;
  title: string;
  pointItems: PointItems[];
}

export interface PointItems {
  point_id: string;
  item_id: string;
}

// interface PointNeighborhood {
//   id: string;
//   point_id: string;
//   neighborhood_id: string;
//   point: Point;
//   neighborhood: Neighborhood;
// }
