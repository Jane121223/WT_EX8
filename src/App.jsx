import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  const getData = async () => {
    const res = await axios.get('/api/get');
    setData(res.data);
  };

  const addData = async () => {
    await axios.post('/api/add', form);
    setForm({ name: '', description: '' });
    getData();
  };

  const deleteData = async (id) => {
    await axios.delete(`/api/delete/${id}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app-container">
      <h2> Digital Portfolio and Resume Builder</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button onClick={addData}>Add</button>
      </div>

      <h3>Saved Portfolios</h3>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <span>
              <strong>{item.name}</strong> — {item.description}
            </span>
            <button className="delete-button" onClick={() => deleteData(item._id)}>
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
