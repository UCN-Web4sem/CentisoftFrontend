$(document).ready(function () {
	var apiURL = "http://dm.sof60.dk:84/api/";

	var map = (l, f) => {
		var ret = [];
		for (let i = 0; i < l.length; i++) {
			ret.push(f(l[i]));
		}
		return ret
	}

	var pageItems = ["developer", "project", "task", "customer", "client"];

	function renderPageItem(pageItem) {
		function getAllDevelopers(cb) {
			$.get(apiURL+pageItem, (data) => {
				cb(null, data);
			}).fail((err) => {
				cb(err, null);
			});
		}

		function renderDataView(datapoints) {
			if (datapoints.length < 1) return;

			var headerTemplate = document.getElementById("table-header-template");
			var headerParent = headerTemplate.parentElement;
			var headerContent = headerTemplate.content;

			var keys = Object.keys(datapoints[0]);
			keys.forEach(key => {
				var clone = headerContent.cloneNode(true);
				clone.querySelector("th").innerText = key;
				headerParent.appendChild(clone);
			});


			var rowTemplate = document.getElementById("table-row-template");
			var rowParent = rowTemplate.parentElement;
			var rowContent = rowTemplate.content;

			
		}

		return () => {
			// Clear the templates
			document.getElementById("table-header-template").parentElement.innerHTML = document.getElementById("table-header-template").outerHTML;
			document.getElementById("table-row-template").parentElement.innerHTML = document.getElementById("table-row-template").outerHTML;

			console.log(pageItem);
			switch (pageItem) {
				case "developer":
					getAllDevelopers((err, data) => {
						if (err != null) console.log(err);
						renderDataView(data);
						
					})
					break;
			
				default:
					break;
			}

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