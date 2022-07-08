import * as Hapi from "hapi";
import GetCountryListInteractor from "../../interactor/countries/GetCountriesListInteractor";
import Task from "../../runtime/Task";

export default class CountryController {
  private task: Task;

  constructor({ task }: any) {
    this.task = task;
  }

  public async getCountries(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      return this.task.start<GetCountryListInteractor>(
        "getCountriesList",
        (t) => t.execute()
      );
    } catch (error) {
      return error as any;
    }
  }
}
