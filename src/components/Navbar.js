import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaUser, FaList, FaMusic, FaSignInAlt, FaBookmark, FaPlus } from 'react-icons/fa';

export default function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
    flexWrap: 'wrap',
  };

  const linkStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#444',
    fontWeight: '600',
    fontSize: '12px',
    minWidth: '60px',
    transition: 'all 0.3s ease-in-out',
  };

  const activeStyle = {
    backgroundColor: '#f4a261',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(244, 162, 97, 0.6)',
    transform: 'scale(1.05)',
  };

  const cardButtonStyle = {
    ...linkStyle,
    backgroundColor: '#6c63ff',
    color: 'white',
    boxShadow: '0 6px 15px rgba(108, 99, 255, 0.4)',
    padding: '12px 20px',
    borderRadius: '16px',
    fontWeight: '700',
    fontSize: '14px',
    minWidth: '80px',
    flexDirection: 'row',
    gap: '8px',
  };

  const cardButtonActiveStyle = {
    ...activeStyle,
    backgroundColor: '#574fd6',
    boxShadow: '0 8px 20px rgba(87, 79, 214, 0.7)',
    transform: 'scale(1.1)',
  };

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="Inicio">
        <FaHome size={20} />
        <span>Inicio</span>
      </NavLink>

      <NavLink to="/search" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="Buscar">
        <FaSearch size={20} />
        <span>Buscar</span>
      </NavLink>

      <NavLink
        to="/add-top"
        style={({ isActive }) => (isActive ? { ...cardButtonStyle, ...cardButtonActiveStyle } : cardButtonStyle)}
        title="Añadir Top"
      >
        <FaPlus size={18} />
        <span>Añadir</span>
      </NavLink>

      <NavLink to="/toplist" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="Top List">
        <FaList size={20} />
        <span>Top</span>
      </NavLink>

      <NavLink to="/ost" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="OST">
        <FaMusic size={20} />
        <span>OST</span>
      </NavLink>

      <NavLink to="/watchlist" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="Por Ver">
        <FaBookmark size={20} />
        <span>Por Ver</span>
      </NavLink>

      <NavLink to="/profile" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="Perfil">
        <FaUser size={20} />
        <span>Perfil</span>
      </NavLink>

      <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} title="Login">
        <FaSignInAlt size={20} />
        <span>Login</span>
      </NavLink>
    </nav>
  );
}
