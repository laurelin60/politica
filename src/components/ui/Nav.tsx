//* this is a horizontal nav
function Nav() {
    return (
        <>
            <nav>
                <ul className="flex-row">
                    <li className="flex-row">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Home
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Features
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Pricing
                        </a>
                    </li>
                    <div className="flex-row">
                        {/* Sign up  */}
                        <button className="primary">Sign up</button>
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default Nav;
