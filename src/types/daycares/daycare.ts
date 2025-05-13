import { Auth } from "../auth/auth";
import { Nannies } from "../cub/cub";

export interface DayCare {
  id: number;
  name: string;
  images: string;
  description: string;
  location: string;
  location_tracking: string;
  address: string;
  opening_hours: Date;
  closing_hours: Date;
  opening_days: string;
  phone_number: string;
  rating: number;
  distance: number;
  reviewers_count: number;
  price_half: number;
  price_full: number;
  is_disability: boolean;
  bank_account: string;
  bank_account_name: string;
  bank_account_number: string;
  longitude: number;
  latitude: number;
  facility_images: FacilityImages[];
  nannies: Nannies[];
  price_lists: PriceListDaycare[];
  created_at: Date;
  updated_at: Date;
}

export interface FacilityImages {
  id: number;
  daycare_id: number;
  image_url: string;
}

export interface PriceListDaycare {
  id: string;
  daycare_id: string;
  age_start: string;
  age_end: string;
  price: number;
  name: string;
}

export interface DaycareReviews {
  id: number;
  daycare_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: Date;
  user: Auth;
}

export interface DayCareDetail {
  id: number;
  name: string;
  images: string;
  description: string;
  location: string;
  location_tracking: string;
  address: string;
  opening_hours: Date;
  closing_hours: Date;
  opening_days: string;
  phone_number: string;
  rating: number;
  reviewers_count: number;
  price_half: number;
  price_full: number;
  is_disability: Boolean;
  bank_account: string;
  bank_account_name: string;
  bank_account_number: string;
  longitude: number;
  latitude: number;
  facility_images: FacilityImages[];
  nannies: NanniesDaycare[];
  reviews: DaycareReviews[];
  price_lists: PriceListDaycare[];
}

export interface NanniesDaycare {
  id: number;
  name: string;
  daycare_name: string;
  daycare_profile: string;
  daycare_location: string;
  images: string;
  gender: string;
  age: number;
  contact: string;
  price_half: number;
  price_full: number;
  experience_description: string;
  user: Auth;
}
