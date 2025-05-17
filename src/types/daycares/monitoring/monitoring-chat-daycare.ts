export interface MonitoringChatDaycare {
  id: string;
  message: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    profile: string;
  };
}
