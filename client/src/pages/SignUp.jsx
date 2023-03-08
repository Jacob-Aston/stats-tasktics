import React, { useState } from "react";
import { CREATE_USER } from "../utils/graphQL/mutations.js";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth.js";
// import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Box,
	Alert,
} from "@mui/material";

import logo from "../images/statslogoph.png";
import { checkPassword, validateEmail } from "../utils/helpers";
import { login } from "../utils/auth";

const styles = {
	img: {
		width: "95px",
		height: "145px",
		paddingTop: "20px",
	},
};

function SignUp() {
	// const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [createUser, { error }] = useMutation(CREATE_USER);

	const handleInputChange = (e) => {
		const { target } = e;
		const inputType = target.name;
		const inputValue = target.value;

		if (inputType === "email") {
			setEmail(inputValue);
		} else if (inputType === "userName") {
			setUserName(inputValue);
		} else {
			setPassword(inputValue);
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (!validateEmail(email) || !userName) {
			setErrorMessage("Email or username is invalid");

			return;
		}
		if (!checkPassword(password)) {
			setErrorMessage(
				`Password must have one letter, and can be between 8-15 characters`
			);
			return;
		}

		try {
			console.log(`creating user with ${userName}, ${email}, and ${password}`);
			const { data } = await createUser({
				variables: {
					email,
					username: userName,
					password,
				},
			});
			console.log({ data });
			Auth.login(data.addUser.token);
		} catch (err) {
			console.log("ran into an error");
			console.error(err);
		}

		setUserName("");
		setPassword("");
		setEmail("");
		// navigate("/stats");
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Grid item>
				<img alt="stat-tasktic logo" style={styles.img} src={logo} />
			</Grid>
			<Grid item>
				<Typography variant="h3" component="h1" color="black">
					Stat-tasktic
				</Typography>
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
						<Box margin={1} paddingY={2}>
							<Typography variant="h4" component="h2" textAlign={"center"}>
								Sign Up
							</Typography>
						</Box>
						<Box margin={1}>
							<TextField
								value={userName}
								name="userName"
								onChange={handleInputChange}
								type="text"
								id="username"
								label="Username"
								variant="filled"
								required
								color="info"
								align="center"
								sx={{ backgroundColor: "default.blue" }}
							/>
						</Box>
						<Box margin={3}>
							<TextField
								value={email}
								name="email"
								onChange={handleInputChange}
								type="email"
								id="email-signup"
								label="Email"
								variant="filled"
								required
								color="info"
								sx={{ backgroundColor: "default.blue" }}
							/>
						</Box>
						<Box margin={1}>
							<TextField
								value={password}
								name="password"
								onChange={handleInputChange}
								type="password"
								id="password-signup"
								label="Password"
								variant="filled"
								required
								color="info"
								align="center"
								sx={{ backgroundColor: "default.blue" }}
							/>
						</Box>
						<Box marginY={3} paddingTop={2} align="center">
							<Button
								variant="contained"
								sx={{ backgroundColor: "default.gray", color: "default.blue" }}
								onClick={handleFormSubmit}
								component={RouterLink}
								to="/stats"
							>
								Submit
							</Button>
						</Box>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default SignUp;
