import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import logo from '../images/statslogoph.png';

const styles = {
  img: {
    width: '95px',
    height: '145px',
    paddingTop: '20px',
  },
};

function Stats() {
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
      <Grid item xs={1} marginY={4} marginX={1}>
        <Paper elevation={7} sx={{ backgroundColor: 'default.tan' }}>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* This is the tabs for Stats and Tasks  */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value="Tabs" variant="fullWidth">
                <Tab label="Stats" />
                <Tab label="Tasks" href="/tasks" />
              </Tabs>
            </Box>
            <Box margin={1} paddingY={2}>
              <Typography variant="h4" component="h2" textAlign={'center'}>
                Sign In
              </Typography>
            </Box>
            <Box margin={3}>
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                required="true"
                color="info"
                sx={{ backgroundColor: 'default.blue' }}
              />
            </Box>
            <Box margin={1}>
              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                required="true"
                color="info"
                align="center"
                sx={{ backgroundColor: 'default.blue' }}
              />
            </Box>
            <Box marginY={3} paddingTop={2} align="center">
              <Button
                variant="contained"
                sx={{ backgroundColor: 'default.gray', color: 'default.blue' }}
              >
                Submit
              </Button>
            </Box>
            <Box padding={2} marginBottom={2} textAlign="center">
              <Link href="#" underline="hover">
                {"Don't have an account? Sign up here"}
              </Link>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Stats;
