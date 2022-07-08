import * as Hapi from "hapi";
import GetDenominationListInteractor from "../../interactor/denominations/GetDenominationListInteractor";
import EditDenominationInteractor from "../../interactor/denominations/EditDenominationInteractor";
import AddDenominationInteractor from "../../interactor/denominations/AddDenominationInteractor";
import DeleteDenominationInteractor from "../../interactor/denominations/DeleteDenominationInteractor";
import Task from "../../runtime/Task";
import { TDenomination } from "../../model/denomination/Denomination";

export default class DenominationController {
  private task: Task;

  constructor({ task }: any) {
    this.task = task;
  }

  public async getDenominations(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      const currencyId = parseInt(request.params.currencyId, 10);
      return this.task.start<GetDenominationListInteractor>(
        "getDenominationList",
        (t) => t.execute(currencyId)
      );
    } catch (error) {
      return error as any;
    }
  }

  public async editDenominations(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      const id = parseInt(request.params.id,10);
      const denomination = request.payload as TDenomination;
      return this.task.start<EditDenominationInteractor>(
        "editDenomination",
        (t) => t.execute(Object.defineProperty(denomination, 'id', {
          value: parseInt(request.params.id,10)
        }))
      );
    } catch (error) {
      return error as any;
    }
  }

  public async addDenominations(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      const denomination = request.payload as TDenomination;
      return this.task.start<AddDenominationInteractor>(
        "addDenomination",
        (t) => t.execute(Object.defineProperty(denomination, 'currencyId', {
          value: parseInt(request.params.currencyId, 10)
        }))
      );
    } catch (error) {
      return error as any;
    }
  }

  public async deleteDenominations(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      return this.task.start<DeleteDenominationInteractor>(
        "deleteDenomination",
        (t) => t.execute(parseInt(request.params.id,10))
      );
    } catch (error) {
      return error as any;
    }
  }
}
