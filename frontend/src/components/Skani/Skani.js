import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { get, sendForm, ProgressBar } from "../Utils/Utils";

const SkaniForm = () => {
	const Skani = () => {
		const { register, handleSubmit } = useForm();
		const [databases, setDatabases] = useState();
		const [progress, setProgress] = useState(0);

		const getSkaniDb = () => {
			get(`/db/skani-sketch`).then((entries) =>
				setDatabases(
					entries.map((entry) => {
						return (
							<option key={entry._id} value={entry.name}>
								{entry.title}
							</option>
						);
					})
				)
			);
		};

		useEffect(getSkaniDb, []);

		return (
			<div className="ToolForm">
				<div className="DbTitle">Skani</div>
				<form
					onSubmit={handleSubmit((data) =>
						sendForm(data, data.type, setProgress)
					)}
				>
					<input {...register("title")} type="text" placeholder="Title" />
					<select
						defaultValue="/services/skani-search"
						required
						{...register("type")}
					>
						<option value="/services/skani-search">Search</option>
						<option value="/services/skani-dist">Dist</option>
					</select>
					<textarea
						{...register("query")}
						type="text"
						placeholder="Query"
						spellCheck="false"
					/>
					<input {...register("files")} type="file" multiple />
					<ProgressBar progress={progress} />
					<select required {...register("db")}>
						<option value="">Select a sketch</option>
						{databases}
					</select>
					<input {...register("args")} placeholder="Arguments" type="text" />
					<input disabled={progress <= 99 && progress >= 1} type="submit" />
				</form>
			</div>
		);
	};

	const SkaniSketch = () => {
		const { register, handleSubmit } = useForm();
		const [progress, setProgress] = useState(0);

		return (
			<div className="ToolForm">
				<div className="DbTitle">Skani Sketch</div>
				<form
					onSubmit={handleSubmit((data) =>
						sendForm(
							{ type: `sketch`, ...data },
							"/services/skani-sketch",
							setProgress
						)
					)}
				>
					<input {...register("title")} type="text" placeholder="Title" />
					<textarea
						{...register("query")}
						type="text"
						placeholder="Query"
						spellCheck="false"
					/>
					<input {...register("files")} type="file" multiple />
					<ProgressBar progress={progress} />
					<input {...register("args")} placeholder="Arguments" type="text" />
					<input disabled={progress <= 99 && progress >= 1} type="submit" />
				</form>
			</div>
		);
	};

	const SkaniTriangle = () => {
		const { register, handleSubmit } = useForm();
		const [progress, setProgress] = useState(0);

		return (
			<div className="ToolForm">
				<div className="DbTitle">Skani Triangle</div>
				<form
					onSubmit={handleSubmit((data) =>
						sendForm(data, "/services/skani-triangle", setProgress)
					)}
				>
					<input {...register("title")} type="text" placeholder="Title" />
					<textarea
						{...register("query")}
						type="text"
						placeholder="Query"
						spellCheck="false"
					/>
					<input {...register("files")} type="file" multiple />
					<ProgressBar progress={progress} />
					<input {...register("args")} placeholder="Arguments" type="text" />
					<input disabled={progress <= 99 && progress >= 1} type="submit" />
				</form>
			</div>
		);
	};

	return (
		<div className={"Form"}>
			<Skani />
			<SkaniSketch />
			<SkaniTriangle />
		</div>
	);
};
export default SkaniForm;
