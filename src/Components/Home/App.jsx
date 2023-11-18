import React, { useState, useEffect } from "react";

// imports
import "./Style.css";
import { Link } from "react-router-dom";

// react icons
import { BiSolidNotepad } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

// firestore
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../config/firebase";

function Home() {
  const [inputFields, setInputFields] = useState([""]); // State to store input fields
  const [isChecked, setIsChecked] = useState(false);
  const [todos, setTodos] = useState([]);

  // Logout
  const logout = async (e) => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }

    e.preventDefault(); // Prevent the form from submitting
  };

  const input = async () => {
    if (inputFields.length === 0 || inputFields[0] === "") {
      return; // Do not add empty input
    }

    await addDoc(collection(db, "todos"), {
      item: inputFields[0],
      id: uuidv4(),
      userId: auth.currentUser.uid,
    });

    setInputFields([...inputFields, ""]);
    console.log("add todos");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      console.log("collection")
      const userDataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(userDataArray);
      console.log("show  data")
    }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    if (auth.currentUser) {
      fetchData();
    }
    console.log("get todos");
  }, [auth.currentUser]);

  // Function to add new input field
  const addInputField = () => {
    setTodos([...todos, { id: uuidv4(), item: "" }]);
  };

  // Function to remove an input field
  const removeInputField = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
  
      // Now, update the local state to remove the deleted item
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo from Firestore:", error);
    }
  };

  
  const handleCheckboxChange = (isChecked) => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div className="home">
        <BiSolidNotepad className="note" />
        <h1 className="todo">Todo App</h1>
        <Link to="/">
          {" "}
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </Link>
      </div>

      <button className="save" onClick={input}>
        Save
      </button>

      <div className="input-container">
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              className="check"
              checked={todo.isChecked}
              onChange={() => handleCheckboxChange(todo.id)}
            />

            <input
              className={todo.isChecked ? "gray-input text" : "text"}
              type="text"
              value={todo.item}
              // onChange={(e) => {
              //   const updatedFields = [...inputFields];
              //   updatedFields[index] = e.target.value;
              //   setInputFields(updatedFields);
              // }}
              onChange={(e) => {
                const updatedTodos = todos.map((t) =>
                  t.id === todo.id ? { ...t, item: e.target.value } : t
                );
                setTodos(updatedTodos);
              }}
            />

          </div>
        ))}
      </div>

        <AiOutlineDelete
          className="delete"
          onClick={() => removeInputField(todos.id)}
        />

        <AiOutlinePlus
          className="plus"
          onClick={addInputField}
        />

    </div>
  );
}
export default Home;