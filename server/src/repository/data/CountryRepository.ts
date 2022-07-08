import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";

export interface ICountryRepository {
  findAllCountries(): Promise<any>;
}

const CurrencyRepository = Repository(
  ({ port }: { port: IDataPort }): ICountryRepository => {
    return {
      async findAllCountries() {
        return port.query(queries.countries.findAllCountries);
      }
    };
  }
);

export default CurrencyRepository;
