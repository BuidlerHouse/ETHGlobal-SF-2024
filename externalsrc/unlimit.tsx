function PokemonNFTBattle() {
  const [hasMinted, setHasMinted] = useState(false);

  const opponentNFT = {
    name: 'Pikachu',
    description: 'An electric-type Pokémon known for its speed and electric attacks.',
    image: 'https://artefarm.s3.ap-southeast-1.amazonaws.com/hackathon/pikachu.jpg',
  };

  const generatedNFT = {
    name: 'Charizard',
    description: 'A fire-type Pokémon that has a flame at the tip of its tail.',
    image: 'https://artefarm.s3.ap-southeast-1.amazonaws.com/hackathon/Charizard.jpg',
  };

  const handleMint = () => {
    setHasMinted(true);
    alert('Your NFT has been minted! Get ready to battle!');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Top section with red background */}
      <div
        style={{
          backgroundColor: 'red',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1, // Takes up 50% of the viewport height
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Pokémon NFT Battle
        </h1>

        {/* Opponent's NFT */}
        <div
          style={{
            width: '200px',
            height: '300px',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            padding: '1rem',
            marginBottom: '2rem',
          }}
        >
          <h3>{opponentNFT.name}</h3>
          <img
            src={opponentNFT.image}
            alt={opponentNFT.name}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '0.5rem',
            }}
          />
          <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>
            {opponentNFT.description}
          </p>
        </div>
      </div>

      {/* Bottom section with blue background */}
      <div
        style={{
          backgroundColor: 'blue',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1, // Takes up 50% of the viewport height
        }}
      >
        {/* Your mintable NFT card (dashed outline before minting) */}
        <div
          style={{
            width: '300px',
            height: '400px',
            border: hasMinted ? 'none' : '2px dashed #ccc',
            backgroundColor: hasMinted ? '#fff' : 'transparent',
            borderRadius: '1rem',
            boxShadow: hasMinted ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
            textAlign: 'center',
            padding: '1rem',
            position: 'relative',
          }}
        >
          {hasMinted ? (
            <>
              <h3>{generatedNFT.name}</h3>
              <img
                src={generatedNFT.image}
                alt={generatedNFT.name}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
              <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                {generatedNFT.description}
              </p>
            </>
          ) : (<>
            <p style={{ fontSize: '1.25rem', color: '#aaa', marginTop: '50%' }}>
              Mint your NFT to start battling!
            </p> {/* Mint Button */}
        {!hasMinted && (
          <a
            href="https://onramp-sandbox.gatefi.com/?merchantId=3f68e9a6-5886-4d24-bb3b-b075033d51c1&cryptoCurrency=eth&cryptoAmount=0.1&cryptoAmountLock=True&cryptoCurrencyLock=True&fiatCurrency=USD&fiatCurrencyLock=True&wallet=0xe5107dee9CcC8054210FF6129cE15Eaa5bbcB1c0"
            style={{
              backgroundColor: '#ffcc00',
              color: '#000',
              padding: '0.75rem 1.5rem',
              fontSize: '1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              marginTop: '2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Mint Your Pokémon NFT
          </a>
        )}
            </>
          )}
        </div>

       
      </div>
    </div>
  );
}`
