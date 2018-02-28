$(document).ready(function () {
	var map = (l, f) => {
		var ret = [];
		for (let i = 0; i < l.length; i++) {
			ret.push(f(l[i]));
		}
		return ret
	}

	var pageItems = ["developer", "project", "task", "customer", "client"];

	function buildNavBar() {
		var template = document.getElementById("nav-item-template");
		var content = template.content;

		pageItems.forEach(e => {
			var clone = content.cloneNode(true);
			var a = clone.querySelector("a");
			a.innerText = e;
			template.parentNode.appendChild(clone);
			// a.onclick = TODO:
		});
	}

	buildNavBar();
});