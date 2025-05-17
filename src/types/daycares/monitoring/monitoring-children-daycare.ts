export interface MonitoringChildrenDaycare {
  id: string;
  user_id: string;
  daycare_id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
  };
  daycare: {
    id: string;
    name: string;
  };
}
