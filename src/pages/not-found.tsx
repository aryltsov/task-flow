import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
        textAlign: 'center',
      }}>
      <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
      <h2 style={{ margin: 0 }}>Page not found</h2>
      <p style={{ maxWidth: 600 }}>The requested page is missing or has been moved.</p>
      <Link
        to='/'
        style={{
          padding: '8px 16px',
          background: '#1976d2',
          color: '#fff',
          borderRadius: 6,
          textDecoration: 'none',
        }}>
        На главную
      </Link>
    </main>
  );
}
