import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import EditUserModal from "./EditUser"


const UserList = ({ onLogout }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
  
    useEffect(() => {
      fetchUsers();
    }, [page]);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
  
    const handleDelete = async (userId) => {
      try {
        await axios.delete(`https://reqres.in/api/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user', error);
      }
    };
  
    const handleEdit = (user) => {
      setSelectedUser(user);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      onLogout();
    };
  
    return (
      <div className="  container mx-auto p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div 
              key={user.id} 
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img 
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`} 
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex space-x-2 mt-4">
                <button 
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-black text-white rounded-md"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-center space-x-4 mt-6">
          {Array.from({ length: totalPages }, (x, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 rounded-md ${page === pageNum ? 'bg-black text-white' : 'bg-gray-200'}`}
            >
              {pageNum}
            </button>
          ))}
        </div>
  
        {selectedUser && (
          <EditUserModal 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)}
            onUpdate={(updatedUser) => {
              setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    );
  };


  export default UserList