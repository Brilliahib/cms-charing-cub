import { Auth } from "../auth/auth";
import { DaycareReviews } from "../daycares/daycare";

export interface Nannies {
  id: number;
  name: string;
  daycare_id: number;
  daycare_name: string;
  daycare_profile: string;
  daycare_location: string;
  daycare_latitude: number;
  daycare_longitude: number;
  rating: number;
  rating_count: number;
  images: string;
  gender: string;
  age: number;
  contact: string;
  price_half: number;
  price_full: number;
  experience_description: string;
  created_at: Date;
  user: Auth;
  reviews: NanniesDaycareReview[];
}

export interface NanniesDaycareReview {
  id: number;
  daycare_id: number;
  user_id: number;
  rating: number;
  comment: string;
  name: string;
  created_at: Date;
}
