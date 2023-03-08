import React from "react";
import { Navigate } from "react-router-dom";
import { Grid, Paper, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import logo from "../images/statslogoph.png";
import BarChart from "../charts/Bar";
import LineChart from "../charts/Line";
import Auth from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/graphQL/queries.js";
// this makes the charts show up. Do not remove this.
import Chart from "chart.js/auto";
import Drawer from "../components/Drawer";

const styles = {
	img: {
		width: "70px",
		height: "115px",
		paddingBottom: "20px",
	},
};

function Stats() {
	const token = Auth.getToken();
	console.log({ token });
	const { loading, data } = useQuery(QUERY_ME);

	// logout of the account
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	// if not logged in return to homepage
	if (!Auth.loggedIn()) {
		return <Navigate to="/" />;
	}
	if (loading) {
		return <div>Loading...</div>;
	}
	console.log("You are logged in!");
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
					<Typography variant="h5" component="h4" color={"default.tan"}>
						Stat-tasktic
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={1} marginY={1} marginX={1}>
				{/* text and stats box  */}
				<Paper elevation={7} sx={{ backgroundColor: "default.tan" }}>
					{/* this is the heading that tells the user they are logged in.  */}
					<Typography textAlign="center">
						Hello {data.me.username}, welcome to Stat-tasktic
					</Typography>
					<Grid
						container
						item
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						{/* This is the tab-bar for Stats and Tasks  */}
						{/* <Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
								color: "default.gray",
							}}
						>
							<Tabs value="Stats" variant="fullWidth">
								<Tab label="Stats" value="Stats" />
								<Tab label="Task Lists" value="Tasks" href="/tasklist" />
								<Tab
									label="Create List"
									value="Create List"
									href="/listcreate"
								/>
								<Tab
									label="Create Task"
									value="Create Task"
									href="/taskcreate"
								/>
							</Tabs>
						</Box> */}
						<BarChart />
						<LineChart />
						<Button
							variant="contained"
							sx={{
								backgroundColor: "default.gray",
								color: "default.blue",
								margin: ".5rem",
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

export default Stats;
