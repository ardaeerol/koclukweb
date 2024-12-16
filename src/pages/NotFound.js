// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Stil dosyasını oluşturabilirsiniz

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/">
        <button>Anasayfaya Dön</button>
      </Link>
    </div>
  );
};

export default NotFound;
