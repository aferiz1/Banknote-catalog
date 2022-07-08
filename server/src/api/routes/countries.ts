import * as Hapi from "hapi";
import IRouteArea from "../server/IRouteArea";
import CountryController from "../controller/CountryController";
import hapiAuthJwt2 = require("hapi-auth-jwt2");
import Joi = require("joi");

const CountryArea = ({ countryController }: any): IRouteArea => {
  let _controller = countryController as CountryController;
  return {
    registerRoutes(server: Hapi.Server) {
      server.bind(_controller);

      server.route({
        method: "GET",
        path: "/api/countries",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.getCountries
        }
      });
    }
  };
};

export default CountryArea;
