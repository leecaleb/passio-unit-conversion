import { InputAdornment } from '@mui/material';
import * as React from 'react'
import { useState, useEffect, Ref, forwardRef, useImperativeHandle } from 'react';
import { NumericTextField } from '../../components/TextField';

type WeightInputProps = {
    units: string
}

interface RefObject {
    cacheInput: () => void
}

const WeightInput = ({ units="" }: WeightInputProps, ref: Ref<RefObject>) => {
    const [value, setValue] = useState("")

    useImperativeHandle(ref, () => ({
        cacheInput,
    }));
    
    useEffect(() => {
        if (units === 'imperial') {
            setValue(value ? "" + parseFloat(value) * 2.20462 : "")
        } else {
            setValue(value ? "" + parseFloat(value) * 0.453592 : "")
        }
    }, [units])

    useEffect(() => {
        const cachedValue = localStorage.getItem('weight')
        if (cachedValue !== null) {
            setValue("" + cachedValue)
        }
    }, [])

    const cacheInput = () => {
        localStorage.setItem('weight', value)
    }

    return (
        <NumericTextField
            label={"Weight"}
            style={{ m: 1,minWidth: 300 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ '& .MuiTypography-root': { color: 'rgba(255, 255, 255, 0.6)' } }}>{units === "metric" ? "kg(s)" : "lb(s)"}</InputAdornment>,
            }}
        />
    )
}

export default forwardRef(WeightInput);