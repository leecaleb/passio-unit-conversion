import { TextField } from '@mui/material'
import React from 'react'

type NumericTextFieldProps = {
    label?: string,
    style?: object,
    value?: string,
    InputProps?: object,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const NumericTextField = ({ label="", style={}, value="", InputProps={}, onChange }: NumericTextFieldProps) => {
    return (
        <TextField
            label={label}
            id="outlined-end-adornment"
            variant="filled"
            //   color="info"
            sx={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                '& .MuiFilledInput-underline:after': { borderBottomColor: 'rgba(255,255,255,0.6)' },
                ...style
            }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: {color: 'rgba(255,255,255,0.7)'} }}
            InputProps={InputProps}
            InputLabelProps={{ 
                // shrink: value !== "", 
                sx: { 
                    color: 'rgba(255,255,255,0.5)',
                    '&.Mui-focused': { color: 'rgba(255,255,255,0.6)'} 
                }
            }}
            value={value}
            onChange={onChange}
        />
    )
}