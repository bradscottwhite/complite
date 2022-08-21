const counterComp = new Comp('counter-comp', app)

counterComp.attrs({
	num: Number
})

counterComp.init(({ num }) => {
	return `<h2>${num}</h2>`
})
