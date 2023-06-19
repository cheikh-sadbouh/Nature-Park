export interface ParkAnimal {
    _id:string;
    name: string;
    picture: string;
    description: string;
  }
  
 export interface Park {
    _id:string;
    parkName: string;
    country: string;
    picture: string;
    parkAnimals: ParkAnimal[];
  }
  