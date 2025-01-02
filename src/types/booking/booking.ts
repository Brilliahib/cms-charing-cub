import { Auth } from "../auth/auth";
import { Nannies } from "../cub/cub";
import { DayCare } from "../daycares/daycare";

export interface BookingNannies {
  id: number;
  user_id: number;
  nanny_id: number;
  name_babies: string;
  age_babies: number;
  special_request: string;
  start_time: string;
  end_time: string;
  is_approved: number;
  is_paid: number;
  payment_proof: string | null;
  created_at: string;
  updated_at: string;
  nannies: Nannies | null;
  user: Auth;
}

export interface BookingDaycare {
  id: number;
  user_id: number;
  daycare_id: number;
  name_babies: string;
  age_babies: number;
  special_request: string;
  start_time: string;
  end_time: string;
  is_approved: number;
  is_paid: number;
  payment_proof: string | null;
  created_at: string;
  updated_at: string;
  daycares: DayCare | null;
  user: Auth;
}
