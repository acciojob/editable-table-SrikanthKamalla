import React, { useRef, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const arrRef = useRef([]);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Ram",
      age: 23,
    },
    {
      id: 2,
      name: "Shyam",
      age: 30,
    },
    {
      id: 3,
      name: "Ali",
      age: 35,
    },
    {
      id: 4,
      name: "Shaw",
      age: 20,
    },
    {
      id: 5,
      name: "Tavneet",
      age: 47,
    },
    {
      id: 6,
      name: "Lakshmi",
      age: 40,
    },
  ]);

  let editedDataRef = useRef({});

  const handleChange = (id, field, value) => {
    if (!editedDataRef.current[id]) {
      editedDataRef.current[id] = {
        ...data.find((row) => row.id === id),
      };
    }
    editedDataRef.current[id][field] = value;
  };

  const handleSave = () => {
    let updatedData = data.map((row) => {
      return editedDataRef.current[row.id]
        ? editedDataRef.current[row.id]
        : row;
    });
    setData(updatedData);
    arrRef.current = Object.keys(editedDataRef.current);
    console.log(arrRef.current);
    arrRef.current = [];
    editedDataRef.current = {};
  };
  return (
    <div>
      {/* Do not remove the main div */}
      <h2>Track edited cells to log updates for future</h2>
      <form onSubmit={handleSave}>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Age</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.name}
                    name="name"
                    onChange={(e) =>
                      handleChange(row.id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={row.age}
                    name="age"
                    onChange={(e) =>
                      handleChange(row.id, "age", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default App;
