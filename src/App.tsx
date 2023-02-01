import React, { useState } from 'react';

import style from './App.module.scss';

import { Calendar } from 'components/Calendar/Calendar';
import { Nullable, ReturnComponent } from 'types';

const App = (): ReturnComponent => {
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);
  const [selectedWeek, setSelectedWeek] = useState<Nullable<Date[]>>(null);

  return (
    <div className={style.container}>
      <Calendar
        selectedDate={selectedDate}
        selectDate={setSelectedDate}
        selectWeek={setSelectedWeek}
        selectedWeek={selectedWeek}
      />
    </div>
  );
};

export default App;
