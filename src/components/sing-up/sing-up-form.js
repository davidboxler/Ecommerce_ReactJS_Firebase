import React, { useState } from "react";
import './sing-up.scss';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../services/firebase";
import FormInput from "../form-input/form-input";
import Button from "../button/button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SingUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sing-up-container">
      <h2>Don't have an account?</h2>
      <span>Sing up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        ></FormInput>

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></FormInput>

        <FormInput
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></FormInput>

        <Button type="submit">Sing Up</Button>
      </form>
    </div>
  );
};

export default SingUpForm;
