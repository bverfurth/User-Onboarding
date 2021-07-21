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

  // Submit for form submitted correctly to 'POST' data
  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(() => console.log("form submitted, success!"))
      .catch((err) => console.log(err));
  };

  // Confirms if the information meets the standard set by the form schema
  const setFormErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  // Set up for onChange function
  const inputChange = (event) => {
    const { name } = event.target;
    const valueTernary =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({ ...formState, [event.target.name]: valueTernary });
    setFormErrors(name, valueTernary);
  };

  // Set up return for information in formSubmit
  return (
    <form onSubmit={formSubmit}>
      <div style={{ color: "red" }}>
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.terms}</div>
      </div>

      {/*Name section in form */}
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          onChange={inputChange}
          value={formState.name}
        />
        <br />
      </label>
      {/*Email section in form */}
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="email"
          onChange={inputChange}
          value={formState.email}
        />
        <br />
      </label>
      {/*Password section in form */}
      <label htmlFor="password">
        Password:
        <input
          type="text"
          name="password"
          onChange={inputChange}
          value={formState.password}
        />
      </label>
      <br />
      {/*Terms section in form */}
      <label htmlFor="terms">
        Agree to Terms and Conditions:
        <input
          type="checkbox"
          name="terms"
          onChange={inputChange}
          value={formState.terms}
        />
      </label>
      <br />
      {/* Added submit button for sending form data to server  */}
      <button disabled={disableButton}>Submit</button>
    </form>
  );
}
