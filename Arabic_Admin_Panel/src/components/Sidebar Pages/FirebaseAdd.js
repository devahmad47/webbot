import React, { useState } from 'react';
import 'firebase/firestore';
import { db } from '../../Firebase';
import { addDoc, collection } from 'firebase/firestore';
function FirebaseAdd() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if(!formData.name || !formData.email || !formData.password){
        alert('Please fill all fields');
        return
    }
    const docRef = await addDoc(collection(db, 'ahmad'), formData);
      console.log('Document Collection ID: ', docRef.id);
      // Clear form data
      setFormData({
        name: '',
        email: '',
        password: ''
      });
    console.log('Data added successfully!', formData);
    } catch (error) {
      console.error('Error adding data: ', error);
    }
  };
  return (
    <div>
      <h2>Add Data to Firestore</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FirebaseAdd;
