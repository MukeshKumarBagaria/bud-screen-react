import React, { useState, useCallback } from 'react';
import { FormLayout, FormSection } from '../../components/Layout';
import InputField from '../../components/InputField';
import { RemarkField } from '../../components/RemarkField';
import { SectionTitle } from '../../components/SectionTitle';
import { AuditTrail } from '../../components/AuditTrail';
import { ActionButton } from '../../components/ActionButton';
import {
    DEMAND_MASTER_FIELDS,
    DEMAND_MASTER_ACTIONS,
    DEMAND_MASTER_HEADERS,
    DEMAND_MASTER_REMARKS,
} from './config';

/**
 * Generic DemandMaster screen driven by role config.
 * Renders fields based on role permissions and appropriate action buttons.
 *
 * @param {'creator'|'verifier'|'approver'} role
 */
const DemandMasterScreen = ({ role }) => {
    // Initialise form state from field config (includes default values for prefilled data)
    const [formData, setFormData] = useState(() => {
        const initial = {};
        DEMAND_MASTER_FIELDS.forEach(field => {
            if (field.defaultValue !== undefined) {
                initial[field.id] = field.defaultValue;
            }
        });
        return initial;
    });

    // Track which fetched fields have been toggled to edit mode
    const [editingFields, setEditingFields] = useState({});

    // Remark state (for verifier / approver)
    const [remarks, setRemarks] = useState('');

    const handleFieldChange = useCallback((fieldId) => (value) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
    }, []);

    const handleEditToggle = useCallback((fieldId) => () => {
        setEditingFields((prev) => ({ ...prev, [fieldId]: true }));
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
            setRemarks('');
            setEditingFields({});
        } else {
            // Validation: Mandatory remarks for Return / Revert
            if (variant === 'return' && !remarks.trim()) {
                alert('Please enter remarks. They are mandatory for this action.');
                return;
            }

            // eslint-disable-next-line no-console
            console.log(`[${role}] Action: ${variant}`, { ...formData, remarks });
        }
    }, [role, formData, remarks]);

    // Filter visible fields for this role
    const visibleFields = DEMAND_MASTER_FIELDS.filter(
        (field) => field.roles[role] !== 'hidden'
    );

    // Determine InputField type based on role mode and edit state
    const getInputType = (field) => {
        const mode = field.roles[role];
        const isEditing = editingFields[field.id];

        // If the user clicked "Edit" on a fetched field, switch to editable
        if (mode === 'fetched' && isEditing) {
            return field.type; // Use the original type (text, dropdown, radio, etc.)
        }

        if (mode === 'fetched') {
            if (field.type === 'dropdown') return 'fetchedDropdown';
            if (field.type === 'textarea') return 'fetchedTextarea';
            return 'fetched';
        }
        return field.type;
    };

    // Check if a field should show the Edit button
    const isFieldEditable = (field) => {
        const mode = field.roles[role];
        const canEdit = field.editableRoles?.includes(role);
        const isEditing = editingFields[field.id];
        return mode === 'fetched' && canEdit && !isEditing;
    };

    // Build actions & header
    const actions = DEMAND_MASTER_ACTIONS[role];
    const header = DEMAND_MASTER_HEADERS[role];
    const remarkConfig = DEMAND_MASTER_REMARKS[role];

    return (
        <FormLayout
            header={header}
        >
            <FormSection columns={2}>
                {visibleFields.map((field) => {
                    const inputType = getInputType(field);
                    const isFetched = inputType === 'fetched' || inputType === 'fetchedDropdown' || inputType === 'fetchedTextarea';
                    const editable = isFieldEditable(field);

                    return (
                        <InputField
                            key={field.id}
                            type={inputType}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={isFetched && !editable ? undefined : handleFieldChange(field.id)}
                            options={field.options}
                            required={field.required}
                            disabled={isFetched && field.type !== 'radio' && field.type !== 'switch'}
                            editable={editable}
                            onEdit={handleEditToggle(field.id)}
                            helperText={field.helperText}
                            {...(field.props || {})}
                        />
                    );
                })}
            </FormSection>

            {/* Role-specific remark field */}
            {remarkConfig && (
                <FormSection columns={1}>
                    <RemarkField
                        label={remarkConfig.label}
                        placeholder={remarkConfig.placeholder}
                        value={remarks}
                        onChange={setRemarks}
                        required={remarkConfig.required}
                        maxLength={remarkConfig.maxLength}
                    />
                </FormSection>
            )}

            {/* Audit Trail — verifier & approver only */}
            {role !== 'creator' && (
                <div style={{ padding: '0 24px', marginTop: '8px' }}>
                    <SectionTitle title="Audit Trail" />
                    <div style={{ marginTop: '16px' }}>
                        <AuditTrail />
                    </div>
                </div>
            )}

            <div style={{
                marginTop: '16px',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px',
                width: 'calc(100% - 48px)',
                margin: '16px auto 24px auto',
                backgroundColor: '#fff',
                position: 'sticky',
                bottom: '24px',
                zIndex: 100,
                border: '1px solid #E6E6E6',
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
