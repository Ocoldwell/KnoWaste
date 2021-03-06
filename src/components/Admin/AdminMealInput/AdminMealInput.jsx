import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./AdminMealInput.module.scss";
import mealLibrary from "../AdminLibrary/AdminLibrary.json";
import AdminNavBar from "../AdminNavBar";
import { useForm } from "react-hook-form";
import AdminMealPreview from "./AdminMealPreview";
import { createMeal, getAllMeals, deleteMeal } from "../../../services/meals.service"
import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import { storage, firestore } from "../../../firebase";

const AdminMealInput = () => {
  const { register, handleSubmit, errors } = useForm();
  const [image, setImg] = useState(null);
  const [url, setUrl] = useState('');
  let history = useHistory();

  //image upload
  const handleChange = (e) => {
    if(e.target.files[0].size < 3 * 1024 * 1024){
      console.log(e.target.files[0])
      setImg(e.target.files[0]);
      console.log("image is",image)

      const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
      uploadTask.on("state_changed", snapshot => {
                }, error => {
                  alert(error.message);
                }, () => {
                  storage.ref("images").child(e.target.files[0].name).getDownloadURL().then(url => {
                    setUrl(url)
                  })
                })
    } else{
      alert("Image too large");
    }
  } 
  const onSubmit = (data) => {
    const mealCreation = createMeal(data, url);
    toggleShowPopUp();
  };

  const [ showPopUp, setShowPopUp] = useState(false);

  const toggleShowPopUp = () => {
    setShowPopUp(!showPopUp);
    history.push('/admin');
  }

  let data;

  return (
    <div className={styles.contentMain}>

      <AdminNavBar />
      
      <div className={styles.formContainer}>
      {/* <button onClick={getAllMeals} className="button-style-1">Get Da Mealz Bois</button>
      <button onClick={deleteMeal} className="button-style-1">Delete Da Mealz Bois</button> */}
        <form onSubmit={handleSubmit(onSubmit)} className="box-style-1">
        
          <div className={styles.rowOne}> 
          <h1>Add a meal</h1>    
                  <div>
                        <h3>Name of Meal</h3>
                          <input 
                            type="text"
                            placeholder="Name"
                            name="mealName"
                            ref={register({ required: true })}
                          ></input>
                          {errors.mealName && errors.mealName.type === "required" && (
                            <p>This field is required</p>
                          )}

                          <h3>Description</h3>
                          <textarea className={styles.boxStyleDescription}
                            type="text"
                            placeholder="Write your description here"
                            name="mealDescription"
                            ref={register({ required: true })}
                          ></textarea>
                          {errors.mealDescription && errors.mealDescription.type === "required" && (
                            <p>This field is required</p>
                          )}
                            
                    
                  </div> 
                  <h3>Allergens</h3>
                  <div className={styles.checkBox}>
                        <label>Gluten</label>
                        <input
                          type="checkbox"
                          name="mealAllergens"
                          value="gluten"
                          className={styles.checkBox}
                          ref={register}
                        />

                        <label>Dairy</label>
                        <input
                          type="checkbox"
                          name="mealAllergens"
                          value="dairy"
                          className={styles.checkBox}
                          ref={register}
                        />

                        <label>Shellfish</label>
                        <input
                          type="checkbox"
                          name="mealAllergens"
                          value="shellfish"
                          className={styles.checkBox}
                          ref={register}
                        />

                  </div>

                  <h3>Dietary Requirements</h3>
                  <div className={styles.checkBox}>
                    
                    <label>Vegetarian</label>
                    <input type="checkbox" name="mealDiet" value="vegetarian" ref={register} />
                    <label>Vegan</label>
                    <input type="checkbox" name="mealDiet" value="vegan" ref={register} />

                    <label>Halal</label>
                    <input type="checkbox" name="mealDiet" value="halal" ref={register} />
                    
                  </div>
                  
                  
          </div>
                    
          <div className={styles.rowTwo}>
                  
                  <div className={styles.imgContainer}>
                    <div className={styles.imgPreview}> {url && <img src={url} />} </div>
                    <input  className="button-style-1" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} />                         
                  </div>
                 
                  <div className={styles.imgContainer}>
                  <h3>Carbon Footprint</h3>
                  <input
                    type="number"
                    name="mealCarbon"
                    ref={register({ required: true })}
                  ></input>
                  {errors.mealCarbon && errors.mealCarbon.type === "required" && (
                    <p>This field is required</p>
                  )}
                  <h3>Water Usage</h3>
                  <input
                    type="number"
                    name="mealWater"
                    ref={register({ required: true })}
                  ></input>
                  {errors.mealWater && errors.mealWater.type === "required" && (
                    <p>This field is required</p>
                  )}

                  <button type="submit" className="button-style-1">Submit</button>
                  { showPopUp && 
                    <ConfirmationPopUp title="Submitted" message={data} toggle={toggleShowPopUp}
                    />
                  }
                  </div>

          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AdminMealInput;
