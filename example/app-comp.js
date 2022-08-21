const names = [ 'Brad', 'Henry', 'Patrick' ]
const newNames = [ 'Carter', 'John', 'Raliegh', 'Cecil' ]
var num = 0
const changeData = () => {
	num++ % 2 == 0 ? namesComp.setAttr('names', newNames) : namesComp.setAttr('names', names)
	counterComp.setAttr('num', num)
}

const appComp = new compLite('app-comp')
appComp.init(() => {
	return `<div>
		<names-comp
			names='${JSON.stringify(names)}'
		></names-comp>
		<button onclick='changeData()'>Change data/rerender state</button>
		<counter-comp num='${num}'></counter-comp>
	</div>`
});
