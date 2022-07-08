import { IHttpService } from "../../core/service/HttpService";
import Country, { ICountry } from "../model/country/Country";

export interface ICountryService {
  getCountries(): Promise<ICountry[]>;
}

const CountryService = ({ httpService }): ICountryService => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/api/countries";
  return {
    async getCountries() {
      const path = _http.buildPath(_baseUrl);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return responseJSON;
    }
  };
};
export default CountryService;
