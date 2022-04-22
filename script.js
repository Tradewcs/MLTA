
var button = document.querySelector('.calculate_button');

function createTable(parent, cols, rows) {
	let table = document.createElement('table');

	for (let i = 0; i < rows; i++) {
		let tr = document.createElement('tr');
		
		for (let j = 0; j < cols; j++) {
			let td = document.createElement('td');
			tr.appendChild(td);
		}

		table.appendChild(tr);
	}

	parent.appendChild(table);
}


button.addEventListener('click', function() {
	let n = (document.querySelector('.input_n')).value;
	let func = document.querySelector('.func').value;
	
	input_f = Array.from(func);

	input_f.length = Math.pow(2, n);

	let elem = document.querySelector('.f_table');
	createTable(elem, 10, 4);


	let js = document.createElement("script");
	js.type = 'text/javascript';
	js.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML';
	document.body.appendChild(js);
})