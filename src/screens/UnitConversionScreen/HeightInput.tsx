import { Box, InputAdornment } from '@mui/material';
import * as React from 'react'
import { useState, useEffect, useImperativeHandle, Ref, forwardRef } from 'react';
import { NumericTextField } from '../../components/TextField';

type HeightInputProps = {
    units: string,
    invalidHeightValue: boolean,
    invalidHeightInchValue: boolean
}

interface RefObject {
    cacheInput: () => void,
    value: string,
    inchValue: string
}

const HeightInput = ({ units="", invalidHeightValue=false, invalidHeightInchValue=false }: HeightInputProps, ref: Ref<RefObject>) => {
    const [value, setValue] = useState("")
    const [inchValue, setInchValue] = useState("")

    useImperativeHandle(ref, () => ({
        cacheInput,
        value,
        inchValue
    }));
    
    useEffect(() => {
        if (units === 'imperial') {
            const imperialValue = parseFloat(value) * 3.28084
            setValue(value ? "" + Math.floor(imperialValue) : "")
            setInchValue(value ? "" + (imperialValue % 1) * 12 : "")
        } else {
            let metricValue
            if (!isNaN(parseFloat(inchValue))) {
                metricValue = (parseFloat(value)+parseFloat(inchValue)/12) * 0.3048
            } else {
                metricValue = parseFloat(value) * 0.3048
            }
            setValue(value ? "" + metricValue : "")
        }
    }, [units])

    useEffect(() => {
        const cachedValue = localStorage.getItem('height')
        if (cachedValue !== null) {
            if (units === 'imperial') {
                setValue("" + Math.floor(parseFloat(cachedValue)))
                setInchValue("" + ((parseFloat(cachedValue) % 1) * 12))
            } else {
                setValue("" + parseFloat(cachedValue))
            }
        }
    }, [])

    const cacheInput = () => {
        if (units === 'imperial') {
            localStorage.setItem(
                'height',
                "" + parseFloat(value)+parseFloat(inchValue)/12
            )
        } else {
            localStorage.setItem('height', value)
        }
    }

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <NumericTextField
                label={"Height"}
                style={{ m: 1, minWidth: 300 }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={invalidHeightValue}
                helperText={invalidHeightValue ? "Invalid Value" : ""}
                InputProps={{
                    endAdornment: <InputAdornment position="end" sx={{ '& .MuiTypography-root': { color: 'rgba(255, 255, 255, 0.6)' } }}>{units === "metric" ? "m(s)" : "ft"}</InputAdornment>,
                }}
            />
            {units === "imperial" && <NumericTextField
                label={"Height - inches"}
                style={{ m: 1, minWidth: 300 }}
                value={inchValue}
                onChange={(e) => setInchValue(e.target.value)}
                error={invalidHeightInchValue}
                helperText={invalidHeightInchValue ? "Invalid Value" : ""}
                InputProps={{
                    endAdornment: <InputAdornment position="end" sx={{ '& .MuiTypography-root': { color: 'rgba(255, 255, 255, 0.6)' } }}>{"in"}</InputAdornment>,
                }}
            />}
        </Box>
    )
}

export default forwardRef(HeightInput);