import { ICurrencyService } from "../service/CurrencyService";

export default class DeleteCurrencyInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute(Delete: any) {
    return this.currencyService.deleteCurrency(Delete);
  }
}
