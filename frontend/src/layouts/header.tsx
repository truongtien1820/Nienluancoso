import React from "react";

import { Outlet } from "react-router-dom";
import { Footer } from "../components/Foooter";
import { Header } from "../components/Header";

export const HeaderLayout = () => {
  return (
    <>
      <div>
        <Header />
        <div className="pt-20 min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
