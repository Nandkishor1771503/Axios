import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "./Input";


function Home({titleRef,bodyRef}) {
  const [data, setData] = useState([]);
  const [updated,setupdateData] = useState(null)

  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err)); // runs when error occurs
  }, []);

  const Delete = (id) => {
    api
      .delete(`/posts/${id}`)
      .then(() => setData((prev) => prev.filter((e) => e.id !== id)));
  };


  const editData = (title,body)=>{
    titleRef.current.value =title
    bodyRef.current.value =body
  }


  return (
    <>
      <Input data={data} setData={setData} api={api}/>
      <div className="text-white bg-black grid grid-cols-3 ">
        {data.map(({ userId, id, title, body }) => {
          return (
            <div key={id} className="p-4 m-2 border border-white rounded-xl">
              <h1 className="text-red-500 mr-5 text-xl">{id}</h1>
              <span>section : {userId}</span>
              <h1 className="my-5"> Title: {title}</h1>
              <div className="my-5">
                <h2 className="inline mr-2">Body:</h2>
                {body}
              </div>
              <button className="m-2 bg-slate-700 p-3 rounded-xl text-lg" onClick={()=> editData(title,body)}>
                Edit
              </button>
              <button
                className="m-2 bg-slate-700 p-3 rounded-xl text-lg"
                onClick={() => Delete(id)}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          );
        })}
      </div>
    </>
    
  );
}

export default Home;
