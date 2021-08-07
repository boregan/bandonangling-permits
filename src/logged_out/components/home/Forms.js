import React, { Fragment, useEffect, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { useFormContext } from "react-hook-form";

export const FormOne = ({ formContext }) => {
  const methods = useFormContext();

  // Calendar
  const [date, changeDate] = useState(new Date());

  return (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      autoOk
      orientation="landscape"
      variant="static"
      openTo="date"
      value={date}
      onChange={changeDate}
    />
  </MuiPickersUtilsProvider>
  )
};