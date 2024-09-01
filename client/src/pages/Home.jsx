import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Home.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import Header from "../components/Header/Header";


function Home() {
  const [input,setInput] = useState('');
  const [arr,setArr] = useState([]);
  const [placeholder,setPlaceholder] = useState('Enter task');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input != ''){
      if (isEditing) {
        const updatedArr = [...arr];
        updatedArr[editingIndex] = input;
        setArr(updatedArr);
        setIsEditing(false);
        setEditingIndex(null);
        acceptTask(updatedArr);
      } else {
        const array = [...arr,input];
        setArr(array);
        acceptTask(array);
      }
      // Clear the input field
      setInput('');
    }
    else{
      setPlaceholder("Enter any task");
    }
    // Create a new array with the current input
   
    // Send the updated array to the server
    
  };

  function handleEdit(index){
    setInput(arr[index]);
    setIsEditing(true);
    setEditingIndex(index);
  }
  function handleDelete(index){
    const currentArr = [...arr];
    currentArr.splice(index, 1);
    setArr(currentArr);

  }


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
    <>
    <Header/>
    <div className={styles.HomeContainer}>
      
      <div className={styles.Homebox}>
        <Navbar />
        <div className={styles.insider}>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} placeholder={placeholder}/>
            <button type="submit">
             {isEditing ? "Update" : "Add"}
            </button>
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
                  <MdEdit onClick={() => { handleEdit(index);}}/>
                  <MdDelete onClick={() => { handleDelete(index);}}/>
                </div>
              </div> // Display each item in the array
            ))
            }
          
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
