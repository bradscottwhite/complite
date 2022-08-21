const names = [ 'Brad', 'Henry', 'Patrick' ]
const newNames = [ 'Carter', 'John', 'Raleigh', 'Cecil' ]
var num = 0

const app = new App()
app.attrs({
	num: Number,
	names: JSON,
	name: String
})

const changeData = () => {
	num % 2 == 0 ? app.setAttr('names', newNames) : app.setAttr('names', names)
	app.setAttr('num', ++num)
}

const appComp = new Comp('app-comp', app)
appComp.init(() => {
	return `<div>
		<names-comp
			names='${JSON.stringify(names)}'
		></names-comp>
		<button onclick='changeData()'>Change data/rerender state</button>
		<counter-comp num='${num}'></counter-comp>
	</div>`
});
