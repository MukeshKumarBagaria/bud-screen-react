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
 *
 * editableRoles:
 *   Array of roles that can click "Edit" to modify a fetched field.
 *   Only applies when the field is in 'fetched' mode for that role.
 */

export const DEMAND_MASTER_FIELDS = [
    {
        id: 'demandNo',
        label: 'Demand No',
        type: 'text',
        placeholder: 'Enter 3 digit demand no',
        required: true,
        defaultValue: '045',
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
        editableRoles: [],
    },
    {
        id: 'demandType',
        label: 'Demand Type',
        type: 'radio',
        required: true,
        defaultValue: 'common',
        options: [
            { value: 'common', label: 'Common' },
            { value: 'normal', label: 'Normal' },
        ],
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
        editableRoles: ['verifier', 'approver'],
    },
    {
        id: 'nomenclatureEn',
        label: 'Nomenclature (English)',
        type: 'text',
        placeholder: 'Enter description in English',
        required: true,
        defaultValue: 'Revenue Department',
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
        editableRoles: ['verifier', 'approver'],
    },
    {
        id: 'nomenclatureHi',
        label: 'Nomenclature (Hindi)',
        type: 'text',
        placeholder: 'विवरण हिंदी में दर्ज करें',
        required: false,
        defaultValue: 'राजस्व विभाग',
        roles: { creator: 'editable', verifier: 'fetched', approver: 'fetched' },
        editableRoles: ['verifier', 'approver'],
    },
    {
        id: 'bookNo',
        label: 'Book No',
        type: 'dropdown',
        placeholder: '-- Please Select --',
        required: true,
        defaultValue: 'book1',
        options: [
            { value: 'book1', label: 'Book 1' },
            { value: 'book2', label: 'Book 2' },
            { value: 'book3', label: 'Book 3' },
        ],
        roles: { creator: 'editable', verifier: 'editable', approver: 'fetched' },
        editableRoles: ['approver'],
    },
    {
        id: 'activeStatus',
        label: 'Active Status',
        type: 'switch',
        required: true,
        helperText: 'Enable or disable this demand number immediately.',
        defaultValue: 'active',
        options: [{ value: 'active', label: 'Active' }],
        roles: { creator: 'editable', verifier: 'editable', approver: 'editable' },
        editableRoles: [],
        props: {
            fullWidth: true,
            sx: {
                gridColumn: '1 / -1',
                backgroundColor: '#F7FAFC', // light blue-grey
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                display: 'grid',
                gridTemplateAreas: '"label switch" "subtext switch"',
                gridTemplateColumns: '1fr auto',
                gap: '4px',
                alignItems: 'center',

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
    {
        id: 'creatorRemarks',
        label: 'Creator Remarks',
        type: 'textarea',
        placeholder: '',
        required: false,
        roles: { creator: 'hidden', verifier: 'fetched', approver: 'fetched' },
        props: {
            fullWidth: true,
            sx: { gridColumn: '1 / -1' },
            InputProps: { readOnly: true },
        },
    },
    {
        id: 'verifierRemarks',
        label: 'Verifier Remarks',
        type: 'textarea',
        placeholder: '',
        required: false,
        roles: { creator: 'hidden', verifier: 'hidden', approver: 'fetched' },
        props: {
            fullWidth: true,
            sx: { gridColumn: '1 / -1' },
            InputProps: { readOnly: true },
        },
    },
];

/**
 * Remark field configs per role.
 * Only roles listed here will render a RemarkField at the bottom.
 */
export const DEMAND_MASTER_REMARKS = {
    verifier: {
        label: 'Verifier Remarks',
        placeholder: 'Enter remarks... Mandatory if Reverting.',
        required: false,
        maxLength: 500,
    },
    creator: {
        label: 'Creator Remarks',
        placeholder: 'Enter remarks...',
        required: false,
        maxLength: 500,
    },
    approver: {
        label: 'Approver Remarks',
        placeholder: 'Enter remarks... Mandatory if Reverting.',
        required: false,
        maxLength: 500,
    },
};

/**
 * Action button configs per role
 */
export const DEMAND_MASTER_ACTIONS = {
    creator: [
        { variant: 'reset', label: 'Reset' },
        { variant: 'draft', label: 'Draft' },
        { variant: 'submit', label: 'Submit' },
    ],
    verifier: [
        { variant: 'return', label: 'Revert' },
        { variant: 'submit', label: 'Verify' },
    ],
    approver: [
        { variant: 'return', label: 'Revert' },
        { variant: 'submit', label: 'Approve' },
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
