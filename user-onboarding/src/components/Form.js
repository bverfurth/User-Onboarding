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