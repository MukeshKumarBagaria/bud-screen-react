import React from 'react';
import './Layout.css';

/**
 * FormSection — Card wrapper for a group of form fields
 *
 * @param {string}  title    — Optional section heading (renders with bottom border)
 * @param {number}  columns  — Grid columns: 1, 2, or 3 (default: 2)
 * @param {React.ReactNode} children — InputField components
 */
const FormSection = ({ title, columns = 2, children, className = '' }) => (
    <div className={`form-section ${className}`}>
        {title && <h2 className="form-section__title">{title}</h2>}
        <div className={`form-section__grid form-section__grid--${columns}`}>
            {children}
        </div>
    </div>
);

export default FormSection;
