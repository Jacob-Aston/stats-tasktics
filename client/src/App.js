import React from "react";
import "./App.css";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// import { createTheme, ThemeProvider } from "@mui/material";

// import Home from './pages/Home';
// import Signup from './pages/Signup';
import SignIn from "./pages/SignIn";
// import SingleThought from './pages/SingleThought';
// import Header from './components/Header';
// import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
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
			color: "#2C3531",
		},
	},
	palette: {
		// mode: "dark",
		background: {
			default: "#116466",
		},
		default: {
			gray: "#2C3531",
			darkBlue: "#116466",
			blue: "#D1E8E2",
			darkTan: "#D9B08C",
			tan: "#FFCD9A",
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
								{/* <Route 
                path="/" 
                element={<Home />} 
              /> */}
								<Route path="/signin" element={<SignIn />} />
								{/* <Route 
                path="/signup" 
                element={<Signup />} 
              /> */}
								{/* <Route 
                path="/thoughts/:thoughtId" 
                element={<SingleThought />} 
              /> */}
							</Routes>
						</div>
					</div>
				</Router>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
