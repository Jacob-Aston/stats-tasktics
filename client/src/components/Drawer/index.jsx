import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
	const [state, setState] = React.useState({
		top: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem component={Link} to="/stats">
					<ListItemIcon>
						<BarChartIcon />
					</ListItemIcon>
					<ListItemText primary="Stats" />
				</ListItem>
			</List>
			<List>
				<ListItem component={Link} to="/tasklist">
					<ListItemIcon>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary="Task Lists" />
				</ListItem>
			</List>
			<List>
				<ListItem component={Link} to="/listcreate">
					<ListItemIcon>
						<ListAltIcon />
					</ListItemIcon>
					<ListItemText primary="Create List" />
				</ListItem>
			</List>
			<Divider />
		</Box>
	);

	return (
		<div>
			{["top"].map((anchor) => (
				<React.Fragment key={anchor}>
					<Button
						onClick={toggleDrawer(anchor, true)}
						sx={{ color: "default.darkTan" }}
					>
						<MenuIcon />
					</Button>
					<Drawer
						PaperProps={{
							sx: {
								backgroundColor: "default.darkTan",
							},
						}}
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
