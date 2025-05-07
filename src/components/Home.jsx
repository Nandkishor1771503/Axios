import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";

function Home() {
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  const [loading, setLoding] = useState(false);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null); //  Track which item is being edited

  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  useEffect(() => {
    setLoding(true);
    api
      .get("/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoding(false);
      });
  }, []);

  const Delete = (id) => {
    setEditId(null);
    titleInputRef.current.value = "";
    bodyInputRef.current.value = "";
    api.delete(`/posts/${id}`).then(() => {
      setData((prev) => prev.filter((e) => e.id !== id));
    });
  };

  const Update = (id) => {
    const updatedTitle = titleInputRef.current.value;
    const updatedBody = bodyInputRef.current.value;

    api
      .put(`/posts/${id}`, {
        title: updatedTitle,
        body: updatedBody,
      })
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, title: updatedTitle, body: updatedBody }
              : item
          )
        );
        setEditId(null); // exit edit mode
      })
      .catch((err) => console.error("Failed to update:", err));
  };

  const getRefsFromChild = (titleEl, bodyEl) => {
    titleInputRef.current = titleEl;
    bodyInputRef.current = bodyEl;
  };

  return (
    <>
      <Input
        data={data}
        setData={setData}
        api={api}
        toParent={getRefsFromChild}
        setEditId={setEditId}
        editId={editId}
        Update={Update}
      />

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center bg-gray-500 bg-opacity-25 backdrop-blur-lg  rounded-2xl text-7xl  absolute">
          LOADING...
        </div>
      ) : (
        <div className="text-white bg-black grid grid-cols-3">
          {data.map(({ userId, id, title, body }) => (
            <div key={id} className="p-4 m-2 border border-white rounded-xl">
              <h1 className="text-red-500 text-xl">{id}</h1>
              <span>section : {userId}</span>
              <h1 className="my-5"> Title: {title}</h1>
              <div className="my-5">
                <h2 className="inline mr-2">Body:</h2>
                {body}
              </div>

              {editId === id ? (
                <button
                  className="m-2 bg-green-700 p-3 rounded-xl text-lg"
                  onClick={() => {
                    Update(id),
                      (titleInputRef.current.value = ""),
                      (bodyInputRef.current.value = "");
                  }}
                >
                  Done
                </button>
              ) : (
                <button
                  className="m-2 bg-slate-700 p-3 rounded-xl text-lg"
                  onClick={() => {
                    setEditId(id);
                    if (titleInputRef.current && bodyInputRef.current) {
                      titleInputRef.current.value = title;
                      bodyInputRef.current.value = body;
                    }
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="m-2 bg-slate-700 p-3 rounded-xl text-lg"
                onClick={() => Delete(id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;

// import React, { useRef } from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Input from "./Input";

// function Home() {
//   const titleInputRef = useRef(null);
//   const bodyInputRef = useRef(null);

//   const [data, setData] = useState([]);
//   const [edit, setEdit] = useState(0);
//   // console.log(edit);
//   // const fromChild = useRef();

//   const api = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com",
//   });

//   useEffect(() => {
//     api
//       .get("/posts")
//       .then((res) => setData(res.data))
//       .catch((err) => console.log(err)); // runs when error occurs
//   }, []);

//   const Delete = (id) => {
//     titleInputRef.current.value = "";
//     bodyInputRef.current.value = "";
//     setEdit(true);
//     api
//       .delete(`/posts/${id}`)
//       .then(() => setData((prev) => prev.filter((e) => e.id !== id)));
//   };

//   function Update(id) {
//     console.log(id)
//     const updatedTitle = titleInputRef.current.value;
//     const updatedBody = bodyInputRef.current.value;
//     api
//       .put(`/posts/${id}`, {
//         title: updatedTitle,
//         body: updatedBody,
//       })
//       .then(() => {
//         // Update the data array in state
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.id === id
//               ? { ...item, title: updatedTitle, body: updatedBody }
//               : item
//           )
//         );
//       })
//       .catch((err) => {
//         console.error("Failed to update:", err);
//       });
//   }

//   const getRefsFromChild = (titleEl, bodyEl) => {
//     (titleInputRef.current = titleEl), (bodyInputRef.current = bodyEl);
//     setEdit(!edit);
//   };

//   return (
//     <>
//       <Input
//         data={data}
//         setData={setData}
//         api={api}
//         toParent={getRefsFromChild}
//         setEdit={setEdit}
//         edit={edit}
//         Update={Update}
//       />{" "}
//       <div className="text-white bg-black grid grid-cols-3 ">
//         {data.map(({ userId, id, title, body }) => {
//           return (
//             <div key={id} className="p-4 m-2 border border-white rounded-xl">
//               <h1 className="text-red-500 mr-5 text-xl">{id}</h1>
//               <span>section : {userId}</span>
//               <h1 className="my-5"> Title: {title}</h1>
//               <div className="my-5">
//                 <h2 className="inline mr-2">Body:</h2>
//                 {body}
//               </div>
//               <button
//                 className="m-2 bg-slate-700 p-3 rounded-xl text-lg"
//                 onClick={() => {
//                   Update(id);
//                   console.log(id);
//                   setEdit(edit + 1);

//                   if (titleInputRef.current && bodyInputRef.current) {
//                     titleInputRef.current.value = title;
//                     bodyInputRef.current.value = body;
//                   }
//                 }}
//               >
//                 {edit == 1 ?
//                   "Edit"
//                  :
//                   <button onClick={setEdit(1)}>Done</button>
//                 }
//               </button>
//               <button
//                 className="m-2 bg-slate-700 p-3 rounded-xl text-lg"
//                 onClick={() => Delete(id)}
//               >
//                 {" "}
//                 Delete{" "}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default Home;
