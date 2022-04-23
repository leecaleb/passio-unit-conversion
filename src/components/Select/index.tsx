import * as React from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { makeStyles } from '@mui/styles';

type SelectWithLabelProps = {
    units?: string,
    style?: object,
    handleChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void | undefined
}

const useStyles = makeStyles({
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        }
    },
    icon: {
        fill: 'white',
    },
});

export const SelectWithLabel = ({ units="", style={}, handleChange }: SelectWithLabelProps) => {
    return (
        <FormControl
            variant="filled"
            sx={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                '& .MuiFilledInput-underline:before': { borderBottomColor: 'rgba(0,0,0,0.6)' },
                '& .MuiFilledInput-underline:after': { borderBottomColor: 'rgba(255,255,255,0.6)' },
                ...style
            }}
        >
            <InputLabel
                id="select-filled-label"
                sx={{
                    color: 'rgba(255,255,255,0.5)',
                    '&.Mui-focused': { color: 'rgba(255,255,255,0.6)'} 
                }}
            >
                Units
            </InputLabel>
            <Select
                labelId="select-filled-label"
                id="select-filled"
                value={units}
                label="Units"
                onChange={handleChange}
                sx={{ '& .MuiSelect-icon': { color: 'rgba(255, 255, 255, 0.6)' } }}
                inputProps={{  }}
                style={{ color: 'rgba(255,255,255,0.6)' }}
            >
                <MenuItem value={"imperial"}>Imperial</MenuItem>
                <MenuItem value={"metric"}>Metric</MenuItem>
            </Select>
        </FormControl>
    )
}