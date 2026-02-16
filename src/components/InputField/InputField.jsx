import React, { useState, useRef, useEffect } from 'react';
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
    IconButton,
    styled,
    Box,
    Switch,
} from '@mui/material';
import {
    MdVisibility,
    MdVisibilityOff,
    MdEdit,
} from 'react-icons/md';
import './InputField.css';

/**
 * Input type configurations
 */
const INPUT_TYPES = {
    text: 'text',
    password: 'password',
    fetched: 'fetched',
    radio: 'radio',
    dropdown: 'dropdown',
    fetchedDropdown: 'fetchedDropdown',
    switch: 'switch',
    textarea: 'textarea',
    fetchedTextarea: 'fetchedTextarea',
};
const StyledTextField = styled(TextField)(({ inputType }) => {
    const isFetched = inputType === 'fetched';

    return {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            height: 'var(--input-height)',
            borderRadius: 'var(--input-radius)',
            backgroundColor: isFetched ? 'var(--input-bg-fetched)' : 'var(--input-bg-default)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--input-font-size)',
            fontWeight: 'var(--input-font-weight)',
            color: 'var(--input-text-color)',
            transition: 'all 0.2s ease-in-out',

            // Default border
            '& fieldset': {
                borderWidth: 'var(--input-border-width)',
                borderColor: isFetched ? 'var(--input-border-fetched)' : 'var(--input-border-default)',
            },
            '&:hover fieldset': {
                borderColor: isFetched ? 'var(--input-border-fetched)' : 'var(--input-border-focus)',
            },
            '&.Mui-focused fieldset': {
                borderWidth: 'var(--input-border-width)',
                borderColor: isFetched ? 'var(--input-border-fetched)' : 'var(--input-border-focus)',
            },

            // Error state — override MUI's default error styles
            '&.Mui-error': {
                backgroundColor: 'var(--input-bg-error)',
                '& fieldset': {
                    borderWidth: 'var(--input-border-width)',
                    borderColor: 'var(--input-border-error)',
                },
            },
            '&.Mui-error:hover fieldset': {
                borderColor: 'var(--input-border-error)',
            },
            '&.Mui-error.Mui-focused fieldset': {
                borderWidth: 'var(--input-border-width)',
                borderColor: 'var(--input-border-error)',
            },

            // Disabled state
            '&.Mui-disabled': {
                backgroundColor: isFetched ? 'var(--input-bg-fetched)' : 'var(--input-bg-disabled)',
                '& fieldset': {
                    borderColor: isFetched ? 'var(--input-border-fetched)' : 'var(--input-border-default)',
                },
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: 'var(--input-padding-y) var(--input-padding-x)',
            color: 'var(--input-text-color)',
            WebkitTextFillColor: 'var(--input-text-color)',
            '&::placeholder': {
                color: 'var(--input-placeholder-color)',
                opacity: 1,
            },
            '&.Mui-disabled': {
                color: isFetched ? 'var(--input-text-color)' : 'inherit',
                WebkitTextFillColor: isFetched ? 'var(--input-text-color)' : 'inherit',
            },
        },
        '& .MuiInputAdornment-root': {
            marginRight: '4px',
        },
    };
});

/**
 * Styled Radio using CSS variables
 */
const StyledRadio = styled(Radio)(() => ({
    color: 'var(--radio-unchecked-color)',
    '&.Mui-checked': {
        color: 'var(--radio-checked-color)',
    },
    '& .MuiSvgIcon-root': {
        fontSize: '20px',
    },
}));

/**
 * InputField - Dynamic input component supporting multiple types
 * 
 * @param {string} type - Input type: 'text' | 'password' | 'fetched' | 'radio' | 'dropdown'
 * @param {string} label - Field label
 * @param {string} placeholder - Placeholder text
 * @param {any} value - Current value
 * @param {function} onChange - Change handler
 * @param {Array} options - Options for radio/dropdown [{value, label}]
 * @param {boolean} required - Show required asterisk
 * @param {boolean} disabled - Disable the field
 * @param {boolean} error - Show error state
 * @param {string} helperText - Helper/error text below field
 * @param {boolean} fullWidth - Take full container width
 * @param {boolean} editable - Show edit button (for fetched type)
 * @param {function} onEdit - Edit button handler
 * @param {string} subtext - Subtext below input
 * @param {object} sx - Additional styles
 */
