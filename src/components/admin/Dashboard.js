// src/components/admin/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeCoaches, setActiveCoaches] = useState(0);
  const [recentBookings, setRecentBookings] = useState(0);
  const metrics={activeUsers: activeUsers, activeCoaches:activeCoaches, recentBookings: recentBookings};

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get('/students/count'); // Backend'de '/admin/metrics' endpoint
        setActiveUsers(response.data);
        const response2 = await api.get('/coaches/count'); // Backend'de '/admin/metrics' endpoint
        setActiveCoaches(response2.data);
        const response3 = await api.get('/bookings/count/confirmed'); // Backend'de '/admin/metrics' endpoint
        setRecentBookings(response3.data);
      } catch (err) {
        console.error('Metrikler alınamadı:', err);
      }

    };

    fetchMetrics();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Yönetici Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Aktif Kullanıcılar</h3>
          <p>{metrics.activeUsers}</p>
        </div>
        <div className="dashboard-card">
          <h3>Aktif Koçlar</h3>
          <p>{metrics.activeCoaches}</p>
        </div>
        <div className="dashboard-card">
          <h3>Son Rezervasyonlar</h3>
          <p>{metrics.recentBookings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
