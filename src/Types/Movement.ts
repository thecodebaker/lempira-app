export default interface Movement {
  accountId: string;
  accountName?: string;
  amount: number;
  isIncome: boolean;
  current: number;
  currency?: string;
  movementId: string;
  createdAt: string;
  note: string;
}
