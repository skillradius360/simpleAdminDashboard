import React,{useState,useMemo,useEffect} from "react";

const UserList = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      }
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

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      `${user.first_name} ${user.last_name} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h1 className="text-2xl font-bold">AdminPanel</h1>
        <div className="mb-6">
        <input 
          type="text"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[40vw] px-3 py-2 mt-6 border rounded-md"
        />
      </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>

    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(user => (
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
                className="px-3 py-1 bg-yellow-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {searchTerm && (
        <div className="text-center mt-4 text-gray-600">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded-md ${page === pageNum ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
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
