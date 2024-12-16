// src/pages/Register.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Stil dosyasını oluşturabilirsiniz

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    role: 'student', // Varsayılan rol
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password, email, fullName, phoneNumber, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await api.post('/users/create-with-role', { ...formData });
      navigate('/login');
    } catch (err) {
      setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ad Soyad:</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefon Numarası:</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rol Seçin:</label>
          <select name="role" value={role} onChange={handleChange} required>
            <option value="student">Öğrenci</option>
            <option value="coach">Koç</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
