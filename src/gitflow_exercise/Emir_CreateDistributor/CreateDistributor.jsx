import React, { useState } from "react";
import styled from "styled-components";
//import "./CreateDistributor.css";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const CreateDistributor = () => {
  const [formData, setFormData] = useState({
    photo: null,
    fullName: "",
    region: "",
    inn: "",
    address: "",
    actualAddress: "",
    passportSeries: "",
    passportNumber: "",
    issuedBy: "",
    issueDate: "",
    validity: "",
    contactNumber1: "",
    contactNumber2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
  };

  const handleSave = () => {
    // Здесь отправьте данные formData на сервер через API
  };

  return (
    <div>
      <h2>Создать дистрибьютора</h2>
      <Form>
        <label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        <div className="formBlock">
          <div className="qw">
            ФИО
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Иванов Иван Иванович"
              required
            />
          </div>
          <div className="qw">
            Фактическое место жительства
            <Input
              type="text"
              name="actualAddress"
              value={formData.actualAddress}
              onChange={handleInputChange}
              placeholder="Пример: обл. Чуй, рай. Сокулук, с. Село, "
              required
            />
          </div>

          <div className="qw">
            Адрес по прописке
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Пример: обл. Чуй, рай. Сокулук, с. Село, "
              required
            />
          </div>

          <div className="er">
            Регион
            <Input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              placeholder="Например: Чуй"
              required
            />
          </div>

          <div className="er">
            ИНН
            <Input
              type="text"
              name="inn"
              value={formData.inn}
              onChange={handleInputChange}
              placeholder="0000000000"
              required
            />
          </div>

          <div className="ty">
            Номер паспорта
            <Input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              placeholder="000000"
              required
            />
          </div>

          <div className="ty">
            Серия паспорта
            <Input
              type="text"
              name="passportSeries"
              value={formData.passportSeries}
              onChange={handleInputChange}
              placeholder="000000"
              required
            />
          </div>

          <div className="ty">
            Орган выдачи
            <Input
              type="text"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleInputChange}
              placeholder="000000"
              required
            />
          </div>
          <div className="ty">
            Дата выдачи
            <Input
              type="text"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              placeholder="000000"
              required
            />
          </div>

          <div className="ty">
            Срок действия
            <Input
              type="text"
              name="validity"
              value={formData.validity}
              onChange={handleInputChange}
              placeholder="0000000"
              required
            />
          </div>

          <div className="ui">
            Контактный номер №1
            <Input
              type="text"
              name="contactNumber1"
              value={formData.contactNumber1}
              onChange={handleInputChange}
              placeholder="+996 "
              required
            />
          </div>
          <div className="ui">
            Контактный номер №2
            <Input
              type="text"
              name="contactNumber2"
              value={formData.contactNumber2}
              onChange={handleInputChange}
              placeholder="+996"
              required
            />
          </div>
        </div>
        <button className="saveButton" onClick={handleSave}>
          Сохранить
        </button>
        <button className="remove">Удалить</button>
      </Form>
    </div>
  );
};

export default CreateDistributor;
