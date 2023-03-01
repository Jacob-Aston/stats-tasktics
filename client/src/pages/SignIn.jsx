import React from 'react';
// import Container from "@mui/material/Container";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import logo from '../images/logo.png';

const style = {
  img: {
    width: '25rem',
    height: 'auto',
  },
};

// const buttonTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#116466',
//     },
//   },
// });

// const topTheme = createTheme({
// 	palette: {
// 		background: {
// 			default: "#2C3531",
// 		},
// 	},
// });

function SignIn() {
  return (
    <Container sx={{ bgcolor: 'primary.dark' }}>
      <Grid
        container
        direction="column"
        justifyContent={'center'}
        alignItems="center"
      >
        <Grid item>
          <img alt="stat-tasktic logo" style={style.img} src={logo} />
        </Grid>
        <Grid item>
          <Typography variant="h1" sx={{ color: 'secondary.light' }}>
            Stat-tasktic
          </Typography>
        </Grid>
      </Grid>

      <Grid
        sx={{
          bgcolor: 'primary.main',
        }}
        container
        direction="Column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Paper elevation={3}>
              <Grid item margin={2}>
                <Typography variant="h3" component="h1" textAlign={'center'}>
                  Sign In
                </Typography>
              </Grid>
              <Grid item margin={2}>
                <TextField
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  required="true"
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  id="filled-basic"
                  label="Password"
                  variant="filled"
                  required="true"
                />
              </Grid>
              <Grid item margin={2} align="center">
                <Button variant="contained">Submit</Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
