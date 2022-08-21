const nameComp = new Comp('name-comp', app)

nameComp.attrs({
	name: String
})

nameComp.init(({ name }) => {
	return `<h3>
		<a href='#/name/${name}'>${name}</a>
	</h3>`
});
