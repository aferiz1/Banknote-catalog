import Service from "../Service";
import { ICountryRepository } from "../../repository/data/CountryRepository";
import Country, { TCountry } from "../../model/country/Country";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface ICountryService {
  findAllCountries(): Promise<TCountry>;
}

const CountryService = Service(
  ({
    countryRepository,
    config
  }: {
    countryRepository: ICountryRepository;
    config: IConfiguration;
  }): ICountryService => {
    const extract = extractResultSetValues;
    return {
      async findAllCountries() {
        const result = await countryRepository.findAllCountries();
        if (result) {
          return result.map((item: any) => {
            try {
              let model = extract<TCountry>(item, [
                "id",
                "code",
                "name",
                "description"
              ]);

              return Country(model);
            } catch (error) {
              throw error;
            }
          });
        } else {
          return null;
        }
      }
    };
  }
);

export default CountryService;
