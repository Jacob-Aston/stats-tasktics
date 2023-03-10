import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
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
  styled,
} from '@mui/material';
import logo from '../images/statslogoph.png';
import Auth from '../utils/auth.js';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphQL/queries.js';
import { COMPLETE_TASK, DELETE_TASK } from '../utils/graphQL/mutations';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Drawer from '../components/Drawer';
import AddIcon from '@mui/icons-material/Add';

const styles = {
  img: {
    width: '95px',
    height: '145px',
    paddingTop: '20px',
  },
};

function TaskList() {
  const token = Auth.getTokenInfo();
  // console.log({ token });
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { offset: 0 },
    fetchPolicy: 'network-only',
  });
  const navigate = useNavigate();

  // getting data from server
  console.log({ data });
  const [deleteTask, { error }] = useMutation(DELETE_TASK);

  const [expanded, setExpanded] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  // console.log({ complete });
  const [completeTask] = useMutation(COMPLETE_TASK, {
    variables: { offset: 0 },
    fetchPolicy: 'network-only',
  });
  const HandleComplete = async (event) => {
    const targetId = event.target.getAttribute('id');
    console.log(targetId);
    try {
      const { data } = await completeTask({
        variables: {
          taskId: targetId,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setComplete(event.target.checked);
    // window.location.reload();
  };

  // logout of the account
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddTask = (listId) => {
    //event.stopPropagation();
    window.localStorage.setItem('currentListId', listId);
    navigate('/taskcreate');
  };

  const handleDeleteTask = async (listId, taskId) => {
    try {
      await deleteTask({
        variables: {
          listId: listId,
          taskId: taskId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Paper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    [theme.breakpoints.up('md')]: {
      width: 900,
    },
    [theme.breakpoints.up('lg')]: {
      width: 1200,
    },
    [theme.breakpoints.up('xl')]: {
      width: 1536,
    },
  }));

  const Box = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    [theme.breakpoints.up('md')]: {
      width: 900,
    },
    [theme.breakpoints.up('lg')]: {
      width: 1200,
    },
    [theme.breakpoints.up('xl')]: {
      width: 1536,
    },
  }));

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
      <Grid
        container
        item
        direction="row-reverse"
        justifyContent="space-between"
      >
        <Grid item>
          <Drawer />
        </Grid>
        <Grid item marginLeft={1}>
          <Typography variant="h5" component="h4" color={'default.tan'}>
            Stat-tasktic
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1} marginY={4} marginX={1}>
        {/* text and stats box  */}
        <Paper
          elevation={7}
          sx={{
            backgroundColor: 'default.tan',
            width: '300px',
          }}
        >
          <Typography textAlign="center">
            {data.me.username}'s task lists:
          </Typography>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ width: '300px' }}>
              {data.me.lists?.map((lst, index) => {
                return (
                  <Accordion
                    expanded={expanded === `${data.me.lists[index].listTitle}`}
                    onChange={handleChange(`${data.me.lists[index].listTitle}`)}
                    sx={{
                      backgroundcolor: 'default.blue',
                      color: 'default.gray',
                    }}
                    key={index}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {lst.listTitle}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Refresh Day: {lst.taskRefreshDay}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: 'default.gray',
                          color: 'default.blue',
                          margin: '.5rem',
                          ml: '4rem',
                        }}
                        onClick={() => handleAddTask(lst._id)}
                      >
                        <AddIcon />
                      </Button>
                    </AccordionSummary>
                    {lst.tasks?.map((task) => {
                      return (
                        <AccordionDetails>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <FormControlLabel
                                label={task.title}
                                control={
                                  <Checkbox
                                    checked={task.completed}
                                    onChange={HandleComplete}
                                    id={task._id}
                                  />
                                }
                              />
                            </Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: 'default.gray',
                                  color: 'default.blue',
                                  margin: '.5rem',
                                }}
                                onClick={() =>
                                  handleDeleteTask(lst._id, task._id)
                                }
                              >
                                <DeleteIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      );
                    })}
                  </Accordion>
                );
              })}
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
