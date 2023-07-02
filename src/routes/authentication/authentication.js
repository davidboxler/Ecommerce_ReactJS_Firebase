import SingUpForm from "../../components/sing-up/sing-up-form";
import SingInForm from "../../components/sing-in/sing-in";

import './authentication.scss'

const SingIn = () => {
  return (
    <div className="auth-container">
      <SingInForm />
      <SingUpForm />
    </div>
  );
};

export default SingIn;
