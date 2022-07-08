import Service from "../Service";
import { IDenominationRepository } from "../../repository/data/DenominationRepository";
import Denomination, {
  TDenomination
} from "../../model/denomination/Denomination";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface IDenominationService {
  findDenominationsForCurrency(id: number): Promise<TDenomination[] | null>;
  editDenomination(EditObj: TDenomination): Promise<any>; 
  addDenomination(AddObj: TDenomination): Promise<any>;
  deleteDenomination(id: number): Promise<any>;
}

const DenominationService = Service(
  ({
    denominationRepository,
    config
  }: {
    denominationRepository: IDenominationRepository;
    config: IConfiguration;
  }): IDenominationService => {
    const extract = extractResultSetValues;
    return {
      async findDenominationsForCurrency(denominationId: number) {
        const result =
          await denominationRepository.findDenominationsForCurrency(denominationId);
        if (result) {
          return result.map((item: any) => {
            try {
              let model = extract<TDenomination>(item, [
                "id",
                "denominationId",
                "amount",
                "description",
              ]);

              return Denomination(model);
            } catch (error) {
              throw error;
            }
          });
        } else {
          return null;
        }
      },

      async editDenomination(EditObj: TDenomination) {
          const result = await denominationRepository.editDenomination(EditObj);
          if(result) {
            return {message: "Denominacija je uspješno izmijenjena."}; 
          }
          else {
            return null;
          }
      },

      async addDenomination(AddObj: TDenomination) {
        const result = await denominationRepository.addDenomination(AddObj);
        if (result) {
          return {message: "Denominacija je uspješno dodana."};
        } else {
          return null;
        }
      },

      async deleteDenomination(id: number) {
        const result = await denominationRepository.deleteDenomination(id);
          if(result) {
            return {message: "Denominacija je uspješno izbrisana."};
          }
          else {
            return null;
          }
      },
    };
  }
);

export default DenominationService;
