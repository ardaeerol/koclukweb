
// src/components/student/CoachList.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Spinner,
  Alert,
} from 'react-bootstrap';

const CoachList = () => {
  const [allCoaches, setAllCoaches] = useState([]); // Tüm koçları saklamak için
  const [displayedCoaches, setDisplayedCoaches] = useState([]); // Filtrelenmiş koçları saklamak için
  const [filters, setFilters] = useState({
    expertise: '',
    minRating: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Tüm koçları backend'den çekmek için fonksiyon
  const fetchCoaches = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/coaches');
      setAllCoaches(response.data);
      setDisplayedCoaches(response.data); // Başlangıçta tüm koçlar gösterilir
    } catch (err) {
      console.error('Koçlar alınamadı:', err);
      setError('Koçlar alınamadı. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  console.log('Koçlar:', allCoaches);
  useEffect(() => {
    fetchCoaches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtre değişikliklerini yönetmek için fonksiyon
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filtreleme işlemini gerçekleştiren fonksiyon
  const applyFilters = () => {
    let filtered = allCoaches;

    if (filters.expertise.trim() !== '') {
      filtered = filtered.filter((coach) =>
        coach.expertise.toLowerCase().includes(filters.expertise.toLowerCase())
      );
    }

    if (filters.minRating !== '') {
      const min = parseFloat(filters.minRating);
      if (!isNaN(min)) {
        filtered = filtered.filter((coach) => coach.rating >= min);
      }
    }

    setDisplayedCoaches(filtered);
  };

  // Filtreleri uygulamak için form gönderme işlemi
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Filtreleri sıfırlamak için fonksiyon
  const resetFilters = () => {
    setFilters({
      expertise: '',
      minRating: '',
    });
    setDisplayedCoaches(allCoaches);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">
        Koçları Ara <i className="bi bi-search"></i>
      </h2>
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleFilterSubmit}>
            <Row className="align-items-end">
              <Col md={5}>
                <Form.Group controlId="expertise">
                  <Form.Label>Uzmanlık</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-journal-text"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Matematik, Fizik, vb."
                      name="expertise"
                      value={filters.expertise}
                      onChange={handleFilterChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="minRating">
                  <Form.Label>Minimum Puan</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-star-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      name="minRating"
                      value={filters.minRating}
                      onChange={handleFilterChange}
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4} className="text-md-start">
                <Button variant="primary" type="submit" className="me-2">
                  Filtrele <i className="bi bi-funnel-fill"></i>
                </Button>
                <Button variant="secondary" onClick={resetFilters}>
                  Sıfırla <i className="bi bi-x-circle-fill"></i>
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

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

      {!loading && !error && displayedCoaches.length === 0 && (
        <p className="text-center">Hiç koç bulunamadı.</p>
      )}

      <Row>
        {displayedCoaches.map((coach) => (
          <Col key={coach.coachId} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={coach.profilePicture || '/default-coach.png'}
                alt={`${coach.user.fullName} Fotoğrafı`}
                style={{ objectFit: 'cover', height: '200px' }}
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
                      Detayları Gör <i className="bi bi-arrow-right-circle-fill"></i>
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

export default CoachList;
