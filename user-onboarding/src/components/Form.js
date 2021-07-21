import axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

export default function Form() {
  // Set up for input form
  const defaultState = {
    name: "",
    email: "",
    password: "",
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, terms: "" });
  const [disableButton, setDisabledButton] = useState(true);

  // Form Schema for (formState)
  let formSchema = yup.object().shape({
    name: yup.string().required("Please provide name"),
    email: yup
      .string()
      .required("Please provide an email")
      .email("This is not a valid email."),
    password: yup.string().required("Please enter a valid password").min(6),
    terms: yup.boolean().oneOf([true], "Agree to Terms and Conditions"),
  });

  // Effect for if form is filled out correctly
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setDisabledButton(!valid));
  }, [formState, formSchema]);

  // Submit for form submitted correctly
  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(() => console.log("form submitted, success!"))
      .catch((err) => console.log(err));
  };
}
