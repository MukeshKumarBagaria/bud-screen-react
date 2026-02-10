/**
 * DemandMaster — Field configuration & role permissions
 *
 * Single source of truth for all fields across Create/Verify/Approve screens.
 * Each field defines its label, input type, options, and per-role behaviour.
 *
 * Role modes:
 *   'editable'  → normal input (white bg, user can type)
 *   'fetched'   → readonly, auto-filled (blue-10 bg)
 *   'hidden'    → field not rendered for this role
 */

export const DEMAND_MASTER_FIELDS = [
    {
        id: 'demandNo',
        label: 'Demand No',
        type: 'text',
        placeholder: 'Enter 3 digit demand no',
        required: true,
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
    },
    {
        id: 'demandType',
        label: 'Demand Type',
        type: 'radio',
        required: true,
        defaultValue: 'normal',
        options: [
            { value: 'common', label: 'Common' },
            { value: 'normal', label: 'Normal' },
        ],
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
    },
    {
        id: 'nomenclatureEn',
        label: 'Nomenclature (English)',
        type: 'text',
        placeholder: 'Enter description in English',
        required: true,
        roles: { creator: 'editable', verifier: 'editable', approver: 'fetched' },
    },
    {
        id: 'nomenclatureHi',
        label: 'Nomenclature (Hindi)',
        type: 'text',
        placeholder: 'विवरण हिंदी में दर्ज करें',
        required: false,
        roles: { creator: 'editable', verifier: 'editable', approver: 'fetched' },
    },
    {
        id: 'bookNo',
        label: 'Book No',
        type: 'dropdown',
        placeholder: '-- Please Select --',
        required: true,
        options: [
            { value: 'book1', label: 'Book 1' },
            { value: 'book2', label: 'Book 2' },
            { value: 'book3', label: 'Book 3' },
        ],
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
    },
    {
        id: 'activeStatus',
        label: 'Active Status',
        type: 'switch',
        required: true,
        helperText: 'Enable or disable this demand number immediately.',
        defaultValue: 'active',
        options: [{ value: 'active', label: 'Active' }],
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
        props: {
            fullWidth: true,
            sx: {
                gridColumn: '1 / -1',
                backgroundColor: '#F7FAFC', // light blue-grey
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                display: 'grid',
                // Define grid areas:
                // [label   switch]
                // [subtext switch]
                gridTemplateAreas: '"label switch" "subtext switch"',
                gridTemplateColumns: '1fr auto',
                gap: '4px',
                alignItems: 'center',

                // Target children to place them in grid areas
                '& .input-field-label': {
                    gridArea: 'label',
                    margin: 0,
                    alignSelf: 'end',
                },
                '& .input-field-subtext': {
                    gridArea: 'subtext',
                    margin: 0,
                    alignSelf: 'start',
                },
                '& .MuiFormControl-root': {
                    gridArea: 'switch',
                    width: 'auto',
                    margin: 0
                },
                '& .input-field-switch-label': {
                    margin: 0
                }
            }
        }
    },
];

/**
 * Action button configs per role
 */
export const DEMAND_MASTER_ACTIONS = {
    creator: [
        { variant: 'submit', label: 'Submit' },
        { variant: 'draft', label: 'Save as Draft' },
        { variant: 'reset', label: 'Reset' },
    ],
    verifier: [
        { variant: 'submit', label: 'Verify' },
        { variant: 'return', label: 'Return' },
        { variant: 'hold', label: 'Hold' },
    ],
    approver: [
        { variant: 'submit', label: 'Approve' },
        { variant: 'reject', label: 'Reject' },
        { variant: 'return', label: 'Return' },
    ],
};

/**
 * Page header configs per role
 */
export const DEMAND_MASTER_HEADERS = {
    creator: {
        title: 'Create Demand Master',
        subtitle: 'Fill in the details below to create a new demand record.',
    },
    verifier: {
        title: 'Verify Demand Master',
        subtitle: 'Review and verify the demand record details.',
    },
    approver: {
        title: 'Approve Demand Master',
        subtitle: 'Review and approve the demand record.',
    },
};
