import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Usuario registrado exitosamente');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Sesión iniciada');
      }
      navigate('/profile'); // Redirigir al perfil
    } catch (err) {
      // Mostrar error personalizado
      switch (err.code) {
        case 'auth/invalid-email':
          setErrorMsg('Correo inválido.');
          break;
        case 'auth/user-not-found':
          setErrorMsg('Usuario no encontrado.');
          break;
        case 'auth/wrong-password':
          setErrorMsg('Contraseña incorrecta.');
          break;
        case 'auth/email-already-in-use':
          setErrorMsg('Este correo ya está registrado.');
          break;
        case 'auth/weak-password':
          setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
          break;
        default:
          setErrorMsg('Error: ' + err.message);
      }
    }
  };

  return (
    <div>
      <h1>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h1>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0' }}
          minLength={6}
        />
        <button type="submit">{isRegistering ? 'Registrarme' : 'Ingresar'}</button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <p>
        {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  );
}
