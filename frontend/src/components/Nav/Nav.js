import "./Nav.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<div className="Nav">
			<p className="Separator">Analysis</p>
			<NavLink
				to={"/blast"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Blast
			</NavLink>
			<NavLink
				to={"/rodeo"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Rodeo
			</NavLink>
			<NavLink
				to={"/prodigal"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Prodigal
			</NavLink>
			<NavLink
				to={"/skani"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Skani
			</NavLink>
			<p className="Separator">System</p>
			<NavLink
				to={"/files"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Files
			</NavLink>
			<NavLink
				to={"/databases"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Databases
			</NavLink>
			<NavLink
				to={"/tasks"}
				className={({ isActive }) => (isActive ? "Active" : null)}
			>
				Tasks
			</NavLink>
		</div>
	);
};

export default Nav;
