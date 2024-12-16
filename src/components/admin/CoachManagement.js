
// src/components/admin/CoachManagement.js
import React, { useEffect, useState, useContext} from 'react';
import api from '../../services/api';  
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const CoachManagement = () => {
  const [coaches, setCoaches] = useState([]);
  const [newCoach, setNewCoach] = useState({
    user:{
      username: '',
      password: '',
      email: '',
      role: 'coach',
      fullName: '',
      phoneNumber: '',
      createdAt: new Date().toISOString() 
    }, 
    biography: '',
    educationDetails: '',
    expertise: '',
    availability: '',
    rating: 0,
  });
   
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coachToDelete, setCoachToDelete] = useState(null);
  const [success, setSuccess] = useState('');

  // Tüm koçları backend'den çekmek için fonksiyon
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

  const [bookings, setBookings] = useState([]);
  const fetchBookings = async (id) => { 
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/bookings/get-by-coach-id/${id}`);
      setBookings(response.data);
    } catch (err) {     
      console.error('Rezervasyonlar alınamadı:', err);
      setError('Rezervasyonlar alınamadı. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  // Form değişikliklerini yönetmek için fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update user fields or other fields
    if (name in newCoach.user) {
      setNewCoach((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          [name]: value,
        },
      }));
    } else {
      setNewCoach((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError(""); 
    try {
      await api.post("/coaches", newCoach); // Replace with your API endpoint
      setSuccess("Coach successfully added!");
      setError("");

      // Reset form fields
      setNewCoach({
        user: {
          username: "",
          password: "",
          email: "",
          role: "coach",
          fullName: "",
          phoneNumber: "",
          createdAt: new Date().toISOString(),
        },
        biography: "",
        educationDetails: "",
        expertise: "",
        availability: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error adding coach:", error);
      setError("Failed to add coach. Please try again.");
    }
    fetchCoaches(); 
  };

  // Koç silmek için fonksiyon
  const handleDeleteCoach = async () => {
    if (!coachToDelete) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post(`/coaches/delete-coach`,{id:coachToDelete.id} );
      setSuccess('Koç başarıyla silindi.');
      fetchCoaches(); // Listeyi güncelle
    } catch (err) {
      console.error(err);
      setError('Koç silinemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setCoachToDelete(null);
    }
  };
console.log("bookings: ",bookings)
  // Silme modalını açmak için fonksiyon
  const openDeleteModal = (id, name) => { 
    fetchBookings(id);
    setCoachToDelete({ id, name });
    setShowDeleteModal(true);
  };

  // Silme modalını kapatmak için fonksiyon
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCoachToDelete(null);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">
        Koç Yönetimi <i className="bi bi-people-fill"></i>
      </h2>

      <Card className="mb-4">
        <Card.Header>
          <h5>Yeni Koç Ekle</h5>
        </Card.Header>
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="username">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-plus-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="username"
                      value={newCoach.username}
                      onChange={handleChange}
                      placeholder="Kullanıcı adını girin"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="password">
                  <Form.Label>Şifre</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      value={newCoach.password}
                      onChange={handleChange}
                      placeholder="Şifrenizi girin"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-envelope-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={newCoach.email}
                      onChange={handleChange}
                      placeholder="Email adresinizi girin"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="fullName">
                  <Form.Label>Ad Soyad</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={newCoach.fullName}
                      onChange={handleChange}
                      placeholder="Adınızı ve soyadınızı girin"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Telefon Numarası</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-telephone-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={newCoach.phoneNumber}
                      onChange={handleChange}
                      placeholder="Telefon numaranızı girin"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="expertise">
                  <Form.Label>Uzmanlık</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-journal-text"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="expertise"
                      value={newCoach.expertise}
                      onChange={handleChange}
                      placeholder="Matematik, Fizik, vb."
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
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
                      value={newCoach.biography}
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
                      value={newCoach.educationDetails}
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
                      value={newCoach.availability}
                      onChange={handleChange}
                      placeholder="Uygun olduğunuz saatleri buraya yazın..."
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
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
                  Ekleniyor...
                </>
              ) : (
                <>
                  Koç Ekle <i className="bi bi-plus-circle-fill"></i>
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h5>Mevcut Koçlar</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center my-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Koç ID</th>
                  <th>Ad Soyad</th>
                  <th>Email</th>
                  <th>Uzmanlık</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach) => (
                  <tr key={coach.id}>
                    <td>{coach.id}</td>
                    <td>{coach.user.fullName}</td>
                    <td>{coach.user.email}</td>
                    <td>{coach.expertise}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(coach.id, coach.user.fullName)}
                      >
                        <i className="bi bi-trash-fill"></i> Sil
                      </Button>
                      {/* Düzenleme için başka butonlar ekleyebilirsiniz */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Silme Onayı Modalı */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Koçu Sil</Modal.Title>
        </Modal.Header>
        {bookings.length > 0 && (
          <div>
             <p> 
              <strong> {coachToDelete?.name} adlı koçun randevuları bulunmaktadır! </strong> 
            </p>
            <h5>Rezervasyonlar</h5>
            <Table striped bordered hover responsive>
              <thead>
          <tr>
            <th>Rezervasyon ID</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Öğrenci Adı</th>
          </tr>
              </thead>
              <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.bookingDate?.split(' ')[0].split('-').reverse().join('-')}</td> 
              <td>{booking.bookingDate?.split(' ')[1]}</td>
              <td>{booking.student?.user?.fullName}</td>
            </tr>
          ))}
              </tbody>
            </Table>
            <p> 
              <Alert>Bu işlem, ilgili koçun tüm Rezervasyonlarının ve Kullanıcı hesabınının silinmesine neden olur </Alert>
            </p>
          </div>
        )}
        <Modal.Body>
          {coachToDelete && ( 
            <p> 
              <strong>{coachToDelete?.name}</strong> adlı koçu silmek istediğinize emin misiniz?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            İptal <i className="bi bi-x-circle-fill"></i>
          </Button>
          <Button variant="danger" onClick={handleDeleteCoach}>
            Sil <i className="bi bi-trash-fill"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CoachManagement;
