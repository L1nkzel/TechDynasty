import { Request } from "express"
import { Document } from "mongoose";

export interface UserTypes extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    matchPassword: (passwordToCheck: string) => Promise<boolean>;
}
export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string; 
}

export interface Product extends Document {
  user: string; 
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  reviews: Review[];
  rating: number;
  numReviews: number;
  likes: boolean;
  dislikes: boolean;
}

export interface UserAuthInfoRequest extends Request {
  user: UserTypes;
}