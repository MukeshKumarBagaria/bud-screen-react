import React from 'react';
import './Layout.css';

/**
 * PageHeader — Blue banner displayed at the top of every process screen
 *
 * @param {string} title    — Main heading (e.g. "Create Demand Master")
 * @param {string} subtitle — Optional description line
 */
const PageHeader = ({ title, subtitle }) => (
    <div className="page-header">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
    </div>
);

export default PageHeader;
