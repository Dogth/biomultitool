import "./Tools.css";
import { Route, Routes } from "react-router-dom";
import Blast from "../Blast/Blast";
import Tasks from "../Tasks/Tasks";
import Rodeo from "../Rodeo/Rodeo";
import Prodigal from "../Prodigal/Prodigal";
import Databases from "../Databases/Databases";
import SkaniSearch from "../Skani/Skani";
import Files from "../Files/FS";

const Tools = () => {
	return (
		<div className="Tool">
			<Routes>
				<Route path="/" element={<Blast />} />
				<Route path="/files/*" element={<Files />} />
				<Route path="/tasks" element={<Tasks />} />
				<Route path="/blast" element={<Blast />} />
				<Route path="/rodeo" element={<Rodeo />} />
				<Route path="/prodigal" element={<Prodigal />} />
				<Route path="/databases" element={<Databases />} />
				<Route path="/skani" element={<SkaniSearch />} />
			</Routes>
		</div>
	);
};

export default Tools;
