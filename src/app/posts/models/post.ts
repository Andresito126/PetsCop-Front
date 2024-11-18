import { Pet } from "./pet";

export interface Post {
    user: string;
    date: string;
    time:string;
    location: string;
    pet: Pet;
    description: string;
    images: string[];
  }