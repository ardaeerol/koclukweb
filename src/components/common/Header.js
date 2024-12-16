// src/components/common/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/Header.css'; // Stil dosyasını oluşturuldu

const Header = () => {
  const { auth, logout } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleLogout = () => {
    logout();


    localStorage.removeItem('role');
    localStorage.removeItem('username');

    navigate('/'); // Logout sonrası ana sayfaya yönlendirme
  };

  return (
    <header>
        <div className="logo">Koçluk Sistemi</div>
        <nav className="navbar">
        <Link to="/" className="navbar-brand">YKS Koçluk</Link>
        <div className="navbar-links">
            <Link to="/">Ana Sayfa</Link>
            {auth.role !== 'admin' && auth.role !== 'coach' && <Link to="/coaches">Koçlar</Link>}

            {auth.role === 'student' && <Link to="/booking">Danışmanlık Talebi</Link>}
            {auth.role === 'student' && <Link to="/messaging">Mesajlaşma</Link>}

            {auth.role === 'coach' && <Link to="/coach/profile">Profilim</Link>}
            {auth.role === 'coach' && <Link to="/coach/bookings">Ders Talepleri</Link>}
            {auth.role === 'coach' && <Link to="/coach/chat">Chat</Link>}

            {auth.role === 'admin' && <Link to="/admin/coaches">Koç Yönetimi</Link>} 
            {auth.role === 'admin' && <Link to="/admin/reports">Raporlar</Link>}
            {auth.role === 'admin' && <Link to="/admin/dashboard">Dashboard</Link>}
            
            {auth.role ? (
            <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
            ) : (
            <>
                <Link to="/login">Giriş Yap</Link>
                <Link to="/register">Kayıt Ol</Link>
            </>
            )}
        </div>
        </nav>
    </header>
  );


/* oturum açılınca giris yap kısmı kalkması için burası düzeltildi
  return (
    <header>
      <div className="logo">Koçluk Sistemi</div>
        <nav className="navbar">
        <Link to="/" className="navbar-brand">YKS Koçluk</Link>
        <div className="navbar-links">
            
            {auth.role ? (
            <>
                <Link to="/">Ana Sayfa</Link>
                <Link to="/coaches">Koçlar</Link>
                {auth.role === 'student' && <Link to="/booking">Danışmanlık Talebi</Link>}
                {auth.role === 'coach' && <Link to="/coach/profile">Profilim</Link>}
                {auth.role === 'admin' && <Link to="/admin/dashboard">Yönetim</Link>}
                <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
            </>  
            ) : (  
            <>
                <Link to="/login">Giriş Yap</Link>
                <Link to="/register">Kayıt Ol</Link>
            </>
            )}
        </div>
        </nav>
    </header>

  );        */
};

export default Header;
