import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Home.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from 'axios'


function Home() {
  const [input,setInput] = useState('');
  const [arr,setArr] = useState([]);
  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new array with the current input
    const updatedArr = [...arr, input];
    // Update the state with the new array
    setArr(updatedArr);
    // Clear the input field
    setInput('');
    // Send the updated array to the server
    acceptTask(updatedArr);
  };


  function acceptTask(arr){
    console.log("Sent the message");
    console.log(arr);
    axios.post('http://localhost:5000/add',{content:arr})
    .then(response => {
      console.log('Data sent successfully:', response.data);
    })
    .catch(error => {
      console.error('There was an error sending the data:', error);
    });
  }

  return (
    <div className={styles.HomeContainer}>
      <div className={styles.Homebox}>
        <Navbar />
        <div className={styles.insider}>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} placeholder="Enter task"/>
            <button type="submit">Add</button>
          </form>
          <div className={styles.contentinside}>
            {arr.length === 0? 
            <div className={styles.divdes}>Nothing</div>:
            arr.map((item, index) => (
              <div className={styles.divdes} key={index}>
                <div className={styles.textdiv}>
                  {item}
                </div>
                <div className={styles.button}>
                  <MdEdit/>
                  <MdDelete/>
                </div>
              </div> // Display each item in the array
            ))
            }
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
