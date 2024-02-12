import SingInForm from "../../components/sing-in/sing-in";
import SingUpForm from "../../components/sing-up/sing-up-form";

import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SingInForm />
      <SingUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
