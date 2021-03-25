import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import MealSelection from "./components/MealSelection";
import Profile from "./components/Profile";
import AboutUs from "./components/AboutUs";
import MealConfirmation from "./components/MealConfirmation";
import Environment from "./components/Environment";
import NavBar from "./components/NavBar";
import Gamification from "./components/Gamification";
import adminHome from "./components/Admin/AdminHome";
import AdminMealInput from "./components/Admin/AdminMealInput";
import AdminWeeklyPlanner from "./components/Admin/AdminWeeklyPlanner";
import mealData from "./assets/data/meal-data.json";
import ContextUser from "./context/contextUser.js";
import "./App.css";
import "./assets/styles/styles.scss";
import library from "./assets/data/fa-library";
import mealChoiceArr from "./assets/data/user-meal-choices.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminHome from "./components/Admin/AdminHome";

const App = () => {
  // meal choice is an array for storing the users selected main meals

  // get meal choice is a function which adds the selected meals as recipe names
  // getMealChoice function is passed down as props: app -> mealselection -> .. -> DailySelection
  const getMealChoice = (activeMeal) => {
    mealChoiceArr.push(activeMeal);
    console.log(mealChoiceArr);
    return mealChoiceArr;
  };

  // function to clear meal array when edit button selected on meal confirmation page
  // passed as a prop to meal confirmation
  const clearMealChoiceArr = () => (mealChoiceArr.length = 0);

  return (
    <div>
      <Router>
        <ContextUser>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route path="/mealselection">
              <MealSelection
                mealData={mealData}
                getMealChoice={getMealChoice}
              />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/mealconfirmation">
              <MealConfirmation
                mealChoiceArr={mealChoiceArr}
                clearArr={clearMealChoiceArr}
              />
            </Route>
            <Route path="/environment">
              <Environment />
            </Route>
            <Route path="/gamification">
              <Gamification />
            </Route>
            <Route path="/admin">
              <AdminHome />
            </Route>
            <Route path="/adminmealinput">
              <AdminMealInput />
            </Route>
            <Route path="/adminweeklyplanner">
              <AdminWeeklyPlanner />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </ContextUser>
      </Router>
    </div>
  );
};
export const testFunction = () => {
  return "All Good";
};
export default App;
