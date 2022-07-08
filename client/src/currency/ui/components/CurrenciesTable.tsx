import React, { useContext, useState, useEffect, useRef } from "react";
import ICurrency from "../../model/currency/Currency";
import { Table, Input, Button, Popconfirm, Form, Modal } from "antd";
import CurrencyAddModal from "./CurrencyAddModal";
import CurrencyEditDeleteModal from "./CurrencyEditDeleteModal";

const columns = [
  {
    title: "Valuta",
    dataIndex: "code",
    width: "30%",
    id: "code"
  },
  {
    title: "Naziv",
    dataIndex: "name",
    id: "name"
  },
  {
    title: "Država",
    dataIndex: "country",
    width: "40%",
    id: "country"
  }
];

const CurrenciesTable = ({
  currencies,
  deleteCurrency,
  editCurrency,
  addCurrency,
  countries,
  refreshCurrencies
}) => {
  const countriesList = countries.map((country) => {
    return {
      label: country.name,
      key: country.id
    };
  });
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currency, setCurrency] = useState({
    id: 0,
    name: "",
    code: 0,
    countryName: "",
    description: ""
  });
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);

  const dataSource = currencies.map((currency) => {
    return { ...currency, key: currency.id };
  });

  const columns = [
    {
      title: "Valuta",
      dataIndex: "code",
      id: 0
    },
    {
      title: "Naziv",
      dataIndex: "name",
      id: 1
    },
    {
      title: "Drzava",
      dataIndex: "country",
      id: 2
    },
    {
      title: "Operation",
      dataIndex: "operation",
      id: 3,
      render: (_, record) => (
        <div>
          <Button
            type='primary'
            style={{
              backgroundColor: "#fff",
              color: "#071e26",
              border: "none",
              margin: "10px"
            }}
            onClick={() => showEditModal(record)}
          >
            Izmjeni
          </Button>
          <Button
            type='primary'
            style={{
              backgroundColor: "#fff",
              color: "#071e26",
              border: "none",
              margin: "10px"
            }}
            onClick={() => showDeleteModal(record)}
          >
            Obrisi
          </Button>
        </div>
      )
    }
  ];

  const showEditModal = ({ id, code, name, country, description }) => {
    setSelectedCountry(country);
    setCurrency({
      id,
      name,
      code,
      countryName: country,
      description
    });

    setIsEditModalVisible(true);
  };

  const showDeleteModal = ({ id, code, name, country, description }) => {
    setCurrency({
      id,
      name,
      code,
      countryName: country,
      description
    });

    setSelectedCountry(country);

    setIsDeleteModalVisible(true);
  };

  const showAddModal = () => {
    setCurrency({
      id: 0,
      name: "",
      code: 0,
      countryName: "",
      description: ""
    });
    setSelectedCountry("");
    setIsAddModalVisible(true);
  };

  const handleAddModalOk = async () => {
    await addCurrency(currency);
    setIsAddModalVisible(false);
    await refreshCurrencies();
  };

  const handleEditModalOk = async () => {
    await editCurrency(currency);
    setIsEditModalVisible(false);
    await refreshCurrencies();
  };

  const handleDeleteModalOk = async () => {
    await deleteCurrency(currency.id);
    setIsDeleteModalVisible(false);
    await refreshCurrencies();
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  return (
    <>
      <Button
        type='primary'
        style={{
          backgroundColor: "#2596be",
          border: "none",
          margin: "10px"
        }}
        onClick={() => showAddModal()}
      >
        Dodaj valutu
      </Button>
      <Table columns={columns} dataSource={dataSource} />

      <CurrencyAddModal
        handleCancel={handleAddCancel}
        isAddModalVisible={isAddModalVisible}
        handleAddOk={handleAddModalOk}
        currency={currency}
        setCurrency={setCurrency}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={countriesList}
        actionName={"Dodaj valutu"}
      />

      <CurrencyEditDeleteModal
        handleCancel={handleEditCancel}
        isEditDeleteModalVisible={isEditModalVisible}
        handleEditDeleteModalOk={handleEditModalOk}
        currency={currency}
        setCurrency={setCurrency}
        countries={countriesList}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        actionName={"Izmjeni valutu"}
      />

      <CurrencyEditDeleteModal
        handleCancel={handleDeleteCancel}
        isEditDeleteModalVisible={isDeleteModalVisible}
        handleEditDeleteModalOk={handleDeleteModalOk}
        currency={currency}
        setCurrency={setCurrency}
        countries={countriesList}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        actionName={"Obrisi valutu"}
      />
    </>
  );
};

export default CurrenciesTable;
