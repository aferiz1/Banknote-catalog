import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Modal,
  Space,
  Form,
  Input,
  Button,
  Radio,
  Dropdown,
  Menu,
  message
} from "antd";

const CurrencyAddModal = ({
  handleCancel,
  isAddModalVisible,
  handleAddOk,
  currency,
  setCurrency,
  selectedCountry,
  setSelectedCountry,
  countries,
  actionName
}) => {
  const handleMenuClick = (e) => {
    const selected = countries.map((c) => {
      if (c.key == e.key) {
        setSelectedCountry(c.label);
        setCurrency({ ...currency, countryName: c.label });
      }
    });
  };
  const menu = <Menu onClick={handleMenuClick} items={countries} />;

  return (
    <>
      <Modal
        title={actionName}
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label='Valuta'>
            <Input
              placeholder='Kod valute...'
              value={currency.code}
              onChange={(e) =>
                setCurrency({ ...currency, code: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label='Naziv'>
            <Input
              placeholder='Naziv valute...'
              value={currency.name}
              onChange={(e) =>
                setCurrency({ ...currency, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label='Drzava'>
            <Dropdown overlay={menu}>
              <Button>
                <Space>
                  {selectedCountry}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item label='Opis'>
            <Input
              placeholder='Opis valute...'
              value={currency.description}
              onChange={(e) =>
                setCurrency({ ...currency, description: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CurrencyAddModal;
