import { Nannies } from "../cub/cub";
import { DayCare } from "../daycares/daycare";

export interface Auth {
  id: number;
  name: string;
  email: string;
  role: string;
  profile: string;
  nannies: Nannies;
  daycare: DayCare;
}
