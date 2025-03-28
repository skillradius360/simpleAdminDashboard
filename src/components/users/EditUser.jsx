import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditUserModal = ({ user, onClose, onUpdate }) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`https://reqres.in/api/users/${user.id}`, {
          first_name: firstName,
          last_name: lastName,
          email
        });
        onUpdate({ ...user, first_name: firstName, last_name: lastName, email });
      } catch (error) {
        console.error('Error updating user', error);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6">Edit User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required 
              />
            </div>
            <div>
              <label>Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required 
              />
            </div>
            <div>
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required 
              />
            </div>
            <div className="flex justify-between">
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };


  export default EditUserModal