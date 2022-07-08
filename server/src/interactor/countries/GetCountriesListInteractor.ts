import { ICountryService } from "../../service/country/CountryService";

export default class GetCountryListInteractor {
  private countryService: ICountryService;

  constructor({ countryService }: any) {
    this.countryService = countryService;
  }

  async execute() {
    return this.countryService.findAllCountries();
  }
}
