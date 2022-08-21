/**
 * complite
 * A minimalistic abstraction for experimenting with reactive web components
 * ....
 */
const App = (() => {
	class App {
		constructor() {
			this.appAttrs = {}
			this.appComps = {}
			this.appCompAttrs = {}
		}
		attrs(appAttrs) {
			this.appAttrs = appAttrs
			for (var attr in appAttrs)
				this.appCompAttrs[attr] = []
		}
		setAttr(attrName, attrVal) {
			var comps = this.appCompAttrs[attrName]
			for (var comp in comps)
				this.appComps[comps[comp]].setAttr(attrName, attrVal)
		}
		addComp(comp, compAttrs, compName) {
			this.appComps[compName] = comp
			for (var attr in compAttrs)
				if (this.appAttrs[attr])
					this.appCompAttrs[attr].push(compName)
		}
	}
	return App
})();

const Comp = (() => {
	class Comp {
		constructor(compName, app) {
			this.compName = compName
			this.compAttrs = {}
			this.app = app
		}
		attrs(compAttrs) { this.compAttrs = compAttrs }
		setAttr(attrName, attrVal) {
			const el = document.querySelector(this.compName)
			var elAttrVals = {}
			var attrs = this.compAttrs
			for (var attr in attrs)
				if (attr === attrName) {
					el.setAttribute(attrName, attrVal)
					elAttrVals[attr] = attrVal
				} else
					if (attrs[attr] === String)
						elAttrVals[attr] = el.getAttribute(attr)
					else if (attrs[attr] === JSON)
						elAttrVals[attr] = JSON.parse(
							el.getAttribute(attr)
						)
					else if (attrs[attr] === Number)
						elAttrVals[attr] = Number(
							el.getAttribute(attr)
						)
			el.innerHTML = this.compFn( elAttrVals )
		}
		init(fn) {
			this.compFn = fn
			const attrs = this.compAttrs
			const name = this.compName;
			class NewComp extends HTMLElement {
				connectedCallback() {
					var attrVals = {}
					for (var attr in attrs)
						if (attrs[attr] === String)
							attrVals[attr] = this.getAttribute(attr)
						else if (attrs[attr] === JSON)
							attrVals[attr] = JSON.parse(
								this.getAttribute(attr)
							)
						else if (attrs[attr] === Number)
							attrVals[attr] = Number(
								this.getAttribute(attr)
							)
					this.innerHTML = fn( attrVals )
				}
			}
			customElements.define(name, NewComp)
			this.app.addComp(this, this.compAttrs, this.compName)
		}
	}
	return Comp
})();

(() => {
	var routes = {}
	var defPath = '/'
	var curPath = window.location.hash
	var found = false
	//var prevPath = ''
	class RouterComp extends HTMLElement {
		connectedCallback() {
			var dom = this.innerHTML
			defPath = this.getAttribute('index')
		}
	}
	class RouteComp extends HTMLElement {
		connectedCallback() {
			var path = this.getAttribute('path')
			routes[path] = this.innerHTML
			if ('#' + path === curPath) {
				found = true
				//prevPath = path
			} else
				this.innerHTML = ''
		}
	}
	//Link-comp....??
	customElements.define('router-comp', RouterComp)
	customElements.define('route-comp', RouteComp)
	if (!found) {
		window.location.hash = defPath
		document.querySelector(`route-comp[path='${defPath}']`).innerHTML = routes[defPath]
	}
	window.addEventListener('hashchange', () => {
		curPath = window.location.hash
		found = false
		for (var route in routes)
			if ('#' + route === curPath) {
				found = true
				document.querySelector(`route-comp[path='${route}']`).innerHTML = routes[route]
			} else// if ('#' + route === prevPath)
				document.querySelector(`route-comp[path='${route}']`).innerHTML = ''
		if (!found) {
			window.location.hash = defPath
			document.querySelector(`route-comp[path='${defPath}']`).innerHTML = routes[defPath]
		}
	})
})();
