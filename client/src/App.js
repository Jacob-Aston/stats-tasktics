import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// importing pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TaskCreate from './pages/TaskCreate';
import TaskList from './pages/TaskList';
import Stats from './pages/Stats';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('JWTToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  typography: {
    allVariants: {
      color: '#2C3531',
    },
  },
  palette: {
    // mode: "dark",
    background: {
      default: '#116466',
    },
    default: {
      gray: '#2C3531',
      darkBlue: '#116466',
      blue: '#D1E8E2',
      darkTan: '#D9B08C',
      tan: '#FFCD9A',
      alert: '#ff6961',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <div className="container">
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/tasklist" element={<TaskList />} />
                <Route path="/taskcreate" element={<TaskCreate />} />
                <Route path="/*" element={<SignIn />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
