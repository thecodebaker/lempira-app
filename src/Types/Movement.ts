export default interface Movement {
  accountId: string;
  accountName?: string;
  accountPrev: number;
  amount: number;
  isIncome: boolean;
  current: number;
  currency?: string;
  movementId: string;
  name: string;
}
