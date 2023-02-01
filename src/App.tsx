import React, { useState } from 'react';

import style from './App.module.scss';

import { ReturnComponent } from 'types';
import { Calendar } from 'components/Calendar/Calendar';

const App = (): ReturnComponent => {
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 0,1));

  return (
    <div className={style.container}>
      <Calendar selectedDate={selectedDate} selectDate={setSelectedDate} />
    </div>
  );
};

export default App;
