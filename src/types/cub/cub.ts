import { Auth } from "../auth/auth";
import { DayCare, DaycareReviews } from "../daycares/daycare";

export interface Nannies {
  id: string;
  name: string;
  rating: number;
  rating_count: number;
  images: string;
  gender: string;
  age: number;
  contact: string;
  price_half: number;
  price_full: number;
  experience_description: string;
  daycare_id: string;
  daycare_name: string;
  daycare_profile: string;
  daycare_location: string;
  daycare_latitude: number;
  daycare_longitude: number;
  daycare_bank: string;
  daycare_bank_name: string;
  daycare_bank_number: string;
  created_at: Date;
  user: Auth;
  reviews: NanniesDaycareReview[];
  daycare?: DayCare;
  price_lists: NanniesPriceList[];
}

export interface NanniesDaycareReview {
  id: string;
  daycare_id: number;
  user_id: number;
  rating: number;
  comment: string;
  name: string;
  created_at: Date;
}

export interface NanniesPriceList {
  id: string;
  nanny_id: string;
  age_start: string;
  age_end: string;
  name: string;
  price: number;
}
