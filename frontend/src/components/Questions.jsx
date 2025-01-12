import React, { useState } from "react";
import "../styles/Questions.css";

function Questions(){
    const [checked,setChecked]=useState(undefined);

    const onSelect=()=>{
        setChecked(true)
        console.log('radio button change');
    }
    return(
        // <div className="questions">
        //     <h2>Simple question 1</h2>
        //     <ul>
        //         <li><input 
        //         type="radio" 
        //         value={checked} 
        //         name="options" 
        //         id="q1-option" onChange={onSelect}/>
        //         <label htmlFor="q1-option">options</label>
        //         <div className="check">

        //         </div>
        //         </li>
        //     </ul>
        // </div>
    <div className="container">
      <p className="question">What is the capital of France?</p>
      <form className="options-container">
        <label className="option">
          <input type="radio" name="option" value="Berlin" className="radio" />
          A. Berlin
        </label>
        <label className="option">
          <input type="radio" name="option" value="Madrid" className="radio" />
          B. Madrid
        </label>
        <label className="option">
          <input type="radio" name="option" value="Paris" className="radio" />
          C. Paris
        </label>
        <label className="option">
          <input type="radio" name="option" value="Rome" className="radio" />
          D. Rome
        </label>
      </form>
</div>
    );
}

export default Questions;
