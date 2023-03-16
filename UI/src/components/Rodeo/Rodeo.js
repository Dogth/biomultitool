import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { sendForm, ProgressBar } from '../Utils/Utils'

const Rodeo = () => {

const {register, handleSubmit} = useForm()
const [progress, setProgress] = useState(0)

	return (
		<div className='Form'>
		<div className='ToolForm'>
			<div className='DbTitle'>RiPP Rodeo</div>
			<form onSubmit={ handleSubmit(data => sendForm(data, `/services/rodeo`, setProgress)) }>
				<input {...register("title") } type="text" placeholder="Title" />
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

export default Rodeo
