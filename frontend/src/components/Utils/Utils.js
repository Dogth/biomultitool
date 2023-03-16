import axios from "axios"
import { Link } from "react-router-dom"

const URL = `/api`

const API = axios.create({
	baseURL: URL
})

export const backgrounds = {
	queued: `var(--paleBlue)`,
	done:`var(--paleGreen)`,
	running:`var(--background)`
}

export const dbBackgrounds = {
	nucl: `var(--paleGreen)`,
	prot: `var(--paleBlue)`
}

export const deleteTaskAnim = {
	zIndex: `0`,
	transform: `translateX(-110%) scale(70%)`,
	marginBottom: `-115px`,
	transition: `transform .6s, margin-bottom .6s`
}

export const deleteAnim = {
	marginBottom: `-115px`,
	transform: `scale(0%)`,
	transition: `all .6s`
}

export const deleteAnimCard = {
	display: `none`
}

export const ProgressBar = ({ progress }) => {
	return (
		<div className='ProgressBar'><progress max="100" value={ progress }/></div>
	)
}

export const get = async ( path ) => {
  return await API.get(path)
		.then(res => { return res.data.reverse() })
		.catch(err => { console.log(err); return [] })
}

export const del = async ( path, onDone, onError=(err => (console.log(err))) ) => {
	API.delete(path)
		.then(res => onDone(res))
		.catch(err => onError(err))
}

export const getData = async ( file, hook, ref ) => {
	if(file.size > 1000000) ref.current = { data:`File too large to preview`, info: file }
	else ref.current = { data: (await API.get(`/files${file.path}`)).data, info: file }
	hook(ref.current)
}

export const sendForm = ( data, path, hook, onDone) => {
	API.post(`${path}`,
		data,
		{ headers: { "Content-type":"multipart/form-data" },
			onUploadProgress: ProgressEvent => { hook(Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total)) }
		})
		.then(res => onDone(res))
		.catch(err => console.log(err))
}

export const DownloadLink = ({ path, filename }) => { return (
		<Link to={`${URL}/download${path}`} className='Download' target="_blank" download={ filename } />)
}

