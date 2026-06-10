// pages/Statement/index.tsx

import './Statement.module.css';

const Statement = () => {
  return (
    <div className="statement-page">
      <h1>Выписка</h1>

      <div className="statement-tabs">
        <button>ПО СЧЕТАМ</button>
        <button>ПО КОРПОКАРТАМ</button>
        <button>РЕЕСТР ОСТАТКОВ</button>
        <button>ОТЧЕТ</button>
        <button>ВЫПИСКА ПО РАСПИСАНИЮ</button>
      </div>

      <div className="statement-filters">
        <div>Все валюты • Все счета</div>

        <div className="statement-date">
          Сегодня
        </div>

        <button>Сбросить фильтры</button>

        <label>
          <input type="checkbox" />
          Показывать нулевые обороты
        </label>

        <label>
          <input type="checkbox" />
          Показывать выписку за каждый день
        </label>

        <label>
          <input type="checkbox" />
          Показывать переоценку
        </label>
      </div>

      <button className="statement-submit">
        Сформировать выписку
      </button>
    </div>
  );
};

export default Statement;