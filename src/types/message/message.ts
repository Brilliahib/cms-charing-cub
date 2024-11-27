import { Auth } from "../auth/auth";

export interface ChatRoom {
  id: number;
  opponent: Auth;
  last_chat: string;
  last_chat_created_at: Date;
}

export interface Message {
  id: number;
  chat_room_id: number;
  user_id: number;
  message: string;
  created_at: Date;
  user: Auth;
}
