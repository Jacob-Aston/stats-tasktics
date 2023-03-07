import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import logo from '../images/statslogoph.png';
import Auth from '../utils/auth.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphQL/queries.js';
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

  // getting data from server
  const lists = data?.lists;

  const [expanded, setExpanded] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  // console.log({ complete });
  const handleComplete = (event) => {
    setComplete(event.target.checked);
  };

  // logout of the account
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    // return <Navigate to="/" />;
  };

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
          <Typography>add user name here task lists:</Typography>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* This is the tab-bar for Stats and Tasks  */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                color: 'default.gray',
              }}
            >
              <Tabs value="Tasks" variant="fullWidth">
                <Tab label="Stats" value="Stats" href="/stats" />
                <Tab label="Tasks" value="Tasks" />
              </Tabs>
            </Box>
            <Box>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                sx={{
                  backgroundcolor: 'default.blue',
                  color: 'default.gray',
                }}
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
                  <Box>
                    <FormControlLabel
                      label="Task Name"
                      control={
                        <Checkbox
                          checked={complete}
                          onChange={handleComplete}
                        />
                      }
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'default.gray',
                color: 'default.blue',
                margin: '.5rem',
              }}
              onClick={logout}
            >
              Sign Out
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TaskList;
