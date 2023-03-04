import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
} from '@mui/material';
import { checkPassword, validateEmail } from '../utils/helpers';
import logo from '../images/statslogoph.png';
import { LOGIN } from '../utils/graphQL/mutations.js';
import { useMutation } from '@apollo/client';
import { login } from '../utils/auth';

const styles = {
  img: {
    width: '95px',
    height: '145px',
    paddingTop: '20px',
  },
};

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { error }] = useMutation(LOGIN);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email') {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Email or password is invalid');
      return;
    }
    if (!checkPassword(password)) {
      setErrorMessage(`Email or password is invalid`);
      return;
    }

    try {
      const { data } = await login({ variables: { email, password } });
      console.log({ data });
      login(data.token);
    } catch (err) {
      console.error(err);
    }

    setPassword('');
    setEmail('');
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <img alt="stat-tasktic logo" style={styles.img} src={logo} />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h1" color="black">
          Stat-tasktic
        </Typography>
      </Grid>
      <Grid item marginTop={2} marginX={2}>
        {errorMessage && (
          <Alert
            severity="error"
            sx={{ backgroundColor: 'default.alert', color: 'default.blue' }}
          >
            <Typography color="default.blue" className="error-text">
              {errorMessage}
            </Typography>
          </Alert>
        )}
      </Grid>
      <Grid item xs={1} marginY={4} marginX={1}>
        <Paper elevation={7} sx={{ backgroundColor: 'default.tan' }}>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box margin={1} paddingY={2}>
              <Typography variant="h4" component="h2" textAlign={'center'}>
                Sign In
              </Typography>
            </Box>
            <Box margin={3}>
              <TextField
                value={email}
                name="email"
                onChange={handleInputChange}
                type="email"
                id="email-sigin"
                label="Email"
                variant="filled"
                required
                color="info"
                sx={{ backgroundColor: 'default.blue' }}
              />
            </Box>
            <Box margin={1}>
              <TextField
                value={password}
                name="password"
                onChange={handleInputChange}
                type="password"
                id="password-signin"
                label="Password"
                variant="filled"
                required
                color="info"
                align="center"
                sx={{ backgroundColor: 'default.blue' }}
              />
            </Box>
            <Box marginY={3} paddingTop={2} align="center">
              <Button
                onClick={handleFormSubmit}
                variant="contained"
                sx={{ backgroundColor: 'default.gray', color: 'default.blue' }}
              >
                Submit
              </Button>
            </Box>
            <Box padding={2} marginBottom={2} textAlign="center">
              <Link href="/signup" underline="hover">
                {"Don't have an account? Sign up here"}
              </Link>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SignIn;
