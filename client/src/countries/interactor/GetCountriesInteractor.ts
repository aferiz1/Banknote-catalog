import Application from "../../Application";
import { ICountryService } from "../service/CountryService";

export default class GetCountriesInteractor {
  private application: Application;
  private CountryService: ICountryService;

  constructor({ application, CountryService }: any) {
    this.application = application;
    this.CountryService = CountryService;
  }

  async execute() {
    const countries = await this.CountryService.getCountries();
    return countries;
  }
}
