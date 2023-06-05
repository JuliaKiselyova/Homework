import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const location = useLocation();
    const showBackButton = location.pathname !== '/';
    const showUsersButton = location.pathname !== '/users';

    return (
        <header>
            <nav>
                <ul>
                    {showBackButton && (
                        <li>
                            <Link to=".." className="back-button">
                                <FontAwesomeIcon icon={faChevronLeft} /> Back
                            </Link>
                        </li>
                    )}
                    {showUsersButton && (
                        <li>
                            <Link to="/" className="users-button">Users</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
