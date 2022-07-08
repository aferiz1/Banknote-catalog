import { ICurrencyService } from "../service/CurrencyService";

export default class GetCurrenciesInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute() {
    const currencies = await this.currencyService.getCurrencies();
    return currencies;
  }
}
