export interface Point {
  name: string;
  image: string | null;
  email: string | null;
  whatsapp: string;
  city: string;
  uf: string;
  pointItems: PointItems[];
  neighborhoods: Neighborhood[];
  userId: string;
}

interface Neighborhood {
  name: string;
  latitude: number;
  longitude: number;
  daysOfWeek: string[];
  pointId: string;
}

export interface Item {
  id: string;
  image: string;
  title: string;
  pointItems: PointItems[];
}

export interface PointItems {
  point_id: string;
  item_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
