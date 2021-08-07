import React from 'react';
import ReactDOM from "react-dom";
import Component from 'mson-react/lib/component';

function FormFillin() {
  const definition = 
    {
        "component": "Form",
        "fields": [
          {
            "name": "Name",
            "required": true,
            "block": true,
            "component": "PersonFullNameField"
          },
          {
            "name": "Address",
            "label": "Address",
            "required": true,
            "component": "AddressField"
          },
          {
            "name": "Email",
            "label": "Email Address",
            "required": true,
            "block": true,
            "component": "EmailField"
          },
          {
            "name": "Phone",
            "label": "Phone Number",
            "required": true,
            "block": true,
            "defaultMask": "Phone",
            "component": "PhoneField"
          },
          {
            "name": "Car",
            "label": "Car Registration",
            "required": true,
            "component": "TextField"
          },
          {
            name: "submit",
            component: "ButtonField",
            label: "Submit",
            type: "submit",
            icon: "Send"
          }
        ]
      }
  

  // prettier-ignore
  return (
    <Component
        definition={definition}
        onSubmit={({ component }) => {
            alert(JSON.stringify(component.getValues()));
        }}
    />
  );
};

export default FormFillin;