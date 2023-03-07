import React, { useState } from "react";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Box,
	Tab,
	Tabs,
	Alert,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import Drawer from "../components/Drawer";
import Auth from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/graphQL/queries.js";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../utils/graphQL/mutations.js";

function TaskCreate() {
	const token = Auth.getToken();
	// console.log({ token });
	const { loading, data } = useQuery(QUERY_ME);

	// logout of the account
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	// const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [createTask, { error }] = useMutation(CREATE_TASK);

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

		if (inputType === "title") {
			setTitle(inputValue);
		} else if (inputType === "description") {
			setDescription(inputValue);
		} else if (inputType === "dueDate") {
			setDueDate(inputValue);
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (title.trim().length === 0) {
			setErrorMessage("Please add a name to the task");

			return;
		}
		if (description.trim().length === 0) {
			setErrorMessage(`Please add a description to the task`);
			return;
		}

		try {
			console.log(
				`creating task with ${title}, ${description}, and ${dueDate}`
			);
			const { data } = await createTask({
				variables: {
					title,
					description,
					dueDate,
				},
			});
			console.log({ data });
		} catch (err) {
			console.log(data);
			console.log("ran into an error");
			console.error(err);
		}

		setTitle("");
		setDescription("");
		setDueDate("");
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Drawer />
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
						<Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
								color: "default.gray",
							}}
						>
							<Tabs value="Create Task" variant="fullWidth">
								<Tab label="Stats" value="Stats" href="/stats" />
								<Tab label="Task Lists" value="Task Lists" href="/tasklist" />
								<Tab
									label="Create List"
									value="Create List"
									href="/listcreate"
								/>
								<Tab label="Create Task" value="Create Task" />
							</Tabs>
						</Box>
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
									value={title}
									name="title"
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
								<TextField
									value={description}
									name="description"
									onChange={handleInputChange}
									type="text"
									id="filled-multiline-flexible"
									label="Description"
									multiline
									maxRows={4}
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
									value={dueDate}
									name="dueDate"
									onChange={handleInputChange}
									type="text"
								>
									<MenuItem value="">
										<em>day</em>
									</MenuItem>
									<MenuItem value="monday">Monday</MenuItem>
									<MenuItem value="tuesday">Tuesday</MenuItem>
									<MenuItem value="wednesday">Wednesday</MenuItem>
									<MenuItem value="thursday">Thursday</MenuItem>
									<MenuItem value="friday">Friday</MenuItem>
									<MenuItem value="saturday">Saturday</MenuItem>
									<MenuItem value={"sunday"}>Sunday</MenuItem>
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
				<Grid container item direction={"row"} justifyContent={"center"}>
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

export default TaskCreate;
