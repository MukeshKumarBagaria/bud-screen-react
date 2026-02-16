import React from 'react';
import { DataTable } from '../DataTable';

/**
 * Sample audit trail data — in production this would come from an API
 */
const SAMPLE_AUDIT_DATA = [
    {
        id: 1,
        user: 'Rajesh Kumar',
        role: 'Creator',
        action: 'Created',
        field: '—',
        oldValue: '—',
        newValue: '—',
        timestamp: '2026-02-15 10:30 AM',
    },
    {
        id: 2,
        user: 'Rajesh Kumar',
        role: 'Creator',
        action: 'Updated',
        field: 'Nomenclature (English)',
        oldValue: 'Revenue Dept',
        newValue: 'Revenue Department',
        timestamp: '2026-02-15 11:15 AM',
    },
    {
        id: 3,
        user: 'Rajesh Kumar',
        role: 'Creator',
        action: 'Submitted',
        field: '—',
        oldValue: '—',
        newValue: '—',
        timestamp: '2026-02-15 11:20 AM',
    },
];

/**
 * Column definitions for the audit trail table
 */
const AUDIT_COLUMNS = [
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role' },
    {
        key: 'action',
        label: 'Action',
        render: (value) => (
            <span className={`audit-trail__action audit-trail__action--${value.toLowerCase()}`}>
                {value}
            </span>
        ),
    },
    { key: 'field', label: 'Field' },
    {
        key: 'oldValue',
        label: 'Old Value',
        render: (value) => <span style={{ color: '#808080' }}>{value}</span>,
    },
    {
        key: 'newValue',
        label: 'New Value',
        render: (value) => <span style={{ fontWeight: 500 }}>{value}</span>,
    },
    {
        key: 'timestamp',
        label: 'Timestamp',
        render: (value) => <span style={{ color: '#666', fontSize: '14px' }}>{value}</span>,
    },
];

/**
 * AuditTrail — Read-only grid displaying complete change log
 * Uses the reusable DataTable component.
 *
 * @param {Array} data — Array of audit entries (defaults to sample data)
 */
const AuditTrail = ({ data = SAMPLE_AUDIT_DATA }) => {
    return (
        <DataTable
            columns={AUDIT_COLUMNS}
            data={data}
            emptyMessage="No audit records available."
        />
    );
};

export default AuditTrail;
