import './Files.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useResolvedPath } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer';
import { get, getData, del, sendForm, DownloadLink, ProgressBar, deleteAnimCard } from '../Utils/Utils';

const FS = () => {

const path = useResolvedPath().pathname

const previewInfo = {
	info: { filename: 'File preview' },
	data: 'Click on a file to preview its contents'
}

const ref = useRef(previewInfo)

const Files = () => {

const { register, handleSubmit } = useForm()

const [files, setFiles] = useState (null)
const [data, setPreview] = useState(ref.current)

const getFiles = () => {
	get( path ).then(files => { setFiles(files.reverse().map(file => { return file.isDir?
			<Dir key={file.filename} data={file}/>
			:<File key={file.filename} data={file}/>
		}))
	})
}

useEffect(getFiles, [])

const File = ({ data }) => {
	const [style, setStyle] = useState()
	return (
		<div className='File' style={ style }>
			<button className='Delete' onClick={() => { del(`/files${data.path}`, setStyle(deleteAnimCard)) }} />
			<DownloadLink path={ data.path } />
			<div onClick={() => getData(data, setPreview, ref) }>
				<Info data={ data }/>
			</div>
		</div>
	)
}

const Dir = ({ data }) => {
	return (
	<div className='Dir'>
		<button className='Delete' onClick={() => { del(`/files${data.path}`, getFiles) }}/>
		<DownloadLink path={ data.path } />
		<Link to={`/files${data.path}`}>
			<Info data={data}/>
		</Link>
	</div>
	)
}

const Info = ({ data }) => {
	return ( 
		<div className='Info'>
			<p className='Filename'>{data.filename}</p>
			<p className='Ext'>{data.ext?data.ext:`Dir`}</p>
			<p className='CreatedAt'>{Intl.DateTimeFormat().format(new Date(data.createdAt))}</p>
			<p className='Size'>{Intl.NumberFormat({style:`unit`, unit:`byte`}).format(data.size)}B</p>
		</div>
	)
}

const New = () => {
	const [progress, setProgress] = useState(0)
	return (
		<div className='New'>
		<form onChange={ handleSubmit(data => sendForm(data, path, setProgress, getFiles)) }>
				<input { ...register(`files`) } type="file" multiple />
		</form>
			<ProgressBar progress={ progress } />
		</div>
	)
}

const Preview = ({ data }) => {
	const binTo64 = (data) => { return Buffer.from(data).toString('base64') }
	const types = {
	"text/html": <iframe title={data.info.title} src={`data:${data.info.mime};base64,${binTo64(data.data)}`}/>,
	"image/svg+xml": <img src={ `data:${data.info.mime};base64,${binTo64(data.data)}` } className='PreviewImg' alt={``}/>
	}

	return (
		<div className='Preview'>
			<div className='FileInfo'>
				{ data.info.path?(<><button className='Delete' onClick={() => del(`/files${data.info.path}`, () => { setPreview(previewInfo); getFiles()  })} />
				<DownloadLink path={ data.info.path } /></>):null }
				<p className='Filename'>{data.info.filename}</p>
				<p className='CreatedAt'>{data.info.createdAt}</p>
			</div>
			<div className='FileData'>{types[data.info.mime]??<code>{data.data}</code>}</div>
		</div>
	)
}

const PathSelector = () => {
	
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()

	return (
		<div className='PathSelector'>
			<form onSubmit={ handleSubmit(data => navigate(`${data.path}`)) }>
				<input {...register("path")} defaultValue={ path } type="text" />
			</form>
		</div>
	)
}

return (
	<div className='Divider' style={{gridTemplateColumns:"60% 40%"}} >
		<div className='Wrapper'>
			<div className='FSnav'><PathSelector /></div>
			<div className='Files'><New />{files}</div>
		</div>
		<Preview data={ data } />
	</div>
	)
}

return (<Files />)
}

export default FS
