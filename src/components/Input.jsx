import React, { useEffect, useRef } from "react";
import axios from "axios";

function Input({ setData, api},toParent) {  //,{toParent}
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
  
    const handleAdd = () => {
      if (!titleRef.current || !bodyRef.current) return; // Ensure refs exist  ( *** )
  
      const addData = {
        title: titleRef.current.value, 
        body: bodyRef.current.value, 
      };
  
      api.post("/posts", addData)
        .then((res) => setData((prevData) => [...prevData, res.data])) // Append new data   ( *** )
        .catch((err) => console.error("Error adding post:", err));
  
      // Clear input fields
      titleRef.current.value = "";
      bodyRef.current.value = "";
    };

    useEffect(()=>{
      if (toParent) {
        toParent({titleRef,bodyRef})
      }
    },[toParent])

  return (
    <>
      <center>
        <input
          type="text"
          placeholder="title"
          className="border border-white m-2 p-2 rounded-xl"
          ref={titleRef}
        />
        <input
          type="text"
          placeholder="body"
          className="border border-white m-2 p-2 rounded-xl"
          ref={bodyRef}
        />
        <button
          className="bg-black p-3 px-5 text-LG rounded-xl m-2 "
          onClick={handleAdd}
        >
          Add
        </button>
      </center>
    </>
  );
}

export default Input;
