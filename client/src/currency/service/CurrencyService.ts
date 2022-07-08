import { IHttpService } from "../../core/service/HttpService";
import Currency, { ICurrency } from "../model/currency/Currency";

export interface ICurrencyService {
  getCurrencies(): Promise<ICurrency[]>;
  deleteCurrency(id);
  editCurrency(currency: ICurrency);
  addCurrency(currency: ICurrency);
}

const CurrencyService = ({ httpService }): ICurrencyService => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/api/currencies";
  const _deleteUrl = "/api/currencies";
  const _editUrl = "/api/currencies";

  function mapCurrencies(json: any) {
    return json.map((currency) => {
      return Currency(currency);
    });
  }
  return {
    async getCurrencies() {
      const path = _http.buildPath(_baseUrl);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return mapCurrencies(responseJSON);
    },

    async deleteCurrency(id) {
      const path = _http.buildPath(_deleteUrl, id);
      await _http.remove(path);
    },

    async editCurrency(currency: ICurrency) {
      const path = _http.buildPath(_editUrl, currency.id.toString());
      _http.put(path, {
        params: currency
      });
    },

    async addCurrency(currency) {
      const path = _http.buildPath("/api/currencies");
      await _http.post(path, {
        params: currency
      });
    }
  };
};
export default CurrencyService;
