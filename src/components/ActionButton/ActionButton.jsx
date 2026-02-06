import React from 'react';
import { Button, styled } from '@mui/material';
import {
    MdCheckCircleOutline,
    MdHistory,
    MdArrowBack,
    MdOutlineSave,
    MdPauseCircleOutline,
    MdOutlineCancel,
    MdClose
} from 'react-icons/md';

/** Button variant configurations using CSS variables from index.css */
const BUTTON_VARIANTS = {
    submit: { cssPrefix: 'submit', icon: MdCheckCircleOutline },
    secondary: { cssPrefix: 'secondary', icon: null },
    reset: { cssPrefix: 'reset', icon: MdHistory },
    return: { cssPrefix: 'return', icon: MdArrowBack },
    draft: { cssPrefix: 'draft', icon: MdOutlineSave },
    hold: { cssPrefix: 'hold', icon: MdPauseCircleOutline },
    close: { cssPrefix: 'close', icon: MdOutlineCancel },
    reject: { cssPrefix: 'reject', icon: MdClose },
};

/** Styled button using CSS variables for theming */
const StyledButton = styled(Button)(({ cssPrefix }) => ({
    height: 'var(--btn-height)',
    padding: 'var(--btn-padding-y) var(--btn-padding-x)',
    gap: 'var(--btn-gap)',
    borderRadius: 'var(--btn-radius)',
    textTransform: 'none',
    fontWeight: 'var(--btn-font-weight)',
    fontSize: 'var(--btn-font-size)',
    fontFamily: 'var(--font-sans)',
    lineHeight: 1.5,
    minWidth: 'auto',
    backgroundColor: `var(--btn-${cssPrefix}-bg)`,
    color: `var(--btn-${cssPrefix}-text)`,
    border: `var(--btn-${cssPrefix}-border)`,
    boxShadow: 'none',
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
        backgroundColor: `var(--btn-${cssPrefix}-hover-bg)`,
        boxShadow: 'none',
    },
    '&:active': {
        backgroundColor: `var(--btn-${cssPrefix}-pressed-bg)`,
    },
    '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 2px white, 0 0 0 4px var(--btn-${cssPrefix}-focus-ring)`,
    },
    '&.Mui-disabled': {
        backgroundColor: 'var(--btn-disabled-bg)',
        color: 'var(--btn-disabled-text)',
        border: 'var(--btn-disabled-border)',
        cursor: 'not-allowed',
        pointerEvents: 'auto',
    },
    '& .MuiButton-startIcon': {
        marginRight: 0,
        marginLeft: 0,
        '& svg': { fontSize: '18px' },
    },
}));

/**
 * ActionButton - Dynamic button component with 8 variants
 * All colors and spacing via CSS variables from index.css
 */
const ActionButton = ({
    variant = 'submit',
    icon,
    showIcon = true,
    disabled = false,
    onClick,
    fullWidth = false,
    size = 'medium',
    children,
    sx,
    ...props
}) => {
    const config = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.submit;
    const IconComponent = icon !== undefined ? icon : config.icon;
    const startIcon = showIcon && IconComponent ? <IconComponent /> : null;

    const sizeStyles = {
        small: { height: '36px', padding: '8px 16px', fontSize: '12px' },
        medium: {},
        large: { height: '52px', padding: '16px 32px', fontSize: '16px' },
    };

    return (
        <StyledButton
            cssPrefix={config.cssPrefix}
            disabled={disabled}
            onClick={onClick}
            fullWidth={fullWidth}
            startIcon={startIcon}
            sx={{ ...sizeStyles[size], ...sx }}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default ActionButton;
export { BUTTON_VARIANTS };
