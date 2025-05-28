import { Auth } from "../auth/auth";

export interface Feedback {
  id: string;
  user_id: string;
  rate: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user: Auth;
}
