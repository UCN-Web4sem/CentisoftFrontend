$(document).ready(function () {
	var map = (l, f) => {
		var ret = [];
		for (let i = 0; i < l.length; i++) {
			ret.push(f(l[i]));
		}
		return ret
	}

	var pageItems = ["developer", "project", "task", "customer", "client"];

	function renderPageItem(pageItem) {
		return () => {
			console.log(pageItem);
		};
	}

	function buildNavBar() {
		var template = document.querySelector("#nav-item-template");
		var parent = template.parentElement;
		var content = template.content;

		pageItems.forEach(e => {
			var clone = content.cloneNode(true);
			var a = clone.querySelector("a");
			a.innerText = e;
			parent.appendChild(clone);
			a.onclick = renderPageItem(e);
		});
	}

	buildNavBar();
});