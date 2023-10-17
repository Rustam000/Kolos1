import styles from "./EditProduct.module.css";

export default function EditProduct() {
  return (
    <div className={styles.header}>
      {/* <div className={styles.rectangle_1905}></div>
      <div className={styles.logo_colos}>
        <div className={styles.logo}></div>
        <div className={styles.colos}>Колос</div>
      </div>
      <div className={styles.warehouse}>
        <div className={styles.sklad}>Склад</div>
      </div>
      <div className={styles.distributor}>
        <div className={styles.distrib}>Дистрибьютор</div>
      </div> */}
      <div className={styles.cancel_button}>
        <button className={styles.back}>
          <span className={styles.fi_sr_angle_small_left}></span>
          <span className={styles.cancel_text}>Отменить</span>
          <div className={styles.create_product}>Создать товар</div>
        </button>
      </div>
      <div className={styles.cube}>
        <div className={styles.input_field}>
          <input type="text" className={styles.input} placeholder="Пиво" />
        </div>
        <div className={styles.input_field} style={{ left: "536px" }}>
          <input
            type="text"
            className={styles.input}
            placeholder="Идентификационный номер"
          />
        </div>
        <div
          className={styles.input_field}
          style={{
            width: "160px",
            height: "60px",
            left: "404px",
            top: "250px",
          }}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Количество"
          />
        </div>
        <div
          className={styles.input_field}
          style={{
            width: "160px",
            height: "60px",
            left: "607px",
            top: "250px",
          }}
        >
          <input type="text" className={styles.input} placeholder="Цена" />
        </div>
        <div
          className={styles.input_field}
          style={{
            width: "150px",
            height: "60px",
            left: "807px",
            top: "250px",
          }}
        >
          <input type="text" className={styles.input} placeholder="Сумма" />
          <div className={styles.rectangle_1922}>
            <div className={styles.currency}>KGS</div>
          </div>
          {/* юниты */}
          <div className={styles.dropdown}>
            <select className={styles.dropdown_select}>
              <option value="шт">шт</option>
              <option value="кг">кг</option>
              <option value="л">л</option>
              <option value="м">м</option>
            </select>
          </div>
          {/* категории */}
          <div className={styles.category_dropdown}>
            <select className={styles.category_dropdown_select}>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>
        </div>
      </div>
      {/* Кнопка удалитm */}
      <div className={styles.frame_300}>
        <div className={styles.delete_button}>Удалить</div>
      </div>
      <div className={styles.frame_301}>
        <div className={styles.save_button}>Сохранить</div>
      </div>
    </div>
  );
}
/* export default function EditProduct() {
  return (
    <div className={styles.EditProduct}>
      <h1 style={{ textAlign: "center" }}>
        Страница Создания/редактирования товара или оборудования
      </h1>
    </div>
  );
} */
