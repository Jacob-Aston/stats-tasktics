import React, { useState } from "react";
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

function TaskCreate() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	// const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleInputChange = (e) => {
		const { target } = e;
		const inputType = target.name;
		const inputValue = target.value;

		if (inputType === "title") {
			setTitle(inputValue);
		} else if (inputType === "description") {
			setDescription(inputValue);
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

		setTitle("");
		setDescription("");
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
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
									type="select"
									labelId="demo-simple-select-filled-label"
									id="demo-simple-select-filled"
									// value={age}
									// onChange={handleChange}
								>
									<MenuItem value="">
										<em>day</em>
									</MenuItem>
									<MenuItem value={"monday"}>Monday</MenuItem>
									<MenuItem value={"tuesday"}>Tuesday</MenuItem>
									<MenuItem value={"wednesday"}>Wednesday</MenuItem>
									<MenuItem value={"thursday"}>Thursday</MenuItem>
									<MenuItem value={"friday"}>Friday</MenuItem>
									<MenuItem value={"saturday"}>Saturday</MenuItem>
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
			</Grid>
		</Grid>
	);
}

export default TaskCreate;
