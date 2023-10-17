import React from 'react';
import './EditProduct.css';

const EditProduct = () => {
  return (
    <div className="header">
      <div className="rectangle-1905"></div>
      <div className="logo-colos">
        <div className="logo">
          {/* Your logo elements */}
        </div>
        <div className="colos">Колос</div>
      </div>
      <div className="warehouse">
        <div className="sklad">Склад</div>
      </div>
      <div className="distributor">
        <div className="distrib">Дистрибьютор</div>
      </div>
      <div className="cancel-button">
        <button className="back">
          <span className="fi-sr-angle-small-left"></span>
          <span className="cancel-text">Отменить</span>
          <div className="create-product">Создать товар</div>
        </button>
      </div>
      <div className="cube">
        <div className="input-field">
          <input
            type="text"
            className="input"
            placeholder="Пиво"
          />
        </div>
        <div className="input-field" style={{ left: "536px" }}>
          <input
            type="text"
            className="input"
            placeholder="Идентификационный номер"
          />
        </div>
        <div className="input-field" style={{ width: "160px", height: "60px", left: "404px", top: "250px" }}>
          <input
            type="text"
            className="input"
            placeholder="Количество"
          />
        </div>
        <div className="input-field" style={{ width: "160px", height: "60px", left: "607px", top: "250px" }}>
          <input
            type="text"
            className="input"
            placeholder="Цена"
          />
        </div>
        <div className="input-field" style={{ width: "150px", height: "60px", left: "807px", top: "250px" }}>
          <input
            type="text"
            className="input"
            placeholder="Сумма"
          />
          <div className="rectangle-1922">
            <div className="currency">KGS</div>
          </div>
          {/* юниты */}
          <div className="dropdown">
            <select className="dropdown-select">
              <option value="шт">шт</option>
              <option value="кг">кг</option>
              <option value="л">л</option>
              <option value="м">м</option>
            </select>
          </div>
          {/* категории */}
          <div className="category-dropdown">
            <select className="category-dropdown-select">
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>
        </div>
      </div>
      {/* Кнопка удалитm */}
      <div className="frame-300">
        <div className="delete-button">
          Удалить
        </div>

        
      </div>
      <div className="frame-301">
        <div className="save-button">
          Сохранить
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
