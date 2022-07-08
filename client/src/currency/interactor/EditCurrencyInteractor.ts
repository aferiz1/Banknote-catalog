import { ICurrency } from "../model/currency/Currency";
import { ICurrencyService } from "../service/CurrencyService";

export default class EditCurrencyInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute(currency: ICurrency) {
    return this.currencyService.editCurrency(currency);
  }
}
