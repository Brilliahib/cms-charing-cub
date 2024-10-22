export interface DayCare {
  id: number;
  name: string;
  images: string;
  description: string;
  opening_hours: Date;
  closing_hours: Date;
  opening_days: string;
  phone_number: string;
  rating: number;
  reviewers_count: number;
  facility_images: FacilityImages[];
}

export interface FacilityImages {
  id: number;
  daycare_id: number;
  image_url: string;
}
