import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInWithGooglePopup
} from "../../services/firebase";
import { emailSignInStart } from "../../store/user/user.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import FormInput from "../form-input/form-input";
import "./sing-in.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SingInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log("user sing in failed", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sing-up-container">
      <h2>Already have an account?</h2>
      <span>Sing in with email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button type="submit">Sing In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sing in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SingInForm;
