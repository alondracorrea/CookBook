import React from "react";
import "./Category.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const categoryValue = String(e.target.innerHTML);
    console.log(categoryValue);
    //using query paramters to pass in data between pages
    navigate(`/selected?category=${categoryValue}`);
  };

  return (
    <div className="category-div">
      <ul className="flex-container">
        <li className="flex-item" onClick={handleClick}>
          Breakfast
        </li>
        <li className="flex-item" onClick={handleClick}>
          Lunch
        </li>
        <li className="flex-item" onClick={handleClick}>
          Dinner
        </li>
      </ul>
      <ul className="flex-container2">
        <li className="flex-item2" onClick={handleClick}>
          Dessert
        </li>
        <li className="flex-item2" onClick={handleClick}>
          Appetizer
        </li>
      </ul>
    </div>
  );
};

export default Category;
