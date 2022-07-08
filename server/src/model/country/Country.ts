import Model from "../Model";

export interface TCountry {
  id: number;
  code: string;
  name: string;
  description?: string;

  dateCreated: Date;
  userCreated?: string;
  dateModified?: Date;
  userModified?: string;
}

const Country = Model((user: TCountry = <TCountry>{}): TCountry => {
  const _country = Object.assign(<TCountry>{}, user);
  return {
    get id() {
      return _country.id;
    },
    get code() {
      return _country.code;
    },
    get name() {
      return _country.name;
    },
    get description() {
      return _country.description;
    },
    get dateCreated() {
      return _country.dateCreated;
    },
    get dateModified() {
      return _country.dateModified;
    },
    get userModified() {
      return _country.userModified;
    }
  };
});

export default Country;
