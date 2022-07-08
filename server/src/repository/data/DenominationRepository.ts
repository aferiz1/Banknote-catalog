import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";
import { TDenomination } from "../../model/denomination/Denomination";

export interface IDenominationRepository {
  findDenominationsForCurrency(currencyId: number): Promise<TDenomination[] | null>;
  editDenomination(EditObj: TDenomination): Promise<string>;
  addDenomination(AddObj: TDenomination): Promise<string>;
  deleteDenomination(id: number): Promise<string>;
}

const DenominationRepository = Repository(
  ({ port }: { port: IDataPort }): IDenominationRepository => {
    return {
      async findDenominationsForCurrency(currencyId: number) {
        return port.query(
          queries.denominations.findDenominationsForCurrency(currencyId)
        );
      },
      async editDenomination(EditObj: TDenomination) {
        return port.query(
          queries.denominations.editDenomination(EditObj)
        );
      },

      async addDenomination(AddObj: TDenomination) {
        return port.query(
          queries.denominations.addDenomination(AddObj)
        );
      },

      async deleteDenomination(id: number) {
        return port.query(
          queries.denominations.deleteDenomination(id)
        );
      },     
    };
  }
);

export default DenominationRepository;
