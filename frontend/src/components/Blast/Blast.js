import "../Utils/Utils.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { get, sendForm, ProgressBar } from "../Utils/Utils";

const BlastForm = () => {
	const Blast = () => {
		const { register, handleSubmit } = useForm();
		const [databases, setDatabases] = useState();
		const [progress, setProgress] = useState(0);

		const getBlastDb = () => {
			get(`/db/blast-db`).then((entries) =>
				setDatabases(
					entries.map((entry) => {
						return (
							<option key={entry._id} value={entry.title}>
								{entry.title} ({entry.type})
							</option>
						);
					})
				)
			);
		};

		useEffect(getBlastDb, []);

		return (
			<div className="ToolForm">
				<div className="DbTitle">Blast</div>
				<form
					onSubmit={handleSubmit((data) =>
						sendForm(data, "/services/blast", setProgress)
					)}
				>
					<input {...register("title")} type="text" placeholder="Title" />
					<select defaultValue="blastn" {...register("type")}>
						<option value="blastn">Nucleotide - Nucleotide</option>
						<option value="blastp">Protein - Protein</option>
						<option value="blastx">Nucleotide - Protein</option>
						<option value="tblastn">Protein - Nucleotide</option>
						<option value="tblastx">Translated nucleotide</option>
					</select>
					<select defaultValue="7" {...register("outfmt")}>
						<option value="0">Pairwise</option>
						<option value="1">Query-anchored showing identities</option>
						<option value="2">Query-anchored no identities</option>
						<option value="3">Flat query-anchored showing identities</option>
						<option value="4">Flat query-anchored no identities</option>
						<option value="5">BLAST XML</option>
						<option value="6">Tabular</option>
						<option value="7">Tabular with comments</option>
						<option value="8">Seqalign (Text ASN.1)</option>
						<option value="9">Seqalign (Binary ASN.1)</option>
						<option value="10">Comma-separated values</option>
						<option value="11">BLAST archive (ASN.1)</option>
						<option value="12">Seqalign (JSON)</option>
						<option value="13">Multiple-file JSON</option>
						<option value="14">Multiple-file XML2</option>
						<option value="15">Single-file JSON</option>
						<option value="16">Single-file XML2</option>
						<option value="17">Sequence Alignment/Map</option>
						<option value="18">Organism Report</option>
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
						<option value="">Select a database</option>
						{databases}
					</select>
					<input {...register("args")} type="text" placeholder="Arguments" />
					<input disabled={progress <= 99 && progress >= 1} type="submit" />
				</form>
			</div>
		);
	};

	const BlastDb = () => {
		const { register, handleSubmit } = useForm();
		const [progress, setProgress] = useState(0);

		return (
			<div className="ToolForm">
				<div className="DbTitle">Blast DB</div>
				<form
					onSubmit={handleSubmit((data) =>
						sendForm(data, "/services/blast-db", setProgress)
					)}
				>
					<input {...register("title")} type="text" placeholder="Title" />
					<select defaultValue="nucl" {...register("type")}>
						<option value="nucl">Nucleotide</option>
						<option value="prot">Protein</option>
					</select>
					<input {...register("files")} type="file" multiple />
					<ProgressBar progress={progress} />
					<input {...register("args")} type="text" placeholder="Arguments" />
					<input disabled={progress <= 99 && progress >= 1} type="submit" />
				</form>
			</div>
		);
	};

	return (
		<div className={"Form"}>
			<Blast />
			<BlastDb />
		</div>
	);
};
export default BlastForm;
