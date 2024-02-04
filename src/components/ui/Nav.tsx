//* this is a horizontal nav
function Nav() {
    return (
        <>
            <nav>
                <ul className="flex-row">
                    <img src="./PoliticaLogo.svg" style={{maxWidth:'200px'}} />
                    <li className="flex-row">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="navButton active">
                            Home
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="navButton">
                            Features
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="navButton">
                            Pricing
                        </a>
                    </li>
                    <div className="flex-row" style={{gap: '22px'}}>
                        {/* Log In */}
                        <button className="secondary">Log in</button>
                        {/* Sign up  */}
                        <button className="primary">Sign up</button>
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default Nav;
