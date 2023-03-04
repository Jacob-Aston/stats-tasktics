// TODO: add function here. Chunk of text, day of repeat. Accordian with the task list below.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import logo from '../images/statslogoph.png';
import Auth from '../utils/auth.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphQL/queries.js';
// this makes the charts show up. Do not remove this.
// import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = {
  img: {
    width: '95px',
    height: '145px',
    paddingTop: '20px',
  },
};

function TaskList() {
  const token = Auth.getToken();
  //   console.log({ token });
  const { loading, data } = useQuery(QUERY_ME);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // if not logged in return to homepage
  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  //   console.log('You are logged in!');
  //   console.log({ token });
  //   console.log({ data });
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
              <Tabs value="Tasks" variant="fullWidth">
                <Tab label="Stats" value="Stats" href="/stats" />
                <Tab label="Tasks" value="Tasks" />
              </Tabs>
            </Box>
            <Box>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    [Task List Name]
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    [Renewal Day]
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>[Tasks]</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TaskList;
