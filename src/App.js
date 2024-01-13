// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Contribute from "./routes/Contribute";
import Categories from "./routes/Categories";
import Recipes from "./components/Recipes";
import Selected from "./routes/Selected";
import FullRecipe from "./routes/FullRecipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/recipe-category" element={<Recipes />} />
        <Route path="/selected" element={<Selected />} />
        <Route path="/full-recipe" element={<FullRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;

/*id int AI PK 
title varchar(255) 
description text 
ingredients text 
instructions text 
prep_time int 
cook_time int 
servings int 
date_created timestamp*/
