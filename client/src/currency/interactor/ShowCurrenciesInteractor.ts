import Application from "../../Application";
import CurrencyPresenter, {
  ICurrencyPresenter
} from "../presenter/CurrencyPresenter";
import { ICurrencyService } from "../service/CurrencyService";
import { ICountryService } from "../../countries/service/CountryService";

export default class ShowCurrenciesInteractor {
  private application: Application;
  private output?: ICurrencyPresenter;
  private currencyService: ICurrencyService;
  private countryService: ICountryService;

  constructor({ application, currencyService, countryService }: any) {
    this.application = application;
    this.currencyService = currencyService;
    this.countryService = countryService;
  }

  execute() {
    this.output = CurrencyPresenter({
      application: this.application,
      initialState: { currencies: [], countries: [] }
    });
    this.currencyService.getCurrencies().then(this.output.loadCurrencies);
    this.countryService.getCountries().then(this.output.loadCountries);
    return this.output;
  }
}
