import React, { useState, useCallback } from 'react';
import { FormLayout, FormSection } from '../../components/Layout';
import InputField from '../../components/InputField';
import { ActionButton } from '../../components/ActionButton';
import {
    DEMAND_MASTER_FIELDS,
    DEMAND_MASTER_ACTIONS,
    DEMAND_MASTER_HEADERS,
} from './config';

/**
 * Generic DemandMaster screen driven by role config.
 * Renders fields based on role permissions and appropriate action buttons.
 *
 * @param {'creator'|'verifier'|'approver'} role
 */
const DemandMasterScreen = ({ role }) => {
    // Initialise form state from field config
    const [formData, setFormData] = useState(() => {
        // Initialize with default values
        const initial = {};
        DEMAND_MASTER_FIELDS.forEach(field => {
            if (field.defaultValue !== undefined) {
                initial[field.id] = field.defaultValue;
            }
        });
        return initial;
    });

    const handleFieldChange = useCallback((fieldId) => (value) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
    }, []);

    const handleAction = useCallback((variant) => () => {
        if (variant === 'reset') {
            const reset = {};
            DEMAND_MASTER_FIELDS.forEach((field) => {
                if (field.roles[role] !== 'hidden') {
                    reset[field.id] = '';
                }
            });
            setFormData(reset);
        } else {
            // eslint-disable-next-line no-console
            console.log(`[${role}] Action: ${variant}`, formData);
        }
    }, [role, formData]);

    // Filter visible fields for this role
    const visibleFields = DEMAND_MASTER_FIELDS.filter(
        (field) => field.roles[role] !== 'hidden'
    );

    // Determine InputField type based on role mode
    const getInputType = (field) => {
        const mode = field.roles[role];
        if (mode === 'fetched') {
            return field.type === 'dropdown' ? 'fetchedDropdown' : 'fetched';
        }
        return field.type;
    };

    // Build actions
    const actions = DEMAND_MASTER_ACTIONS[role];
    const header = DEMAND_MASTER_HEADERS[role];

    return (
        <FormLayout
            header={header}
        >
            <FormSection columns={2}>
                {visibleFields.map((field) => {
                    const inputType = getInputType(field);
                    const isFetched = field.roles[role] === 'fetched';

                    return (
                        <InputField
                            key={field.id}
                            type={inputType}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={isFetched ? undefined : handleFieldChange(field.id)}
                            options={field.options}
                            required={field.required}
                            disabled={isFetched && field.type !== 'radio' && field.type !== 'switch'}
                            helperText={field.helperText}
                            {...(field.props || {})}
                        />
                    );
                })}
            </FormSection>

            <div style={{
                marginTop: '16px',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px',
                width: 'fit-content',
                marginLeft: 'auto',
                marginRight: '24px',
                marginBottom: '24px',
                backgroundColor: '#fff',
            }}>
                {actions.map((action) => (
                    <ActionButton
                        key={action.variant}
                        variant={action.variant}
                        onClick={handleAction(action.variant)}
                    >
                        {action.label}
                    </ActionButton>
                ))}
            </div>
        </FormLayout>
    );
};

export default DemandMasterScreen;
