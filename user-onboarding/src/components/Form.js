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
}
