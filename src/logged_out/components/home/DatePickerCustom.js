import * as React from "react";
import { DatePicker } from "@material-ui/pickers";

import {
  Controller,
  useFormContext,
  useController,
  get
} from "react-hook-form";

export const DatePickerCustom = ({ ...props }) => {
  const { meta } = useController(props);
  const { control, formState } = useFormContext();
  const error = get(formState.errors, props.name);
  const errorText = meta.invalid ? error.message : "Pick a date";

  return (
    <Controller
      {...props}
      as={DatePicker}
      control={control}
      helperText={errorText ? errorText : props.helperText}
      error={!!errorText}
      defaultValue={props.defaultValue}
    />
    
  );
};
