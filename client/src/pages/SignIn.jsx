import React from "react";
// import Container from "@mui/material/Container";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import logo from "../images/logo.png";

const style = {
	img: {
		width: "192px",
		height: "192px",
	},
};

const buttonTheme = createTheme({
	palette: {
		primary: {
			main: "#116466",
		},
	},
});

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
			direction="Column"
			justifyContent="center"
			alignItems="center"
		>
			<Grid item>
				<img alt="stat-tasktic logo" style={style.img} src={logo} />
			</Grid>
			<Grid item>
				<Typography>Stat-tasktic</Typography>
			</Grid>
			<Grid item xs={10}>
				<Grid
					container
					item
					direction="column"
					justifyContent="center"
					alignItems="center"
				>
					<Paper elevation={3}>
						<Grid item margin={2}>
							<Typography variant="h3" component="h1" textAlign={"center"}>
								Sign In
							</Typography>
						</Grid>
						<Grid item margin={2}>
							<TextField
								id="filled-basic"
								label="Email"
								variant="filled"
								required="true"
							/>
						</Grid>
						<Grid item margin={2}>
							<TextField
								id="filled-basic"
								label="Password"
								variant="filled"
								required="true"
							/>
						</Grid>
						<Grid item margin={2} align="center">
							<ThemeProvider theme={buttonTheme}>
								<Button variant="contained">Submit</Button>
							</ThemeProvider>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SignIn;
