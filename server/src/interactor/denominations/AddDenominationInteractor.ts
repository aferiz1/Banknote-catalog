import { IDenominationService } from "../../service/denomination/DenominationService"; 

export default class AddDenominationInteractor {
  private denominationService: IDenominationService;

  constructor({ denominationService }: any) {
    this.denominationService = denominationService;
  }

  async execute(Add: any) {
    return this.denominationService.addDenomination(Add);
  }
}
