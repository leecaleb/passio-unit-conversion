import { InputAdornment } from '@mui/material';
import * as React from 'react'
import { useState, useEffect, Ref, forwardRef, useImperativeHandle } from 'react';
import { NumericTextField } from '../../components/TextField';

type WeightInputProps = {
    units: string,
    invalidWeightValue: boolean
}

interface RefObject {
    cacheInput: () => void,
    value: string
}

const WeightInput = ({ units="", invalidWeightValue=false }: WeightInputProps, ref: Ref<RefObject>) => {
    const [value, setValue] = useState("")

    useImperativeHandle(ref, () => ({
        cacheInput,
        value
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
            error={invalidWeightValue}
            helperText={invalidWeightValue ? "Invalid Value" : ""}
        />
    )
}

export default forwardRef(WeightInput);