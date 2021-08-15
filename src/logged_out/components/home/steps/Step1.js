import React, { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { DatePickerCustom } from "../DatePickerCustom";

class LocalizedUtils extends MomentUtils {
  getDatePickerHeaderText(date) {
    return moment(date).format('dd-MM-yyyy');
  }
}

export default function Step1() {
  // Calendar
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider align="center" utils={LocalizedUtils}>

      <DatePickerCustom
        orientation="landscape"
        variant="static"
        inputVariant="standard"
        disablePast="true"
        value={selectedDate}
        onChange={handleDateChange}
        name="date"
        label="Date"
      />
    </MuiPickersUtilsProvider>
  );
}