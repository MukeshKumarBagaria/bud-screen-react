import React from 'react';
import { TextField, styled } from '@mui/material';
import './RemarkField.css';

/**
 * Styled textarea using CSS variables — matches fetched input theming
 */
const StyledTextarea = styled(TextField)(() => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: 'var(--input-radius)',
        backgroundColor: 'var(--input-bg-default, #FFFFFF)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--input-font-size)',
        fontWeight: 'var(--input-font-weight)',
        color: 'var(--input-text-color)',
        transition: 'all 0.2s ease-in-out',
        alignItems: 'flex-start',

        '& fieldset': {
            borderWidth: 'var(--input-border-width)',
            borderColor: 'var(--input-border-default)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--input-border-focus)',
        },
        '&.Mui-focused fieldset': {
            borderWidth: 'var(--input-border-width)',
            borderColor: 'var(--input-border-focus)',
        },
    },
    '& .MuiOutlinedInput-input': {
        padding: 'var(--input-padding-y) var(--input-padding-x)',
        '&::placeholder': {
            color: 'var(--input-placeholder-color)',
            opacity: 1,
        },
    },
}));

/**
 * RemarkField — Reusable remark/comment textarea
 *
 * @param {string}   label       — Field label (e.g. "Verifier Remarks")
 * @param {string}   placeholder — Placeholder text
 * @param {string}   value       — Current value
 * @param {function} onChange    — Change handler (receives value string)
 * @param {boolean}  required    — Show required asterisk
 * @param {boolean}  disabled    — Disable the field
 * @param {number}   maxLength   — Max character count (default 500)
 * @param {number}   rows        — Number of visible rows (default 3)
 * @param {object}   sx          — Additional MUI sx overrides
 */
const RemarkField = ({
    label = 'Remarks',
    placeholder = 'Enter remarks...',
    value = '',
    onChange,
    required = false,
    disabled = false,
    maxLength = 500,
    rows = 3,
    sx = {},
}) => {
    const handleChange = (e) => {
        const val = e.target.value;
        if (val.length <= maxLength && onChange) {
            onChange(val);
        }
    };

    return (
        <div className="remark-field" style={sx}>
            {label && (
                <label className="remark-field__label">
                    {label}
                    {required && <span className="remark-field__required">*</span>}
                </label>
            )}
            <StyledTextarea
                multiline
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                fullWidth
                inputProps={{ maxLength }}
            />
            <span className="remark-field__helper">
                Max {maxLength} chars.
            </span>
        </div>
    );
};

export default RemarkField;
