// src/components/coach/ProfileManagement.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
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

const ProfileManagement = () => {
  const { auth } = useContext(AuthContext); // Kullanıcı bilgilerini AuthContext'ten al
  const [profile, setProfile] = useState({
    biography: '',
    educationDetails: '',
    expertise: '',
    availability: '',
    rating: 0,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/coaches/${auth.userId}`); // Backend'de '/coaches/me' endpoint
        setProfile(response.data);
      } catch (err) {
        console.error('Profil alınamadı:', err);
        setError('Profil alınamadı. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.post('/coaches/update-coach', profile); // Backend'de '/coaches/me' endpoint
      setMessage('Profiliniz başarıyla güncellendi.');
    } catch (err) {
      console.error('Profil güncellenemedi:', err);
      setError('Profil güncellenemedi. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">
        Profil Yönetimi <i className="bi bi-gear-fill"></i>
      </h2>
      <Card>
        <Card.Body>
          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
              </Spinner>
            </div>
          )}
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="biography">
                    <Form.Label>Biyografi</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-info-circle-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="biography"
                        value={profile.biography}
                        onChange={handleChange}
                        placeholder="Biyografinizi buraya yazın..."
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="educationDetails">
                    <Form.Label>Eğitim Detayları</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-mortarboard-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="educationDetails"
                        value={profile.educationDetails}
                        onChange={handleChange}
                        placeholder="Eğitim detaylarınızı buraya yazın..."
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="expertise">
                    <Form.Label>Uzmanlık Alanı</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-journal-text"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="expertise"
                        value={profile.expertise}
                        onChange={handleChange}
                        placeholder="Örneğin, Matematik, Fizik..."
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="availability">
                    <Form.Label>Uygunluk</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-calendar-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="availability"
                        value={profile.availability}
                        onChange={handleChange}
                        placeholder="Uygun olduğunuz saatleri buraya yazın..."
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              {/* Rating genellikle otomatik olarak hesaplanır, manuel giriş gerekmez */}
              <Button variant="success" type="submit" className="w-100">
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                    Güncelleniyor...
                  </>
                ) : (
                  <>
                    Profili Güncelle <i className="bi bi-arrow-repeat"></i>
                  </>
                )}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileManagement;
