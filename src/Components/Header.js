function Header() {

    return (
        <div>
            <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <a href="/" style={{ textDecoration: 'none', cursor: 'pointer', display: 'inline-block' }}>
                    <img src="Homer_Simpson.png" alt="Icon" style={{ width: '70px', height: '70px', marginBottom: '-10px' }} />
                    <h1 style={{ fontSize: '50px', fontWeight: 'bold', color: 'black', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.24)', margin: 0, marginBottom: '50px' }}>Simpsons Quotes</h1>
                </a>
            </div>

        </div>
    )
}

export default Header;