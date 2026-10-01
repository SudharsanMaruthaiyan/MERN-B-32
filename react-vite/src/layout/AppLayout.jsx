import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* 
        if path == "/comment" => return
        else if path == "/counter" => return
      */}
      <Footer />
    </div>
  );
};

export default AppLayout;
