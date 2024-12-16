/* çalışan basit tasarımlı hali

// src/components/student/Home.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import '../../styles/Home.css'; 

const Home = () => {
  const [featuredCoaches, setFeaturedCoaches] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await api.get('/coaches'); 
        const coaches = response.data;

        // En yüksek 3 puanlı koçu seç
        const topCoaches = coaches
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        setFeaturedCoaches(topCoaches);
      } catch (err) {
        console.error('Koçlar alınamadı:', err);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <div className="welcome">
      <h1>Sınavlara En İyi Koçlarla Hazırlanın!</h1>
      <p>Başarılı bir eğitim dönemi için deneyimli koçlarımızdan destek alın.</p>
      <Link to="/coaches">
        <button>Koçları Görüntüle</button>
      </Link>
      <h2>En Yüksek Memnuniyet Puanlı Hocalar Burada</h2>
      <div className="feature-grid">
        {featuredCoaches.map((coach) => (
          <div key={coach.coachId} className="feature-item">
            <h3>{coach.user.fullName}</h3>
            <p>Uzmanlık: {coach.expertise}</p>
            <p>Puan: {coach.rating}</p>
            <Link to={`/coaches/${coach.coachId}`}>
              <button>Detayları Gör</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

*/

// src/components/student/Home.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import '../../styles/Home.css'; // Opsiyonel, ek stiller için

<img
  src="/images/Teacher-vector.png" // Projenizdeki uygun bir görseli kullanın
  alt="Eğitim"
  className="img-fluid rounded"
/>


const Home = () => {
  const [featuredCoaches, setFeaturedCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/coaches'); 
        const coaches = response.data;

        // En yüksek 3 puanlı koçu seç
        const topCoaches = coaches
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        setFeaturedCoaches(topCoaches);
      } catch (err) {
        console.error('Koçlar alınamadı:', err);
        setError('Koçlar alınamadı. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="display-4">Sınavlara En İyi Koçlarla Hazırlanın!</h1>
          <p className="lead">
            Başarılı bir eğitim dönemi için deneyimli koçlarımızdan destek alın.
          </p>
          <Link to="/coaches">
            <Button variant="primary" size="lg">
              Koçları Görüntüle <i className="bi bi-arrow-right-circle-fill ms-2"></i>
            </Button>
          </Link>
        </Col>
        <Col md={6}>
          {/* İsteğe bağlı olarak bir görsel ekleyebilirsiniz */}
          <img
            src="/images/Teacher-vector.png" // Projenizdeki uygun bir görseli kullanın
            alt="Eğitim"
            className="img-fluid rounded"
          />
        </Col>
      </Row>

      {/* Featured Coaches Section */}
      <h2 className="mb-4 text-center">En Yüksek Memnuniyet Puanlı Hocalar</h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && featuredCoaches.length === 0 && (
        <p className="text-center">Hiç koç bulunamadı.</p>
      )}

      <Row>
        {featuredCoaches.map((coach) => (
          <Col key={coach.coachId} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={coach.profilePicture || '/images/Teacher-vector.png'} // Varsayılan resim
                alt={`${coach.user.fullName} Fotoğrafı`}
                style={{ objectFit: 'cover', height: '250px' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{coach.user.fullName}</Card.Title>
                <Card.Text>
                  <strong>Uzmanlık:</strong> {coach.expertise}
                  <br />
                  <strong>Puan:</strong> {coach.rating} / 5
                </Card.Text>
                <div className="mt-auto">
                  <Link to={`/coaches/${coach.userId}`}>
                    <Button variant="primary" className="w-100">
                      Detayları Gör <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
