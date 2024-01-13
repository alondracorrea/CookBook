import React from "react";
import Navbar from "../components/Navbar";
import Recipes from "../components/Recipes";
import { useLocation } from "react-router-dom";
const Selected = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  return (
    <div className="selectedDiv">
      <Navbar />
      <Recipes category={category} />
    </div>
  );
};

export default Selected;
