// src/pages/Login.js
import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Login.css'; // Stil dosyasını oluşturabilirsiniz

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student', // Varsayılan rol
    userId: -1
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password, role } = formData; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tüm kullanıcıları al
      const response = await api.get('/users');
      const users = response.data; 
      // Girilen username, password ve role ile eşleşen kullanıcıyı bul
      const user = users.find(
        (user) =>
          user.username === username &&
          user.password === password &&
          user.role === role
      );

      if (user) {
        console.log("user:",user);
        // Kullanıcı bulundu, oturum aç
        login(role, username,user.id); // AuthContext'e role ve username'i gönder

        // Rol bazlı yönlendirme
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'coach') {
          navigate('/coach/profile');
        } else {
          navigate('/');
        }
      } else {
        // Kullanıcı bulunamadı
        setError('Giriş başarısız. Kullanıcı adı, şifre veya rol yanlış.');
      }
    } catch (err) {
      console.error('Kullanıcılar alınamadı:', err);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
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
            onChange={handleChange} // Burada artık setPassword yerine handleChange'ı kullanıldı 
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
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
