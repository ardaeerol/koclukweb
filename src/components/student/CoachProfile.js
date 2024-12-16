// src/components/student/CoachProfile.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, Link } from 'react-router-dom';

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await api.get(`/coaches/${id}`);
        setCoach(response.data);
      } catch (err) {
        console.error('Koç alınamadı:', err);
      }
    };

    fetchCoach();
  }, [id]);

  if (!coach) return <p>Koç bilgileri Bulunamadı...</p>;

  return (
    <div className="coach-profile">
      <h2>{coach.user.fullName}</h2>
      <p><strong>Uzmanlık:</strong> {coach.expertise}</p>
      <p><strong>Eğitim:</strong> {coach.educationDetails}</p>
      <p><strong>Biyografi:</strong> {coach.biography}</p>
      <p><strong>Puan:</strong> {coach.rating}</p>
      <h3>Mevcut Uygunluk:</h3>
      <p>{coach.availability}</p>
      <Link to={`/booking?coachId=${coach.coachId}`}>
        <button>Danışmanlık Talebi Gönder</button>
      </Link>
    </div>
  );
};

export default CoachProfile;
