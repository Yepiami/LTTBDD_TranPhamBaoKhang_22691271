export class Account {
  public id: string;
  private _balance: number;
  readonly createdAt: Date;

  constructor(id: string, balance: number) {
    this.id = id;
    this._balance = balance;
    this.createdAt = new Date();
  }
}