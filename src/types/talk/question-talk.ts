import { Auth } from "../auth/auth";

export interface QuestionTalk {
  id: string;
  user_id: string;
  question_title: string;
  question_detail: string;
  created_at: Date;
  user: Auth;
  talk_answers: QuestionAnswer[];
}

interface QuestionAnswer {
  id: string;
  talk_id: string;
  user_id: string;
  answer: string;
  created_at: Date;
  user: Auth;
}
