import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { Box, Paper } from "@material-ui/core";

// Validation
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Steps in Form
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

import classNames from "classnames";

//some styling
const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minHeight: "25vh"
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

const defaultValues = {
  date: new Date() ,
  address: "",
  job: "",
  terms: ""
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
      return <Step4 />
    default:
      return "Unknown step";
  }
}

export default function MultiStepForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Pick a Date", "Contact Information", "Agree to Terms", "Payment"];

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    alert(JSON.stringify(data));

    handleNext();
  };

  const validationSchema = [
    
    //validation for step1
    yup.object({
      date: yup.date().required()
    }),

    //validation for step2
    yup.object({
      name: yup.string(),
      //.required(),

      address: yup.string(), 
      // .required(),

      address2: yup.string(),
      city: yup.string(),
      //.required(),

      eircode: yup.string(),
      //.required(),
      country: yup.string(),
      //.required(),

      email: yup.string(),
      //.email().required(),

      phone: yup.number(),
      //.required(),
      car: yup.string(),
      //.required()
    }),

    //validation for step3
    yup.object({
      terms: yup.string().required() 
    })

    //validation for step4
  ];
  
  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange"
  });
  const { handleSubmit, reset, trigger } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return (
    <div className="xs-p-top" style={{ backgroundColor: "#FFFFFF" }}>

    <div className={classNames("container-fluid", classes.containerFix)}>

    <main className={classes.layout}>
      <Typography variant="h3" align="center" className="md-mg-bottom">
        Pricing
      </Typography>
      <Paper className={classes.paper} elevation={6}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div align="center" style={{ minHeight: "50%" }}>
          {activeStep === steps.length ? (
            <>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </>
          ) : (
            <FormProvider {...methods}>
              <form>
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ paddingTop: "5vh" }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </form>
            </FormProvider>
          )}
        </div>
      </Paper>
    </main>
    </div>
    </div>
  );
}
