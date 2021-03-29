export default interface Account {
  name: string;
  currency: string;
  accountId: string;
  balance: number;
  hasMinimum: boolean;
  minimum: number;
}
