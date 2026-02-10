import React from 'react';
import PageHeader from './PageHeader';
import './Layout.css';

/**
 * FormLayout — Full page wrapper composing PageHeader + body + action buttons
 *
 * @param {object}  header   — { title, subtitle } for PageHeader
 * @param {React.ReactNode} actions  — ActionButton components for the footer
 * @param {React.ReactNode} children — FormSection components
 */
const FormLayout = ({ header, actions, children }) => {
    return (
        <div className="form-layout">
            <div className="form-card">
                {header && (
                    <PageHeader
                        title={header.title}
                        subtitle={header.subtitle}
                        onBack={header.onBack}
                    />
                )}
                <div className="form-layout__body">
                    {children}
                </div>
            </div>

            <div className="form-layout__actions">
                {actions}
            </div>
        </div>
    );
};

export default FormLayout;
