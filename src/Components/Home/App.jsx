import React, { useState } from "react";

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

function Home() {
  const [inputFields, setInputFields] = useState([""]); // State to store input fields

  // Logout
  const logout = async (e) => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }

    e.preventDefault(); // Prevent the form from submitting
  };

  // Function to add new input field
  const addInputField = () => {
    setInputFields([...inputFields, ""]);
  };

  // Function to remove an input field
  const removeInputField = (index) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
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

      <div className="input-container">
        {inputFields.map((input, index) => (
          <div key={index}>
            <input type="checkbox" className="check" />

            <input
              className="text"
              type="text"
              value={input}
              onChange={(e) => {
                const updatedFields = [...inputFields];
                updatedFields[index] = e.target.value;
                setInputFields(updatedFields);
              }}
            />

            <AiOutlineDelete
              className="delete"
              onClick={() => removeInputField(index)}
            />
            <AiOutlinePlus
              className="plus"
              onClick={() => addInputField(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
