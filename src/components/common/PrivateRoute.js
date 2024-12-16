/*  ilk hali 
// src/components/common/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Rol bilgisini saklayın

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && roles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

*/

/*
// src/components/common/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Rol bilgisini saklayın

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
*/

// src/components/common/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.role) {
    // Kullanıcı oturum açmamışsa
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(auth.role)) {
    // Kullanıcının rolü izin verilen roller arasında değilse
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
