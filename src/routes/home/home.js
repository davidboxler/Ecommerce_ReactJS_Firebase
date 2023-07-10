import Directory from "../../components/directory/directory";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
