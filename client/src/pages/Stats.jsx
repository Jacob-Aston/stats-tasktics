import React from 'react';
import { Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import logo from '../images/statslogoph.png';
import BarChart from '../charts/Bar';

const styles = {
  img: {
    width: '95px',
    height: '145px',
    paddingTop: '20px',
  },
};

function Stats() {
  return (
    // container for the entire page
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
