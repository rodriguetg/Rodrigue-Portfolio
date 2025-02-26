export default function Error({ statusCode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1rem',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
        Oups ! Quelque chose s'est mal passé
      </h1>
      <p style={{ color: '#4b5563', marginBottom: '1.5rem', maxWidth: '32rem' }}>
        {statusCode
          ? `Une erreur ${statusCode} est survenue sur le serveur`
          : 'Une erreur est survenue côté client'}
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        Rafraîchir la page
      </button>
    </div>
  )
}
