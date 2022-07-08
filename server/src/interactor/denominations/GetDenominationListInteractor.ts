import { IDenominationService } from "../../service/denomination/DenominationService";

export default class GetDenominationListInteractor {
  private denominationService: IDenominationService;

  constructor({ denominationService }: any) {
    this.denominationService = denominationService;
  }

  async execute(currencyId: number) {
    return this.denominationService.findDenominationsForCurrency(currencyId);
  }
}
