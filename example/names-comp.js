const namesComp = new Comp('names-comp', app)

namesComp.attrs({
	names: JSON
})

namesComp.init(({ names }) => {
	var html = ''
	for (var name in names)
		html += `<name-comp name='${names[name]}'></name-comp>`
	return `<div>${html}</div>`
});
