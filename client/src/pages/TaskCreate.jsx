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
								<TextField id="filled-basic" label="Name" variant="filled" />
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
