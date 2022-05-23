export interface IGallery {
  name: string;
  images: string[];
}

export interface IPlace {
  idPlace: number;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  manager?: string;
  price: number;
  rating: number;
  placeType: string;
  location: string;
  description: string;
  galleries: IGallery[];
}