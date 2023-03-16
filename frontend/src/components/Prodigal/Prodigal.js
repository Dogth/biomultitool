import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { sendForm, ProgressBar } from '../Utils/Utils'

const Prodigal = () => {

const {register, handleSubmit} = useForm()
const [progress, setProgress] = useState(0)

	return (
		<div className='Form'>
		<div className='ToolForm'>
		<div className='DbTitle'>Prodigal</div>
			<form onSubmit={ handleSubmit(data => sendForm(data, `/services/prodigal`, setProgress)) }>
				<input {...register("title") } type="text" placeholder="Title" />
				<select defaultValue="gbk" {...register("format") }>
					<option value="gbk">Genbank</option>
					<option value="gff">Gene feature format</option>
					<option value="sco">SCO</option>
				</select>
				<textarea {...register("query") } type="text" placeholder="Query" spellCheck="false" />
				<input {...register("files") } type="file" multiple/>
				<ProgressBar progress={ progress }/>
				<input {...register("args")} placeholder="Arguments" type="text" />
				<input disabled={ (progress<=99 && progress>=1) } type="submit"/>
			</form>
		</div>
		</div>
	)
}

export default Prodigal
