export interface IncomeSummary {
  total_income: string;
  daily_income: DailyIncome[];
  range: string;
  start_date: Date;
  end_date: Date;
}

export interface DailyIncome {
  date: Date;
  total: string;
}
