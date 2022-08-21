const greetingComp = new Comp('greeting-comp', app)

greetingComp.init(() => {
	return `<h1>
		Howdy sir ${ app.param('name') }!
	</h1>`
});
