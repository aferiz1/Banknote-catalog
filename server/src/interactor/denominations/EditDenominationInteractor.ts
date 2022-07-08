import { IDenominationService } from "../../service/denomination/DenominationService";

export default class EditDenominationInteractor {
  private denominationService: IDenominationService;

  constructor({ denominationService }: any) {
    this.denominationService = denominationService;
  }

  async execute(Edit: any) {
    return this.denominationService.editDenomination(Edit);
  }
}
