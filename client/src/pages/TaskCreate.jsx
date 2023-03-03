import React, { useState } from "react";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Box,
	Link,
	Alert,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";

function SignIn() {
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Grid item xs={1} marginY={4} marginX={1}>
				<Paper elevation={7} sx={{ backgroundColor: "default.tan" }}>
					<Grid
						container
						item
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>
							<Typography>Create a task:</Typography>
						</Grid>
						<Grid item>
							<TextField
								id="filled-basic"
								label="Task List Name"
								variant="filled"
							/>
						</Grid>
						<Grid item>
							<TextField
								id="filled-multiline-flexible"
								label="Task List"
								multiline
								maxRows={4}
								variant="filled"
							/>
						</Grid>
						<Grid item>
							<FormControl variant="filled" sx={{ m: 1, minWidth: 160 }}>
								<InputLabel id="demo-simple-select-filled-label">
									Repeat Day
								</InputLabel>
								<Select
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
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default SignIn;
