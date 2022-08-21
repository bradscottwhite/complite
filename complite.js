/**
 * compLite
 * A minimalistic abstraction for experimenting with reactive web components
 * ....
 */
const compLite = (() => {
	class CompLite {
		constructor(compName) {
			this.compName = compName
			this.compAttrs = {}
		}
		attrs(compAttrs) { this.compAttrs = compAttrs }
		setAttr(attrName, attrVal) {
			const el = document.querySelector(this.compName)
			this.compAttrs[attrName] = attrVal
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
		}
	}
	return CompLite;
})();
