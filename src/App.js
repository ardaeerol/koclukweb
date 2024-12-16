// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/student/Home';
import CoachList from './components/student/CoachList';
import CoachProfile from './components/student/CoachProfile';
import Booking from './components/student/Booking';
import Messaging from './components/student/Messaging';
import ProfileManagement from './components/coach/ProfileManagement';
import BookingManagement from './components/coach/BookingManagement';
import Chat from './components/coach/Chat';
import Dashboard from './components/admin/Dashboard';
import CoachManagement from './components/admin/CoachManagement';
import ContentManagement from './components/admin/ContentManagement';
import Reports from './components/admin/Reports';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import './styles/styles.css';




function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            {/* Genel Sayfalar */}
            <Route path="/" element={<Home />} />
            <Route path="/coaches" element={<CoachList />} />
            <Route path="/coaches/:id" element={<CoachProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Sayfaları */}
            <Route 
              path="/booking" 
              element={
                <PrivateRoute roles={['student']}>
                  <Booking />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/messaging" 
              element={
                <PrivateRoute roles={['student']}>
                  <Messaging />
                </PrivateRoute>
              } 
            />

            {/* Coach Sayfaları */}
            <Route 
              path="/coach/profile" 
              element={
                <PrivateRoute roles={['coach']}>
                  <ProfileManagement />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/coach/bookings" 
              element={
                <PrivateRoute roles={['coach']}>
                  <BookingManagement />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/coach/chat" 
              element={
                <PrivateRoute roles={['coach']}>
                  <Chat />
                </PrivateRoute>
              } 
            />

            {/* Admin Sayfaları */}
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute roles={['admin']}>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/coaches" 
              element={
                <PrivateRoute roles={['admin']}>
                  <CoachManagement />
                </PrivateRoute>
              } 
            /> 
            <Route 
              path="/admin/reports" 
              element={
                <PrivateRoute roles={['admin']}>
                  <Reports />
                </PrivateRoute>
              } 
            />

            {/* 404 Sayfası */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
