import { IDenominationService } from "../../service/denomination/DenominationService";

export default class DeleteDenominationInteractor {
  private denominationService: IDenominationService;

  constructor({ denominationService }: any) {
    this.denominationService = denominationService;
  }

  async execute(Delete: any) {
    return this.denominationService.deleteDenomination(Delete);
  }
}
