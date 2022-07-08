import Model from "../Model";

export interface TCountry {
  id: number;
  code: number;
  name: string;
  description: string;
}

export interface ICountry extends TCountry {}

const Country = Model((model: TCountry): ICountry => {
  const _value: TCountry = Object.assign({}, model);

  return {
    get id() {
      return _value.id;
    },
    set id(id) {
      _value.id = id;
    },
    get code() {
      return _value.code;
    },
    set code(code) {
      _value.code = code;
    },
    get name() {
      return _value.name;
    },
    set name(name) {
      _value.name = name;
    },
    get description() {
      return _value.description;
    },
    set description(description) {
      _value.description = description;
    }
  };
});

export default Country;
