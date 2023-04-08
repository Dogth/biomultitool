import "./Tasks.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, del, backgrounds, deleteAnim } from "../Utils/Utils";

const Tasks = () => {
	const [running, setRunning] = useState([]);
	const [completed, setCompleted] = useState([]);
	const [queued, setQueued] = useState([]);

	const displayTasks = () => {
		const set = {
			done: setCompleted,
			errored: setCompleted,
			"w/errors": setCompleted,
			queued: setQueued,
			running: setRunning,
		};

		get(`/db/tasks`).then((tasks) =>
			tasks.forEach((task) => {
				set[task.status]((prevState) => [
					...prevState,
					<Task key={task._id} data={task} />,
				]);
			})
		);
	};

	useEffect(displayTasks, []);

	const Task = ({ data }) => {
		const [style, setStyle] = useState({});

		return (
			<div
				className="Task"
				style={{
					backgroundColor: backgrounds[data.status] ?? `var(--paleOrange)`,
					...style,
				}}
			>
				{data.status !== `running` ? (
					<button
						className="Delete"
						onClick={() =>
							del(`/db/tasks/${data._id}`, () => setStyle(deleteAnim))
						}
					/>
				) : null}
				{data.status === `done` ? (
					<Link
						className="Download"
						to={`/files/${data.toolname}/${data.title}`}
					/>
				) : null}
				<p className="Title">
					{data.title} | {data.toolname}
				</p>
				<p className="Id">{data._id}</p>
				<p className="CreatedAt">{data.createdAt}</p>
				<p className="Status">{data.status}</p>
			</div>
		);
	};

	return (
		<div className="Form">
			<div className="DbWrapper">
				<div className="DbTitle">Completed</div>
				<div className="TaskList">{completed}</div>
			</div>
			<div className="DbWrapper">
				<div className="DbTitle">Running</div>
				<div className="TaskList">{running}</div>
			</div>
			<div className="DbWrapper">
				<div className="DbTitle">Queued</div>
				<div className="TaskList">{queued}</div>
			</div>
		</div>
	);
};

export default Tasks;
