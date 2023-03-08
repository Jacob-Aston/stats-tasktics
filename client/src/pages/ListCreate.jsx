import React, { useState } from "react";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Alert,
	Box,
	Tab,
	Tabs,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import Auth from "../utils/auth.js";
import Drawer from "../components/Drawer";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/graphQL/queries.js";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_LIST } from "../utils/graphQL/mutations.js";

function ListCreate() {
	const token = Auth.getTokenInfo();
	// console.log({ token });
	const { loading, data } = useQuery(QUERY_ME);

	// logout of the account
	// const logout = (event) => {
	// 	event.preventDefault();
	// 	Auth.logout();
	// };
	const [listTitle, setListTitle] = useState("");
	const [taskRefreshDay, setTaskRefreshDay] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [createList, { error }] = useMutation(CREATE_LIST);

	// if not logged in return to homepage
	if (!Auth.loggedIn()) {
		return <Navigate to="/" />;
	}
	if (loading) {
		return <div>Loading...</div>;
	}

	const handleInputChange = (e) => {
		const { target } = e;
		const inputType = target.name;
		const inputValue = target.value;
		// const handleChange =
		// 	setDueDate(e.target.value);

		if (inputType === "listTitle") {
			setListTitle(inputValue);
		} else if (inputType === "taskRefreshDay") {
			setTaskRefreshDay(inputValue);
		}
	};

	async function handleFormSubmit(e) {
		e.preventDefault();

		if (listTitle.trim().length === 0) {
			setErrorMessage("Please add a name to the task");

			return;
		}

		try {
			console.log(
				`creating list for ${token.data.email} with ${listTitle} and ${taskRefreshDay}`
			);
			const { data } = await createList({
				variables: {
					email: token.data.email,
					listTitle,
					taskRefreshDay,
				},
			});
			console.log({ data });
		} catch (err) {
			console.log(data);
			console.log("ran into an error");
			console.error(err);
		}

		setListTitle("");
		setTaskRefreshDay("");
	}

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
			<Grid item marginTop={2} marginX={2}>
				{errorMessage && (
					<Alert
						severity="error"
						sx={{ backgroundColor: "default.alert", color: "default.blue" }}
					>
						<Typography color="default.blue" className="error-text">
							{errorMessage}
						</Typography>
					</Alert>
				)}
			</Grid>
			<Grid item xs={1} marginY={4} marginX={1}>
				<Paper elevation={7} sx={{ backgroundColor: "default.tan" }}>
					<Grid
						container
						item
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						{/* <Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
								color: "default.gray",
							}}
						>
							<Tabs value="Create List" variant="fullWidth">
								<Tab label="Stats" value="Stats" href="/stats" />
								<Tab label="Task Lists" value="Task Lists" href="/tasklist" />
								<Tab label="Create List" value="Create List" />
								<Tab
									label="Create Task"
									value="Create Task"
									href="/taskcreate"
								/>
							</Tabs>
						</Box> */}
						<Grid item marginY={2} marginX={3}>
							<Typography variant="h3" component="h2" textAlign={"center"}>
								Create a task:
							</Typography>
						</Grid>
						<Grid item marginBottom={3}>
							<FormControl
								variant="filled"
								sx={{ minWidth: 205, backgroundColor: "default.blue" }}
							>
								<TextField
									value={listTitle}
									name="listTitle"
									onChange={handleInputChange}
									type="text"
									id="filled-basic"
									label="Name"
									variant="filled"
								/>
							</FormControl>
						</Grid>
						<Grid item marginBottom={3}>
							<FormControl
								variant="filled"
								sx={{ minWidth: 205, backgroundColor: "default.blue" }}
							>
								<InputLabel id="demo-simple-select-filled-label">
									Renewal Day
								</InputLabel>
								<Select
									value={taskRefreshDay}
									name="taskRefreshDay"
									onChange={handleInputChange}
									type="text"
								>
									<MenuItem value="">
										<em>day</em>
									</MenuItem>
									<MenuItem value="Monday">Monday</MenuItem>
									<MenuItem value="Tuesday">Tuesday</MenuItem>
									<MenuItem value="Wednesday">Wednesday</MenuItem>
									<MenuItem value="Thursday">Thursday</MenuItem>
									<MenuItem value="Friday">Friday</MenuItem>
									<MenuItem value="Saturday">Saturday</MenuItem>
									<MenuItem value="Sunday">Sunday</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item marginBottom={3}>
							<Button
								variant="contained"
								sx={{ backgroundColor: "default.gray", color: "default.blue" }}
								onClick={handleFormSubmit}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default ListCreate;
