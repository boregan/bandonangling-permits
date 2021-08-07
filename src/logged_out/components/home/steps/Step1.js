import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { useFormContext } from "react-hook-form";

export default function Step1() {
  // Calendar
  const [date, changeDate] = useState(new Date());

  return (
  <MuiPickersUtilsProvider align="center" utils={DateFnsUtils}>
    <DatePicker
      autoOk
      orientation="landscape"
      variant="static"
      inputVariant="standard"
      openTo="date"
      value={date}
      onChange={changeDate}
      disablePast="true"
      name="date"
      label="Date"
    />
  </MuiPickersUtilsProvider>
  )
};