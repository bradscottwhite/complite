const newComp = new Comp('new-comp', app)

newComp.init(() => {
	return `<h1>
		This is a new page!
	</h1>`
});
