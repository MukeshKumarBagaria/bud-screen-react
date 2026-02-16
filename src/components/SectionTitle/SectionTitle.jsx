import React from 'react';
import './SectionTitle.css';

/**
 * SectionTitle — Reusable section heading with yellow accent border
 *
 * Matches Figma: 4px yellow-500 left border, cream (#FFFBF0) background
 *
 * @param {string}        title     — Section heading text
 * @param {React.ReactNode} children — Optional content below the title
 * @param {object}        sx        — Optional inline style overrides
 */
const SectionTitle = ({ title, children, sx = {} }) => {
    return (
        <div className="section-title" style={sx}>
            <span className="section-title__text">{title}</span>
            {children}
        </div>
    );
};

export default SectionTitle;
