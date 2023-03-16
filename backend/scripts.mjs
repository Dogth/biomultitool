import { WriteStream } from 'fs'
import { normalize, extname } from 'path'
import { concatStreams } from './utils/utils.mjs'

const getBlastExt = (outfmt) => { 
	switch (outfmt) {
		case `10`: return `.csv`
		case `17`: return `.sam`
		case `5` :case`16`: return `.xml`
		case `6` :case `7`: return `.tsv`
		case `12`:case`15`: return `.json`
		case `13`:case`14`: return ``
		case `8` :case`9` :case`11`: return `.asn`
		default: return `.txt`
	}
}

const toolData = (path, script) => { return {path:path, script:script} }

export const blast = async ({ type, db, outfmt=10, args }, { title, dir, files }) => {
	const path = `/shared/blast/${title}`
	const ext = getBlastExt(outfmt)
	const database = `/shared/blastDb/${db}/${db}`
	const base = `${type} -db ${database} -outfmt ${outfmt} ${args??``}`	
	return toolData ( path, files.map(file => { return normalize(`${base} -query ${dir}/${file} -out ${path}/${file.replace(extname(file), ext)}`) }
	))
}

export const blastDb = async ({ type, args }, { title, dir, files }) => {
	const path = `/shared/blastDb/${title}`
	const concatDb = async () => {
		return await new Promise(resolve => {
			concatStreams(files, dir)
			.on(`end`, () => resolve(makeblastdb(`cat.faa`)))
			.pipe(WriteStream(`${dir}/cat.faa`))
		})
	}
	const makeblastdb = (file) => {
	return normalize(`makeblastdb -in ${dir}/${file} -dbtype ${type} -title ${title} -out ${path}/${title} ${args??``}`)
	}
	return toolData( path, (files.length>1?await concatDb():makeblastdb(files)) )
}

export const rodeo = async ({ args }, { title, dir, files }) => {
	const path = `/shared/rodeo/${title}`
	return toolData( path, (files.map(file => {	return normalize(`rodeo2 ${dir}/${file} -hmm /hmm_dir/ -out ${path} ${args??``}`) })) )
}

export const prodigal = async ({ format=`gbk`, args }, { title, dir, files }) => {
	const path = `/shared/prodigal/${title}`
	return toolData(path, (files.map(file => {
		return normalize(`prodigal -i ${dir}/${file} -f ${format} -a ${path}/${file.replace(extname(file), `.${format}`)} ${args??``}`) }
	)))
}

export const skaniDist = async ({ db, args }, { title, dir, files }) => {
	const path = `/shared/skaniDist/${title}`
	return toolData( path, (files.map(file => {
		return normalize(`skani dist -r /shared/skaniSketch/${db}/sketch/* -q ${dir}/${file} -t 1 -o ${path}/${file} ${args??``}`) }
 )))
}

export const skaniSearch = async ({ db, args }, { title, dir }) => {
	const path = `/shared/skaniSearch/${title}`
	return toolData( path, (normalize(`skani search -d /shared/skaniSketch/${db}/sketch/ -o ${path}/${title}.tsv -q ${dir}/* -t 1 ${args??``}`)) )
}

export const skaniSketch = async ({ args }, { title, dir }) => {
	const path = `/shared/skaniSketch/${title}/`
	return toolData( path, (normalize(`skani sketch ${dir}/* -o ${path}/sketch/ -t 1 ${args??``}`)) )
}

export const skaniTriangle = async ({ args }, { title, dir }) => {
	const path = `/shared/skaniTriangle/${title}`
	return toolData( path, (normalize(`skani triangle ${dir}/* -o ${path}/${title}.tsv -t 1 ${args??``}`)) )
}

