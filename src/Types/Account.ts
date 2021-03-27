import Movement from './Movement';

export default interface Account {
  name: string;
  currency: string;
  accountId: string;
  movement: Movement;
}
