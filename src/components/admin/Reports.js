// src/components/admin/Reports.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Reports = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [coachs, setCoaches] = useState([]);
  const reports ={
    activeUsers: activeUsers, 
    coachs:coachs
  }

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/students/count'); // Backend'de '/admin/metrics' endpoint
        setActiveUsers(response.data);
        const response2 = await api.get('/coaches'); // Backend'de '/admin/metrics' endpoint
        setCoaches(response2.data);
      } catch (err) {
        console.error('Raporlar alınamadı:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="admin-reports">
      <h2>Raporlar</h2>
      <div className="report-section">
        <h3>Aktif Kullanıcılar</h3>
        <p>{reports.activeUsers}</p>
      </div>
      
      <div className="report-section">
        <h3>Koç Puanları</h3>
        <table>
          <thead>
            <tr>
              <th>Koç ID</th>
              <th>Ad Soyad</th>
              <th>Puan</th>
            </tr>
          </thead>
          <tbody>
            {reports.coachs.map((coach) => (
              <tr key={coach.id}>
                <td>{coach.id}</td>
                <td>{coach?.user?.fullName}</td>
                <td>{coach.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
