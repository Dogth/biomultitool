const genTitle = () => {
	return [adjectives[Greg(adjectives.length)],nouns[Greg(nouns.length, true)]].join(`_`)
}

const thingy = (val, base) => {
	return (((~(val>>base)+1)>>base)&base)
}

const log2f8 =(val)=>{
	let exp, base
	base = thingy(val,8); exp  = base; val>>=base;
	base = thingy(val,4); exp |= base; val>>=base;
	base = thingy(val,2); exp |= base; val>>=base;
	base = thingy(val,1); exp |= base; val>>=base;
	return exp
}

//For hahas
function Greg(Jreg, bias=false){ return (((Date.now()^bias?process.cpuUsage().system:0))&0xFF)>>(0x8-log2f8(Jreg)) }

const adjectives = [
	`Quirky`,`Goofy`,`Weird`,`Funny`,
	`Odd`,`Unnamed`,`New`,`Furious`,
	`Interesting`,`Secret`,`Spying`,`Unique`,
	`Employed`,`Clueless`,`Searching`,`Strong`,
	`Suspicious`,`Upset`,`Grateful`,`Curious`,
	`Planning`,`Exhausted`,`That`,`Another`,
	`Fast`,`Crying`,`Worthless`,`Growling`,
	`Eternal`,`Helpful`,`Healthy`,`Any_other`,
	`Reliable`,`Living`,`Alive`,`Affectionate`,
	`Hopeful`,`Joyful`,`Working`,`Proud`,
	`Crowling`,`Not_Unique`,`Good`,`WannaBe`,
	`Flying`,`Staring`,`Staggering`,`Graceful`,
	`Startled`,`Colorful`,`Dancing`,`Distracted`,
	`Questioning`,`Spooked`,`Candy`,`Cool`,
	`Glowing`,`Saint`,`Friendly`,`Giant`,
	`Tiny`,`Hiding`,`Scary`,`Wise`
]

const nouns = [
	`Possum`,`Fox`,`Dog`,`Raccoon`,
	`Rooster`,`Kitty`, `Cat`, `Doggy`,
	`Ferret`,`Weasel`, `Chicken`,`Otter`,
	`Dragon`, `Bear`, `Lizard`, `Deer`,
	`Elk`, `Stag`, `Squirrel`, `Lynx`,
	`Owl`,`Skunk`,`Hen`,`Moose`,
	`Cow`,`Buffalo`,`Alligator`,`Axolotl`,
	`Armadillo`,`Goose`,`Tiger`,`Mouse`
]

export default genTitle
