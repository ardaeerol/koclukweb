// src/components/student/Booking.js
import React, { useState, useEffect, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const { auth } = useContext(AuthContext); // AuthContext'ten role ve username al
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [student, setStudent] = useState(null);

  // Koçların listesini backend'den çekmek için useEffect
  
  const fetchStudent = async () => {
    console.log("auth.userId: ",auth.userId)
    try {
      if (!auth.userId) {
        console.error('User ID is not defined in auth context');
        return;
      }
      const response = await api.get(`/students/get-by-user-id/${auth.userId}`);
      setStudent(response.data);
    } catch (err) {
      console.error('Failed to fetch student:', err);
    }
  }; 
  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/coaches');
        setCoaches(response.data);
      } catch (err) {
        console.error('Koçlar alınamadı:', err);
        setError('Koçlar alınamadı. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
    fetchCoaches();
  }, []); 

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!selectedCoach) {
      setError('Lütfen bir koç seçin.');
      setSuccess(''); 
      return;
    } 
    try {
      setLoading(true);
      // Booking nesnesini backend'e uygun formatta gönderiyoruz
      const bookingData = {

        coachId: selectedCoach,
        message: message,
        studentId: student?.id, // AuthContext'ten username alınıyor 
        bookingDate : new Date().toISOString().slice(0, 19).replace('T', ' '),
        //enum BookingStatus {        PENDING,        APPROVED,        CANCELED   }
        status: 'PENDING'
      };
      const response = await api.post('/bookings', bookingData);
      setSuccess('Danışmanlık talebiniz başarıyla gönderildi.');
      setError('');
      setSelectedCoach('');
      setMessage('');
    } catch (err) {
      console.error('Talep gönderilemedi:', err);
      setError('Talep gönderilirken bir hata oluştu.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">
        Danışmanlık Talebi Gönder <i className="bi bi-envelope-fill"></i>
      </h2>
      <Card>
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="selectedCoach">
                  <Form.Label>Koç Seçin</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>
                    <Form.Select
                      value={selectedCoach}
                      onChange={(e) =>  setSelectedCoach(e.target.value)} 
                      required
                    >
                      <option value="">Bir koç seçin</option>
                      {coaches.map((coach) => (
                        <option key={coach.coachId} value={coach.id}>
                          {coach.user.fullName} - {coach.expertise}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="message">
                  <Form.Label>Mesajınız</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-chat-dots-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Mesajınızı buraya yazın..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Gönder <i className="bi bi-send-fill"></i>
                    </>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left-circle-fill"></i> Geri Dön
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
