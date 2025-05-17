import { Nannies } from "../cub/cub";
import { DayCare } from "../daycares/daycare";

export interface Auth {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
  nannies: Nannies;
  daycare: DayCare;
  created_at: Date;
  updated_at: Date;
}
