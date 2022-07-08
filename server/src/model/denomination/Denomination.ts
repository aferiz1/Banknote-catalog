import Model from "../Model";

export interface TDenomination {
  id: number;
  currencyId: number;
  amount: number;
  description?: string;
  valid: boolean;
  currencyName: string;

  dateCreated: Date;
  userCreated: string;
  dateModified?: Date;
  userModified?: string;
}

const Denomination = Model(
  (user: TDenomination = <TDenomination>{}): TDenomination => {
    const _denomination = Object.assign(<TDenomination>{}, user);
    return {
      get id() {
        return _denomination.id;
      },
      get currencyId() {
        return _denomination.currencyId;
      },
      get amount() {
        return _denomination.amount;
      },
      get description() {
        return _denomination.description;
      },
      get valid() {
        return _denomination.valid;
      },
      get currencyName() {
        return _denomination.currencyName;
      },
      get dateCreated() {
        return _denomination.dateCreated;
      },
      get userCreated() {
        return _denomination.userCreated;
      },
      get dateModified() {
        return _denomination.dateModified;
      },
      get userModified() {
        return _denomination.userModified;
      }
    };
  }
);

export default Denomination;
