import React from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import logo from '../images/statslogoph.png';
import BarChart from '../charts/Bar';
import Auth from '../utils/auth.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphQL/queries.js';
// this makes the charts show up. Do not remove this.
import Chart from 'chart.js/auto';

const styles = {
  img: {
    width: '95px',
    height: '145px',
    paddingTop: '20px',
  },
};

function Stats() {
  const token = Auth.getToken();
  console.log({ token });
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { userId: token.id },
  });

  // if not logged in return to homepage
  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('You are logged in!');
  console.log({ token });
  console.log({ data });
  // container for the entire page
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
        {/* text and stats box  */}
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
              <Tabs value="Stats" variant="fullWidth">
                <Tab label="Stats" value="Stats" />
                <Tab label="Tasks" value="Tasks" href="/tasks" />
              </Tabs>
            </Box>
            <BarChart />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Stats;
