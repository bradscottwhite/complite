const names = [ 'Brad', 'Henry', 'Patrick', 'Carter', 'John' ]
var num = 0

const app = new App()

const changeData = () => app.setAttr('num', ++num)

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
