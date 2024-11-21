
export interface PostPage {
    postDetails: PostDetail; 
    images: ImageGallery; 
    petInfo: PetStatus & PetCharacteristics; 
    eventDescription: EventDescription; 
    location: LocationInfo; 
  }
  
  export interface PostDetail {
  postId: string;
  owner: string;
  date: string;
}
export interface ImageGallery {
  mainImage: string;
  thumbnails: string[];
}

export interface PetStatus {
  name: string;
  status: 'lost' | 'adoption' |'perdida' ;
}

export interface PetCharacteristics {
  sex: 'macho' | 'hembra';
  age: string;
  breed: string;
}

export interface EventDescription {
  description: string;
  reward?: number;
}

export interface LocationInfo {
  state: string;
  municipality: string;
  neighborhood: string;
  lastSeen: string;
}
