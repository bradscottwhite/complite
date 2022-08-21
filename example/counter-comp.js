const counterComp = new compLite('counter-comp')

counterComp.attrs({
	num: Number
})

counterComp.init(({ num }) => {
	return `<h2>${num}</h2>`
})
