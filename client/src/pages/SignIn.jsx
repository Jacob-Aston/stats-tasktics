import React from "react";
// import Container from "@mui/material/Container";
import { Grid, Paper, Typography, TextField, Button, Box } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material";
import logo from "../images/stats_logo.png";

// const styles = {
// 	img: {
// 		width: "400px",
// 		height: "400px",
// 	},
// };

// const buttonTheme = createTheme({
// 	palette: {
// 		primary: {
// 			main: "#116466",
// 		},
// 	},
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
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			{/* <Grid item><img alt="stat-tasktic logo" src={logo} /></Grid> */}
			<Grid item>
				<Typography variant="h3" component="h1" color="black">
					Stat-tasktic
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Paper elevation={3} sx={{ backgroundColor: "default.tan" }}>
					<Box margin={5} paddingY={2}>
						<Typography variant="h4" component="h2" textAlign={"center"}>
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
							sx={{ backgroundColor: "default.blue" }}
						/>
					</Box>
					<Box margin={3}>
						<TextField
							id="filled-basic"
							label="Password"
							variant="filled"
							required="true"
							color="info"
							sx={{ backgroundColor: "default.blue" }}
						/>
					</Box>
					<Box marginY={3} paddingY={3} align="center">
						<Button
							variant="contained"
							sx={{ backgroundColor: "default.gray", color: "default.blue" }}
						>
							Submit
						</Button>
					</Box>
					<Box>
						<Typography></Typography>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default SignIn;
