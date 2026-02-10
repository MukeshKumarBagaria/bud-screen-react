import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import InputField from '../components/InputField';

/**
 * Demo page to showcase all InputField variants
 */
const InputFieldDemo = () => {
    const [textValue, setTextValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [radioValue, setRadioValue] = useState('yes');
    const [dropdownValue, setDropdownValue] = useState('');

    const radioOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];

    const dropdownOptions = [
        { value: 'lab_a', label: 'Pathology Lab A' },
        { value: 'lab_b', label: 'Pathology Lab B' },
        { value: 'lab_c', label: 'Pathology Lab C' },
    ];

    return (
        <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#132939' }}>
                InputField Component Demo
            </Typography>

            <Paper sx={{ p: 4, maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Text Input */}
                <InputField
                    type="text"
                    label="Employee Name"
                    placeholder="Enter your name"
                    value={textValue}
                    onChange={setTextValue}
                    required
                />

                {/* Password Input */}
                <InputField
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    value={passwordValue}
                    onChange={setPasswordValue}
                    required
                />

                {/* Fetched/Readonly Input */}
                <InputField
                    type="fetched"
                    label="Employee Name"
                    value="Mukesh Kumar"
                />

                {/* Fetched with Edit button */}
                <InputField
                    type="fetched"
                    label="Department"
                    value="Engineering"
                    editable
                    onEdit={() => alert('Edit clicked!')}
                />

                {/* Radio Group */}
                <InputField
                    type="radio"
                    label="Hospital Within MP State?"
                    value={radioValue}
                    onChange={setRadioValue}
                    options={radioOptions}
                    required
                />

                {/* Dropdown - Default */}
                <InputField
                    type="dropdown"
                    label="Filed Against Medical Advance"
                    placeholder="Select option"
                    value={dropdownValue}
                    onChange={setDropdownValue}
                    options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' },
                        { value: 'option4', label: 'Option 4' },
                    ]}
                    required
                />

                {/* Dropdown - Fetched (Dark Blue BG) */}
                <InputField
                    type="fetchedDropdown"
                    label="Filed Against Medical Advance"
                    value="yes"
                    options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ]}
                    required
                />

                {/* Dropdown - Disabled */}
                <InputField
                    type="dropdown"
                    label="Filed Against Medical Advance"
                    value="yes"
                    options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                    ]}
                    disabled
                    required
                />

                {/* Error State */}
                <InputField
                    type="text"
                    label="Email Address"
                    placeholder="Enter email"
                    value=""
                    error
                    helperText="This field is required"
                    required
                />

                {/* With Subtext */}
                <InputField
                    type="text"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    subtext="Include country code"
                />
            </Paper>
        </Box>
    );
};

export default InputFieldDemo;
