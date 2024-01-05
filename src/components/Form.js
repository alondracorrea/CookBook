import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [numInstructions, setNumInstructions] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category: document.getElementById("category").value,
      title: document.getElementById("title").value,
      description: document.getElementById("message").value,
      ingredients: document.getElementById("ingredients").value,
      instructions: "",
    };

    //add  instructions dynamically
    for (let i = 1; i <= numInstructions; i++) {
      if (i != numInstructions) {
        formData.instructions +=
          `Step ${i}) ` + document.getElementById(`step-${i}`).value + ", ";
      } else {
        formData.instructions +=
          `Step ${i}) ` + document.getElementById(`step-${i}`).value;
      }
    }

    formData["prep-time"] = document.getElementById("prep-time").value;
    formData["cook-time"] = document.getElementById("cook-time").value;
    formData.servings = document.getElementById("servings").value;

    console.log("Data:", formData);

    //POST request to my Express server
    try {
      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Recipe submitted successfully!");
      } else {
        console.error("Error submitting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting recipe:", error.message);
    }
  };

  function populateInputs() {
    const inputs = [];
    for (let i = 1; i <= numInstructions; i++) {
      inputs.push(
        <li key={i}>
          <label htmlFor={`step-${i}`} className="steps">
            Step {i}
          </label>
          <input
            type="text"
            id={`step-${i}`}
            name={`step-${i}`}
            placeholder={`Enter step ${i} here`}
          />
        </li>
      );
    }
    return inputs;
  }

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit}>
        <ul className="flex-outer">
          <li>
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Appetizer">Appetizer</option>
            </select>
          </li>
          <li>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Enter title here" />
          </li>
          <li>
            <label htmlFor="message">Description</label>
            <textarea
              rows="2"
              id="message"
              placeholder="Enter your message here"
            ></textarea>
          </li>
          <li>
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              id="ingredients"
              placeholder="Enter ingredients here (seperate by commas)"
            />
          </li>
          <li>
            <label htmlFor="instruction-input">Instructions</label>
            <input
              type="tel"
              id="instruction-input"
              placeholder="Enter # of steps here"
            />
            <button
              type="button"
              id="enter-btn"
              onClick={() =>
                setNumInstructions(
                  Number(document.getElementById("instruction-input").value)
                )
              }
            >
              Enter
            </button>
          </li>
          {populateInputs()}
          <li>
            <label htmlFor="prep-time">Prep Time</label>
            <input
              type="text"
              id="prep-time"
              placeholder="Enter preptime here"
            />
          </li>
          <li>
            <label htmlFor="cook-time">Cook Time</label>
            <input
              type="text"
              id="cook-time"
              placeholder="Enter cooktime here"
            />
          </li>
          <li>
            <label htmlFor="servings">Servings</label>
            <input
              type="text"
              id="servings"
              placeholder="Enter # of servings here"
            />
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Form;
