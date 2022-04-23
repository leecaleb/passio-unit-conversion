import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, CircularProgress, Container, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WeightInput from './WeightInput';
import HeightInput from './HeightInput';
import { SelectWithLabel } from '../../components/Select';

const useStyles = makeStyles({
    root: {
        display: 'flex !important',
        flexDirection: 'column',
        // justifyContent: 'space-between',
		paddingTop: 50
        // height: '96vh',
        // backgroundColor: 'beige'
        // backgroundImage: 'url(https://static.wixstatic.com/media/973abe_3de4a3dda2d6432ba2d560f68ed0ad7f~mv2.png/v1/fill/w_1118,h_550,al_c,enc_auto/973abe_3de4a3dda2d6432ba2d560f68ed0ad7f~mv2.png)',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat'
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'black',
    },
    header: {
        display: 'flex',
        backgroundImage: 'url(https://static.wixstatic.com/media/973abe_f389ad131c2a431faf7abd8a3f212c73~mv2.png/v1/fill/w_251,h_75,al_c,usm_0.66_1.00_0.01,enc_auto/passio_logo_01.png)',
        backgroundSize: 'cover',
        zIndex: 2,
        position: 'absolute'
    },
    loadingCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    }
});

const UnitConverstionScreen = () => {
    const classes = useStyles();
    const [units, setUnits] = useState("imperial")
    const [loadingCache, setLoadingCache] = useState(true)
    const WeightInputRef = useRef<{cacheInput: () => void}>(null);
    const HeightInputRef = useRef<{cacheInput: () => void}>(null);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setUnits(e.target.value)
    }

    const cacheInputValues = () => {
        if (WeightInputRef.current) {
            WeightInputRef.current.cacheInput()
        }

        if (HeightInputRef.current) {
            HeightInputRef.current.cacheInput()
        }

        localStorage.setItem('units', units)
    }

    useEffect(() => {
        const cachedUnits = localStorage.getItem('units')
        if (cachedUnits !== null) {
            setUnits(cachedUnits)
            setLoadingCache(false)
        }
    }, [])

    const Loading = () => {
        if (!loadingCache) {
            return null
        }
        return (
            <Grid className={classes.loadingCircle}>
                <CircularProgress style={{ color: 'rgba(255,255,255,0.3)' }} />
            </Grid>
        )
    }

    return (
        <Container maxWidth="md" className={classes.root}>
            
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={'https://static.wixstatic.com/media/973abe_f389ad131c2a431faf7abd8a3f212c73~mv2.png/v1/fill/w_251,h_75,al_c,usm_0.66_1.00_0.01,enc_auto/passio_logo_01.png'}/>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Unit Convertor
                </Typography>
            </Box>

            <Loading />

            {!loadingCache && <div>
                <Grid container>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <WeightInput ref={WeightInputRef} units={units} />
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <HeightInput ref={HeightInputRef} units={units} />
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <SelectWithLabel
                            style={{ minWidth: 300, margin: 1 }}
                            units={units}
                            handleChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    <Button variant="contained" size="large" style={{ minWidth: 300, backgroundColor: 'rgba(255,255,255,0.3)' }} onClick={cacheInputValues}>
                        Save
                    </Button>
                </Grid>
            </div>}

        </Container>
    )
}

export default UnitConverstionScreen;