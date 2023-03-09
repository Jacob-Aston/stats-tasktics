import React from "react";
import { Navigate } from "react-router-dom";
import { Grid, Paper, Typography, Button } from "@mui/material";
import BarChart from "../charts/Bar";
import LineChart from "../charts/Line";
import Auth from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/graphQL/queries.js";
import Chart from "chart.js/auto";
import Drawer from "../components/Drawer";

function Stats() {
	const token = Auth.getToken();
	console.log({ token });
	const { loading, data } = useQuery(QUERY_ME);


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
	console.log("You are logged in!");
	console.log({ token });
	console.log({ data });

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

				<Paper elevation={7} sx={{ backgroundColor: "default.tan" }}>
					<Grid item marginBottom={3}>
						<Typography textAlign="center">
							Hello {data.me.username}, welcome to Stat-tasktic
						</Typography>
					</Grid>
					<Grid
						container
						item
						direction="column"
						justifyContent="center"
						alignItems="center"
					>

						<Grid item marginBottom={3} marginX={2}>
							<BarChart />
						</Grid>
						<Grid item marginBottom={3}>
							<LineChart />
						</Grid>
					</Grid>
				</Paper>
				<Grid
					container
					item
					marginTop={3}
					direction={"row"}
					justifyContent={"center"}
				>
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
			</Grid>
		</Grid>
	);
}

export default Stats;