const InputField = ({
    type = 'text',
    label,
    placeholder = '',
    value = '',
    onChange,
    options = [],
    required = false,
    disabled = false,
    error = false,
    helperText = '',
    fullWidth = false,
    editable = false,
    onEdit,
    subtext = '',
    sx = {},
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value, event);
        }
    };

    /**
     * Render the label with optional required asterisk
     */
    const renderLabel = () => {
        if (!label) return null;
        return (
            <FormLabel className="input-field-label">
                {label}
                {required && <span className="input-field-required">*</span>}
            </FormLabel>
        );
    };

    /**
     * Render subtext/helper text
     */
    const renderSubtext = () => {
        const text = helperText || subtext;
        if (!text) return null;
        return (
            <span className={`input-field-subtext ${error ? 'input-field-subtext--error' : ''}`}>
                {text}
            </span>
        );
    };

    /**
     * Render text or password input
     */
    const renderTextInput = () => {
        const isPassword = type === 'password';
        const isFetched = type === 'fetched';

        return (
            <StyledTextField
                inputType={type}
                type={isPassword && !showPassword ? 'password' : 'text'}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled || isFetched}
                error={error}
                fullWidth={fullWidth}
                InputProps={{
                    readOnly: isFetched,
                    endAdornment: (
                        <InputAdornment position="end">
                            {isPassword && (
                                <IconButton
                                    onClick={handleTogglePassword}
                                    edge="end"
                                    className="input-field-icon-btn"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <MdVisibility className="input-field-icon" />
                                    ) : (
                                        <MdVisibilityOff className="input-field-icon" />
                                    )}
                                </IconButton>
                            )}
                            {isFetched && editable && (
                                <button
                                    type="button"
                                    onClick={onEdit}
                                    className="input-field-edit-btn"
                                    tabIndex={-1}
                                >
                                    <span className="input-field-edit-icon-wrap">
                                        <MdEdit className="input-field-edit-icon" />
                                    </span>
                                    <span className="input-field-edit-text">Edit</span>
                                </button>
                            )}
                        </InputAdornment>
                    ),
                }}
                {...props}
            />
        );
    };

    /**
     * Render radio button group
     */
    const renderRadioGroup = () => {
        return (
            <RadioGroup
                value={value}
                onChange={handleChange}
                row
                className="input-field-radio-group"
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<StyledRadio disabled={disabled} />}
                        label={option.label}
                        className="input-field-radio-label"
                    />
                ))}
            </RadioGroup>
        );
    };

    /**
     * Render custom dropdown
     */
    const renderDropdown = () => {
        const isFetchedDropdown = type === 'fetchedDropdown';
        const selectedOption = options.find((opt) => opt.value === value);
        const displayText = selectedOption ? selectedOption.label : '';

        // Determine trigger CSS class based on state
        let triggerClass = 'dropdown-trigger';
        if (disabled) {
            triggerClass += ' dropdown-trigger--disabled';
        } else if (isFetchedDropdown) {
            triggerClass += ' dropdown-trigger--fetched';
        } else if (isDropdownOpen) {
            triggerClass += ' dropdown-trigger--open';
        } else if (value) {
            triggerClass += ' dropdown-trigger--selected';
        } else {
            triggerClass += ' dropdown-trigger--closed';
        }

        return (
            <div className="dropdown-wrapper" ref={dropdownRef}>
                {/* Trigger */}
                <div
                    className={triggerClass}
                    onClick={() => !disabled && !isFetchedDropdown && setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span className={`dropdown-trigger__text ${!displayText ? 'dropdown-trigger__placeholder' : ''}`}>
                        {displayText || placeholder}
                    </span>
                    <svg
                        className={`dropdown-trigger__arrow ${isDropdownOpen ? 'dropdown-trigger__arrow--open' : ''}`}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>

                {/* Dropdown menu */}
                {isDropdownOpen && !disabled && !isFetchedDropdown && (
                    <div className="dropdown-menu">
                        <ul className="dropdown-menu__list">
                            {options.map((option) => (
                                <li
                                    key={option.value}
                                    className={`dropdown-menu__item ${value === option.value ? 'dropdown-menu__item--selected' : ''}`}
                                    onClick={() => {
                                        if (onChange) onChange(option.value);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    /**
     * Render switch toggle
     */
    const renderSwitch = () => {
        const isActive = value === 'active' || value === true;
        const isFetchedSwitch = disabled || type === 'fetched';

        // For fetched/disabled state, show the toggle (disabled) with Edit button
        if (isFetchedSwitch) {
            return (
                <div className="input-field-status-display">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isActive}
                                disabled
                                color="primary"
                            />
                        }
                        label={isActive ? 'Active' : 'Inactive'}
                        className="input-field-switch-label"
                        sx={{ ml: 0 }}
                    />
                    {editable && (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="input-field-edit-btn"
                            tabIndex={-1}
                            style={{ marginLeft: '12px' }}
                        >
                            <span className="input-field-edit-icon-wrap">
                                <MdEdit className="input-field-edit-icon" />
                            </span>
                            <span className="input-field-edit-text">Edit</span>
                        </button>
                    )}
                </div>
            );
        }

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={isActive}
                        onChange={(e) => handleChange(e.target.checked ? 'active' : 'inactive')}
                        color="primary"
                    />
                }
                label={options && options[0] ? options[0].label : 'Active'}
                className="input-field-switch-label"
                sx={{ ml: 0 }}
            />
        );
    };

    /**
     * Render textarea (multiline text input)
     */
    const renderTextarea = () => {
        const isFetched = type === 'fetchedTextarea';

        return (
            <StyledTextField
                inputType={isFetched ? 'fetched' : 'text'}
                multiline
                rows={3}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled || isFetched}
                error={error}
                fullWidth={fullWidth}
                InputProps={{
                    readOnly: isFetched,
                }}
                className="input-field-textarea"
                {...props}
            />
        );
    };

    /**
     * Render appropriate input based on type
     */
    const renderInput = () => {
        switch (type) {
            case INPUT_TYPES.radio:
                return renderRadioGroup();
            case INPUT_TYPES.dropdown:
            case INPUT_TYPES.fetchedDropdown:
                return renderDropdown();
            case INPUT_TYPES.switch:
                return renderSwitch();
            case INPUT_TYPES.textarea:
            case INPUT_TYPES.fetchedTextarea:
                return renderTextarea();
            case INPUT_TYPES.password:
            case INPUT_TYPES.fetched:
            case INPUT_TYPES.text:
            default:
                return renderTextInput();
        }
    };

    const containerWidth = fullWidth ? '100%' : 'var(--input-width)';

    return (
        <Box
            className="input-field-container"
            sx={{ width: containerWidth, ...sx }}
        >
            {renderLabel()}
            <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
                {renderInput()}
            </FormControl>
            {renderSubtext()}
        </Box>
    );
};

export default InputField;
export { INPUT_TYPES };
