import withStore, {
  TLoadingAwarePresenter,
  TPresentable
} from "../../core/presenter/withStore";
import Application from "../../Application";
import { ICurrency } from "../model/currency/Currency";
import DeleteCurrencyInteractor from "../interactor/DeleteCurrencyInteractor";
import AddCurrencyInteractor from "../interactor/AddCurrencyInteractor";
import EditCurrencyInteractor from "../interactor/EditCurrencyInteractor";
import RefreshCurrenciesInteractor from "../interactor/GetCurrenciesInteractor";
import { ICountry } from "../../countries/model/country/Country";

export interface TCurrencyPresenter extends TLoadingAwarePresenter {
  currencies: ICurrency[];
  countries: ICountry[];
}

export interface ICurrencyPresenter extends TCurrencyPresenter, TPresentable {
  loadCurrencies(currencies: ICurrency[]): void;
  loadCountries(countries: ICountry[]): void;
  deleteCurrency(id: number): void;
  editCurrency(currency);
  addCurrency(currency);
  refreshCurrencies();
}

const defaultState: TCurrencyPresenter = {
  currencies: [],
  countries: []
};

const CurrencyPresenter = withStore<ICurrencyPresenter, TCurrencyPresenter>(
  ({ application, store, loader, translate }): ICurrencyPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TCurrencyPresenter>();

    loader.start("currencyLoader");

    const loadCurrencies = (currencies: ICurrency[]) => {
      _store.update({
        currencies
      });
      loader.stop("currencyLoader");
    };

    loader.start("countryLoader");

    const loadCountries = (countries: ICountry[]) => {
      _store.update({
        countries
      });
      loader.stop("countryLoader");
    };

    const deleteCurrency = async (id: number) => {
      await _application.container
        .resolve<DeleteCurrencyInteractor>("deleteCurrency")
        .execute(id);
    };

    const editCurrency = async (currency: ICurrency) => {
      await _application.container
        .resolve<EditCurrencyInteractor>("editCurrency")
        .execute(currency);
    };

    const addCurrency = async (currency: ICurrency) => {
      await _application.container
        .resolve<AddCurrencyInteractor>("addCurrency")
        .execute(currency);
    };

    const refreshCurrencies = async () => {
      loader.start("currencyLoader");
      try {
        const currencies = await _application.container
          .resolve<RefreshCurrenciesInteractor>("refreshCurrencies")
          .execute();
        _store.update({
          currencies
        });
        loader.stop("currencyLoader");
      } catch (error) {
        throw error;
      }
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      loadCurrencies,
      loadCountries,
      deleteCurrency,
      editCurrency,
      addCurrency,
      refreshCurrencies
    };
  },
  defaultState
);

export default CurrencyPresenter;
