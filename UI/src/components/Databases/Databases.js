import { useEffect, useState } from 'react'
import { get, dbBackgrounds, del, deleteAnim } from '../Utils/Utils'
import './Databases.css'

const Databases = () => {

const [blastDb, setBlastDb] = useState(null)
const [skaniSketch, setSkani] = useState(null)

const getMany = (collection, hook) => {
	get(`/db/${collection}`).then(entries => { hook(entries.map(entry => { return <DbEntry key={ entry._id } data={ entry } collection={ collection }/> })) })
}

const getDbs = () => {
	getMany(`blast-db`, setBlastDb)
	getMany(`skani-sketch`, setSkani)
}

useEffect(getDbs,[])

const DbEntry = ({ data, collection }) => {
	const [style, setStyle] = useState({ })
	return (
		<div className='Task' style={{ background: dbBackgrounds[data.type]??`var(--paleOrange)`, ...style }}>
			<button className='Delete' onClick={() => del(`/db/${collection}/${data._id}`, () => setStyle(deleteAnim)) }></button>
			<p className='Title'>{ data.title }</p>
			<p className='Type'>{ data.type }</p>
			<p className='Id'>{ data._id }</p>
		</div>
	)
}

return (
	<div className='DatabaseList'>
		<div className='DbWrapper'><div className='DbTitle'>Blast</div><div className='EntryList'>{ blastDb }</div></div>
		<div className='DbWrapper'><div className='DbTitle'>Skani</div><div className='EntryList'>{ skaniSketch }</div></div>	
	</div>
	)
}

export default Databases
