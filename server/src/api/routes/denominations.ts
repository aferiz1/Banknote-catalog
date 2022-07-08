import * as Hapi from "hapi";
import IRouteArea from "../server/IRouteArea";
import DenominationController from "../controller/DenominationController";
import hapiAuthJwt2 = require("hapi-auth-jwt2");

const DenominationArea = ({ denominationController }: any): IRouteArea => {
  let _controller = denominationController as DenominationController;
  return {
    registerRoutes(server: Hapi.Server) {
      server.bind(_controller);

      server.route({
        method: "GET",
        path: "/api/currencies/{currencyId}/denominations",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.getDenominations
        }
      });

      server.route({
        method: "PUT",
        path: "/api/currencies/{currencyId}/denominations/{id}",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.editDenominations
        }
      });

      server.route({
        method: "POST",
        path: "/api/currencies/{currencyId}/denominations",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.addDenominations
        }
      });

      server.route({
        method: "DELETE",
        path: "/api/currencies/{currencyId}/denominations/{id}",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.deleteDenominations
        }
      });
    }
  };
};

export default DenominationArea;
