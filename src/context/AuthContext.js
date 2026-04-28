import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const DEMO_USERS = [
  { id: 1, name: 'Admin Teacher', email: 'admin@edu.com', password: 'admin123', role: 'admin', avatar: 'AT', dept: 'Computer Science' },
  { id: 2, name: 'Alice Johnson', email: 'alice@student.com', password: 'pass123', role: 'student', avatar: 'AJ', dept: 'Computer Science', year: '3rd Year' },
  { id: 3, name: 'Bob Smith', email: 'bob@student.com', password: 'pass123', role: 'student', avatar: 'BS', dept: 'Data Science', year: '2nd Year' },
];

export function AuthProvider({ children }) {
 const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);
  const [users, setUsers] = useState(DEMO_USERS);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { success: true, role: found.role }; }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (data) => {
    const exists = users.find(u => u.email === data.email);
    if (exists) return { success: false, error: 'Email already registered' };
    const newUser = { ...data, id: Date.now(), avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase(), role: 'student' };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

 const logout = () => {
  localStorage.removeItem("user");
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, setUser, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
