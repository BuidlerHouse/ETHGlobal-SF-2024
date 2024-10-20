function CryptoLandingPage () {
    return (
      <div
        style={{
          backgroundColor: '#f7fafc',
          minHeight: '100vh',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Navigation Bar */}
        <nav
          style={{
            width: '100%',
            backgroundColor: '#2d3748',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            CRYPTO NETWORK
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Validators
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Staking
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              DeFi
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Smart Contracts
            </a>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Telegram
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Discord
            </a>
          </div>
        </nav>
  
        {/* Hero Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '3rem',
            marginBottom: '3rem',
          }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '1rem' }}>
            Blockchain Infrastructure
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#718096', marginBottom: '1.5rem' }}>
            for Decentralized Applications
          </p>
          <button
            style={{
              backgroundColor: '#48bb78',
              padding: '0.75rem 1.5rem',
              fontSize: '1.25rem',
              color: 'white',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              border: 'none',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#38a169')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#48bb78')}
          >
            Explore dApps
          </button>
        </div>
  
        {/* Stats Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#2d3748', fontSize: '1.5rem', fontWeight: 'bold' }}>22,764</div>
            <div style={{ color: '#718096' }}>Active Validators</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#2d3748', fontSize: '1.5rem', fontWeight: 'bold' }}>1,234,567</div>
            <div style={{ color: '#718096' }}>Staked Tokens</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#2d3748', fontSize: '1.5rem', fontWeight: 'bold' }}>56,890</div>
            <div style={{ color: '#718096' }}>DeFi Transactions</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#2d3748', fontSize: '1.5rem', fontWeight: 'bold' }}>42,098</div>
            <div style={{ color: '#718096' }}>Smart Contracts</div>
          </div>
        </div>
      </div>
    );
  };