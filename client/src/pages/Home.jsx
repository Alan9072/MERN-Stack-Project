import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Home.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Header from "../components/Header/Header";



function Home() {
  const [input, setInput] = useState('');
  const [arr, setArr] = useState([]);
  const [placeholder, setPlaceholder] = useState('Enter task');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const url = 'https://react-project-backend-seven.vercel.app'||'http://localhost:5000';
 
  useEffect(() => {
    // Fetch tasks from the backend
    axios.get(`${url}/tasks`)
      .then(response => {
        setArr(response.data); // Update state with the fetched tasks
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      if (isEditing) {
        axios.put(`${url}/tasks/${editingId}`, { task: input })
          .then(response => {
            const updatedArr = arr.map(task =>
              task._id === editingId ? response.data : task
            );
            setArr(updatedArr);
            setIsEditing(false);
            setEditingId(null);
          })
          .catch(error => {
            console.error('Error updating task:', error);
          });
      } else {
        axios.post(`${url}/tasks`, { task: input })
          .then(response => {
            setArr([...arr, response.data]);
          })
          .catch(error => {
            console.error('Error adding task:', error);
          });
      }
      setInput('');
    } else {
      setPlaceholder("Enter any task");
    }
  };

  const handleEdit = (id, task) => {
    setInput(task);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    axios.delete(`${url}/tasks/${id}`)
      .then(() => {
        setArr(arr.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <>
      <Header value={"React Basic Project - Todo List"}/>
      <div className={styles.HomeContainer}>
        <div className={styles.Homebox}>
          <Navbar />
          <div className={styles.insider}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder={placeholder}
              />
              <button type="submit">
                {isEditing ? "Update" : "Add"}
              </button>
            </form>
            <div className={styles.contentinside}>
              {arr.length === 0 ? 
                <div className={styles.divdes}>Nothing</div> :
                arr.map((item) => (
                  <div className={styles.divdes} key={item._id}>
                    <div className={styles.textdiv}>
                      {item.task}
                    </div>
                    <div className={styles.button}>
                      <MdEdit style={{color:"#0762F6"}} onClick={() => handleEdit(item._id, item.task)} />
                      <MdDelete style={{color:"#0762F6"}} onClick={() => handleDelete(item._id)} />
                    </div>
                  </div>
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
