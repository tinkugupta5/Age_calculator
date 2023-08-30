import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const initialFormData = {
  firstName: '',
  lastName: '',
  address: '',
  projectName: '',
  accessPermission: false,
  alarmAccess: false,
  readAccess: false,
  userType: '',
  age: '',
};

const FormComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    // Submit form data to JSON server using Axios
    axios.post('http://localhost:3002/data', formData)
      .then((response) => {
        console.log('Form data submitted:', response.data);
        setFormData(initialFormData); // Reset form values
        setActiveStep(0); // Reset step to the first step
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
            <FormControl>
              <InputLabel>User Type</InputLabel>
              <Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <MenuItem value="external">External</MenuItem>
                <MenuItem value="internal">Internal</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
      case 2:
        return (
          <div>
            <FormControlLabel
              control={
                <Switch
                  name="accessPermission"
                  checked={formData.accessPermission}
                  onChange={handleChange}
                />
              }
              label="Dashboard Access Permission"
            />
            <FormControlLabel
              control={
                <Switch
                  name="alarmAccess"
                  checked={formData.alarmAccess}
                  onChange={handleChange}
                />
              }
              label="Alarm Access"
            />
            <FormControlLabel
              control={
                <Switch
                  name="readAccess"
                  checked={formData.readAccess}
                  onChange={handleChange}
                />
              }
              label="Read Access"
            />
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Typography>{getStepContent(activeStep)}</Typography>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
        {activeStep === steps.length - 1 && (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default FormComponent;
