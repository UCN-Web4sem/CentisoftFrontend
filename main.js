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
			$.get(apiURL + pageItem, (data) => {
				cb(null, data);
			}).fail((err) => {
				cb(err, null);
			});
		}

		function renderDataView(datapoints) {
			if (datapoints.length < 1) return;

			const headerTemplate = document.getElementById("table-header-template");
			const headerParent = headerTemplate.parentElement;
			const headerContent = headerTemplate.content;

			const keys = Object.keys(datapoints[0]);
			keys.forEach(key => {
				const clone = headerContent.cloneNode(true);
				clone.querySelector("th").innerText = key;
				headerParent.appendChild(clone);
			});
			const thClone = headerContent.cloneNode(true);
			thClone.querySelector("th").innerText = "Edit";
			headerParent.appendChild(thClone);


			const rowTemplate = document.getElementById("table-row-template");
			const rowParent = rowTemplate.parentElement;
			const rowContent = rowTemplate.content;
			datapoints.forEach(dp => {
				const clone = rowContent.cloneNode(true);
				const tr = clone.querySelector("tr");
				for (const key in dp) {
					if (dp.hasOwnProperty(key)) {
						const value = dp[key];
						const td = document.createElement("td");
						td.innerText = value;
						// works like appendChild but makes sure our edit button is the last td in the tr
						tr.insertBefore(td, clone.querySelector("button").parentElement);
					}
				}
				const button = clone.querySelector("button");
				button.onclick = () => {
					// Clear the template
					document.getElementById("edit-modal-template").parentElement.innerHTML = document.getElementById("edit-modal-template").outerHTML;
					const modalTemplate = document.getElementById("edit-modal-template");
					const modalContent = modalTemplate.content;
					const modalParent = modalTemplate.parentElement;
					for (const prop in dp) {
						if (dp.hasOwnProperty(prop)) {
							const value = dp[prop];
							const clone = modalContent.cloneNode(true);
							clone.querySelector("p").innerText = prop;
							const inp = clone.querySelector("input");
							inp.value = value;
							inp.setAttribute("placeholder", value);
							inp.setAttribute("id", "input-" + prop);
							modalParent.appendChild(clone);
						}
					}
				};

				rowParent.appendChild(clone);
			});

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
						document.getElementById("btn-save").onclick = () => {
							const id = document.getElementById("input-Id").value;
							const name = document.getElementById("input-Name").value;
							const email = document.getElementById("input-Email").value;
							// TODO: document.getElementById("input-Tasks");
							const developer = {
								"Id":parseInt(id, 10),
								"Name":name,
								"Email":email,
							};
							$.post(apiURL+"developer", developer).fail(() => {
								alert("SOMETHING WENT WHOLE WRONG POST");
							}).done(() => {
								// Because the API is...... slow
								setTimeout(renderPageItem(pageItem), 500); 
							});
						};

					});
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