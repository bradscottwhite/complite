const namesComp = new compLite('names-comp')
namesComp.attrs({
	names: JSON
})
namesComp.init(({ names }) => {
	var html = ''
	for (var name in names)
		html += `<name-comp name='${names[name]}'></name-comp>`
	return `<div>${html}</div>`
});
