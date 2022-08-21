const nameComp = new Comp('name-comp', app)

nameComp.attrs({
	name: String
})

nameComp.init(({ name }) => {
	return `<h1>
		Howdy sir ${name}!
	</h1>`
});
