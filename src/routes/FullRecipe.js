import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import "./FullRecipe.css";
const FullRecipe = () => {
  const location = useLocation();
  const { recipe } = location.state || {};

  function formatSteps(stepString) {
    const steps = stepString.split("Step ");
    const stepsArray = steps.slice(1).map((item) => {
      return "Step " + item.replace(/,\s*$/, "");
    });
    return stepsArray;
  }

  function populateSteps(instructions) {
    const steps = formatSteps(instructions);

    return steps.map((step, index) => <li key={index}>{step}</li>);
  }

  function populateIngredients(ingredients) {
    const ingredientArray = ingredients.split(", ");
    const classLabel = "note-item";
    return ingredientArray.map((ingredient) => (
      <div className={classLabel}>{ingredient}</div>
    ));
  }

  if (!recipe) {
    return (
      <div>
        <Navbar />
        <h1>Uh oh! No recipe found here.</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="details-container">
        <div className="details-one">
          <h1 className="details-header">{recipe.title}</h1>
          <br></br>
          <div className="details-etc">
            <p>Servings: {recipe.servings}</p>
            <p>Description: {recipe.description}</p>
            <br></br>
            <p>Instructions:</p>
            <ul>{populateSteps(recipe.instructions)}</ul>
          </div>
        </div>
        <div className="details-two">
          <div className="time-container">
            <h1 className="details-header">Cooking Time</h1>
            <br></br>
            <p>Prep-Time: {recipe.prep_time}</p>
            <p>Cook-Time: {recipe.cook_time}</p>
            <p>Total Time: {recipe.cook_time + recipe.prep_time}</p>
          </div>
          <div className="note-container">
            <h2>Ingredients:</h2>
            {populateIngredients(recipe.ingredients)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullRecipe;
