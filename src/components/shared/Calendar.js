import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Calendar = ({open, setOpen, date, setDate}) => {
  return (
    <View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default Calendar;
