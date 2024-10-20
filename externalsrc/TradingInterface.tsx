function TradingInterface() {
    return (
      <div
        style={{
          backgroundColor: '#1a202c',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <div style={{ display: 'flex', width: '100%', maxWidth: '96rem' }}>
         <div
            style={{
              backgroundColor: '#2d3748',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              width: '66.666%',
              marginRight: '1rem',
            }}
          >
            <div
              style={{
                color: '#a0aec0',
                fontSize: '0.875rem',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <span>ETH / USDC</span>
              <span>24/10/19 23:10</span>
            </div>
            <div
              style={{
                color: 'white',
                fontSize: '2.5rem',
                marginBottom: '0.5rem',
              }}
            >
              0.013621{' '}
              <span style={{ color: '#f56565', fontSize: '1.25rem' }}>
                -0.02%
              </span>
            </div>
            <div
              style={{
                height: '18rem',
                backgroundColor: '#4a5568',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#a0aec0',
              }}
            >
              Chart Goes Here
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
              {['15m', '1H', '4H', '1D', '1W'].map((label) => (
                <button
                  key={label}
                  style={{
                    backgroundColor: '#4a5568',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#2d3748',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              width: '33.333%',
            }}
          >
            <div style={{ color: '#a0aec0', marginBottom: '1rem' }}>Buy</div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#a0aec0', fontSize: '0.875rem' }}>From</label>
              <div
                style={{
                  backgroundColor: '#4a5568',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'white' }}>USDC</span>
                <input
                  type="number"
                  placeholder="0"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    textAlign: 'right',
                    flexGrow: 1,
                    marginLeft: '0.5rem',
                    border: 'none',
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    backgroundColor: '#4299e1',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    marginLeft: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Max
                </button>
              </div>
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#a0aec0', fontSize: '0.875rem' }}>To</label>
              <div
                style={{
                  backgroundColor: '#4a5568',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'white' }}>ETH</span>
                <input
                  type="number"
                  placeholder="0"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    textAlign: 'right',
                    flexGrow: 1,
                    marginLeft: '0.5rem',
                    border: 'none',
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    backgroundColor: '#4299e1',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    marginLeft: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Max
                </button>
              </div>
            </div>
  
            <button
              style={{
                backgroundColor: '#4299e1',
                color: 'white',
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }