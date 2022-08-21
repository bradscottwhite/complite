const nameComp = new compLite('name-comp')
nameComp.attrs({
	name: String
})
nameComp.init(({ name }) => {
	return `<h1>
		Howdy sir ${name}!
	</h1>`
});
