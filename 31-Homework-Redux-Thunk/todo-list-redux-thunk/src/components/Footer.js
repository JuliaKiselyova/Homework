import React, { useState } from 'react';

function Footer({ count, onFilterChange }) {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

    return (
        <footer>
            {count} items left
            <div className="footer-text">
                <button
                    onClick={() => handleFilterChange('all')}
                    className={activeFilter === 'all' ? 'filter-button active' : 'filter-button'}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterChange('done')}
                    className={activeFilter === 'done' ? 'filter-button active' : 'filter-button'}
                >
                    Only Done
                </button>
                <button
                    onClick={() => handleFilterChange('not-done')}
                    className={activeFilter === 'not-done' ? 'filter-button active' : 'filter-button'}
                >
                    Not Done
                </button>
                <p>© 2023 My Website. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
