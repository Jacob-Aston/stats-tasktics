import React from "react";
import { Navigate } from "react-router-dom";
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
} from "@mui/material";
import logo from "../images/statslogoph.png";
import Auth from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/graphQL/queries.js";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Drawer from "../components/Drawer";

const styles = {
	img: {
		width: "95px",
		height: "145px",
		paddingTop: "20px",
	},
};

function TaskList() {
	const token = Auth.getTokenInfo();
	// console.log({ token });
	const { loading, data } = useQuery(QUERY_ME);

	// getting data from server
	console.log({ data });

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
					<Typography variant="h5" component="h4" color={"default.tan"}>
						Stat-tasktic
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={1} marginY={4} marginX={1}>
				{/* text and stats box  */}
				<Paper elevation={7} sx={{ backgroundColor: "default.tan" }}>
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
						{/* This is the tab-bar for Stats and Tasks  */}
						{/* <Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
								color: "default.gray",
							}}
						>
							<Tabs value="Task Lists" variant="fullWidth">
								<Tab label="Stats" value="Stats" href="/stats" />
								<Tab label="Task Lists" value="Task Lists" />
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
						<Box>
							<Accordion
								expanded={expanded === "panel1"}
								onChange={handleChange("panel1")}
								sx={{
									backgroundcolor: "default.blue",
									color: "default.gray",
								}}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
                  {/* TODO: add logic here to loop over the lists array to create lists */}
									<Typography sx={{ width: "33%", flexShrink: 0 }}>
										[Task List Name]
									</Typography>
									<Typography sx={{ color: "text.secondary" }}>
										[Renewal Day]
									</Typography>
								</AccordionSummary>
                {/* TODO: add logic here to loop over the tasks array inside each list */}
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

export default TaskList;
