import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Alert,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import logo from "../images/statslogoph.png";
import Drawer from "../components/Drawer";
import Auth from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/graphQL/queries.js";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../utils/graphQL/mutations.js";

function TaskCreate() {
	const token = Auth.getTokenInfo();

	const { loading, data } = useQuery(QUERY_ME);


	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");

	const [errorMessage, setErrorMessage] = useState("");
	const [createTask, { error }] = useMutation(CREATE_TASK);



	const handleInputChange = (e) => {
		const { target } = e;
		const inputType = target.name;
		const inputValue = target.value;


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
					listId: window.localStorage.getItem("currentListId"),
					taskTitle: title,
					taskDescription: description,
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
		navigate("/tasklist");
	};

	if (!Auth.loggedIn()) {
		return <Navigate to="/" />;
	}
	if (loading) {
		return <div>Loading...</div>;
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
			<Grid item marginX={2}>
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

export default TaskCreate;
