import React from 'react';
import { Stack } from '@mui/material';
import ActionButton from './ActionButton';

/** Pre-configured button components for each variant */
export const SubmitButton = ({ children = 'Submit', ...props }) => (
    <ActionButton variant="submit" {...props}>{children}</ActionButton>
);

export const SecondaryButton = ({ children = 'Secondary', ...props }) => (
    <ActionButton variant="secondary" {...props}>{children}</ActionButton>
);

export const ResetButton = ({ children = 'Reset', ...props }) => (
    <ActionButton variant="reset" {...props}>{children}</ActionButton>
);

export const ReturnButton = ({ children = 'Return', ...props }) => (
    <ActionButton variant="return" {...props}>{children}</ActionButton>
);

export const DraftButton = ({ children = 'Draft', ...props }) => (
    <ActionButton variant="draft" {...props}>{children}</ActionButton>
);

export const HoldButton = ({ children = 'Hold', ...props }) => (
    <ActionButton variant="hold" {...props}>{children}</ActionButton>
);

export const CloseButton = ({ children = 'Close', ...props }) => (
    <ActionButton variant="close" {...props}>{children}</ActionButton>
);

export const RejectButton = ({ children = 'Reject', ...props }) => (
    <ActionButton variant="reject" {...props}>{children}</ActionButton>
);

/** Button group wrapper */
export const ActionButtonGroup = ({ direction = 'row', spacing = 2, children, ...props }) => (
    <Stack direction={direction} spacing={spacing} alignItems="center" flexWrap="wrap" {...props}>
        {children}
    </Stack>
);

const ActionButtons = {
    Submit: SubmitButton,
    Secondary: SecondaryButton,
    Reset: ResetButton,
    Return: ReturnButton,
    Draft: DraftButton,
    Hold: HoldButton,
    Close: CloseButton,
    Reject: RejectButton,
    Group: ActionButtonGroup,
};

export default ActionButtons;
