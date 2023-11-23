import React, { useState, useEffect } from "react";

// imports
import "./Style.css";
import { Link } from "react-router-dom";

// react icons
import { BiSolidNotepad } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlineSaveAlt } from "react-icons/md";

// firestore
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../config/firebase";
import { updateDoc } from "firebase/firestore";

function Home() {
  const [inputFields, setInputFields] = useState([""]); // State to store input fields
  const [isChecked, setIsChecked] = useState(-1);
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);

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
    // if (inputFields.length === 0 || inputFields[0] === "") {
    //   return; // Do not add empty input
    // }

    // await addDoc(collection(db, "todos"), {
    //   item: inputFields[0],
    //   id: uuidv4(),
    //   userId: auth.currentUser.uid,
    // });

    try {
      // Add the new todo to Firestore
      for (const newTodo of todos) 
          await addDoc(collection(db, "todos"), {
            item: newTodo.item,
            id: newTodo.id,
            userId: auth.currentUser.uid,
            isChecked: newTodo.isChecked,
          });

      setInputFields([...inputFields, ""]);
      console.log("add todo");
    } catch (error) {
      console.error("Error adding todo to Firestore:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        console.log("collection");
        const userDataArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(userDataArray);
        console.log("show  data");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // const storedTodos = localStorage.getItem("todos");
    // if (storedTodos) {
    //   setTodos(JSON.parse(storedTodos));
    // } else {
    //   fetchData();
    // }
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
  setTodos(storedTodos);

    if (!auth.currentUser) {
      fetchData();
    }
    console.log("get todos");
  }, [auth.currentUser]);

  // Function to add new input field
  // const addInputField = () => {
  //   setTodos([...todos, { id: uuidv4(), item: "" }]);
  // };

  const addInputField = () => {
    // Create a new todo with a unique ID and empty item
    const newTodo = { id: uuidv4(), item: "" };

    // Update the local state to add the new todo
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Function to remove an input field
  const removeInputField = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      await deleteDoc(doc(db, "todos", id));

      // Now, update the local state to remove the deleted item
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      localStorage.setItem(
        "todos",
        JSON.stringify(todos.filter((todo) => todo.id !== id))
      );

      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting todo from Firestore:", error);
    }
  };

  // const handleCheckboxChange = (isChecked) => {
  //   setIsChecked(!isChecked);
  // };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editInputField = async (id) => {
    setEditTodoId(id);
    console.log("edit clicked");
    const todoToEdit = todos.find((todo) => todo.id === id);
    console.log("edited");

    // Set the inputFields state to the item of the todoToEdit
    setInputFields([todoToEdit.item]);
  };

  const saveEdit = async (id) => {
    try {
      console.log("saving item");
      const todoToEdit = todos.find((todo) => todo.id === id);

      if (todoToEdit) {
        console.log("Input Fields before update:", inputFields);
        // Update the content of the selected todo in Firestore
        // Get a reference to the document
        const todoRef = doc(db, "todos", id);

        // Update the content of the selected todo in Firestore
        await updateDoc(todoRef, {
          item: inputFields[0], // Use the updated inputFields state
          userId: auth.currentUser.uid,
          
        });
        console.log("Todo edited successfully");
        setEditTodoId(null);
        console.log("saved item");
      }
    } catch (error) {
      console.error("Error editing todo in Firestore:", error);
    }
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
              // value={todo.item}
              // onChange={(e) => {
              //   const updatedFields = [...inputFields];
              //   updatedFields[index] = e.target.value;
              //   setInputFields(updatedFields);
              // }}
              // onChange={(e) => {
              //   const updatedTodos = todos.map((t) =>
              //     t.id === todo.id ? { ...t, item: e.target.value } : t
              //   );
              //   setTodos(updatedTodos);
              // }}

              value={todo.id === editTodoId ? inputFields[0] : todo.item}
              onChange={(e) => {
                if (editTodoId === todo.id) {
                  const updatedFields = [e.target.value];
                  setInputFields(updatedFields);
                } else {
                  const updatedTodos = todos.map((t) =>
                    t.id === todo.id ? { ...t, item: e.target.value } : t
                  );
                  setTodos(updatedTodos);
                }
              }}
            />

            <AiOutlineDelete
              className="delete"
              onClick={() => removeInputField(todo.id)}
            />

            {editTodoId === todo.id ? (
              // Save changes button when in edit mode
              <MdOutlineSaveAlt
                className="editSave"
                onClick={() => saveEdit(todo.id)}
              />
            ) : (
              // Edit button when not in edit mode
              <CiEdit
                className="edit"
                onClick={() => editInputField(todo.id)}
              />
            )}
          </div>
        ))}
      </div>

      <AiOutlinePlus className="plus" onClick={addInputField} />
    </div>
  );
}
export default Home;
