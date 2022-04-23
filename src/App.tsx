import { makeStyles } from '@mui/styles';
import * as React from "react";
import UnitConverstionScreen from "./screens/UnitConversionScreen";

const useStyles = makeStyles({
    root: {
		display: 'flex',
        height: '98vh',
        backgroundImage: 'url(https://static.wixstatic.com/media/973abe_3de4a3dda2d6432ba2d560f68ed0ad7f~mv2.png/v1/fill/w_1118,h_550,al_c,enc_auto/973abe_3de4a3dda2d6432ba2d560f68ed0ad7f~mv2.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
});

const App = () => {
    const classes = useStyles();
	return(
		<div className={classes.root} >
			<UnitConverstionScreen />
		</div>
	)
}

export default App;
