
var button = document.querySelector('.calculate_button');

function fillBeginWithZero(str, neededLength) {
	let tmp_str = '';
	
	for (let i = 0; i < neededLength - str.length; i++) {
		tmp_str += '0';
	}

	return (tmp_str + str);
}


function calculateTerm(index, term) {
	if (term == 0) {
		return `\\bar{x}_${index}`;
	} else {
		return `x_${index}`;
	}
}

function createTable(parent, cols, rows, func) {
	let table = document.createElement('table');

	let minterm_arr = [];

	let tr = document.createElement('tr');
	for (let i = 0; i < cols - 1; i++) {
		let td = document.createElement('td');
		td.innerHTML = `\\[x_${i + 1}\\]`;
		tr.appendChild(td);
	}

	let td = document.createElement('td');
	td.innerHTML = `\\[f(\\tilde{x}^{_${cols - 1}})\\]`
	tr.appendChild(td);
	table.appendChild(tr);

	for (let i = 0; i < rows - 1; i++) {
		let tr = document.createElement('tr');

		let str_binary = fillBeginWithZero(i.toString(2), cols - 1);

		for (let j = 0; j < cols - 1; j++) {
			let td = document.createElement('td');
			td.innerHTML = str_binary[j];
			tr.appendChild(td);
		}

		let td = document.createElement('td');
		td.innerHTML = func[i];
		tr.appendChild(td);

		if (func[i] == 1) {
			let div = document.createElement('div');
			div.classList.add('minterm');

			div.innerHTML = '\\[';
			for (let j = 0; j < cols - 1; j++) {
				div.innerHTML += calculateTerm(j + 1, parseInt(str_binary[j]));
			}

			minterm_arr[minterm_arr.length] = div.innerHTML.substring(2, div.innerHTML.length);

			div.innerHTML += '\\]';
			
			tr.appendChild(div);
		}

		table.appendChild(tr);
	}

	parent.appendChild(table);

	return minterm_arr;
}


function buildPDNF(parent, minterm_arr, varCount) {
	let div = document.createElement('div');

	div.innerHTML += `\\[f(\\tilde{x}^{_${varCount}}) = `;

	for (let i = 0; i < minterm_arr.length; i++) {
		div.innerHTML += `(${minterm_arr[i]})`;
	}
	div.innerHTML += '\\]';

	parent.appendChild(div);
}


button.addEventListener('click', function() {
	let n = parseInt((document.querySelector('.input_n')).value);
	let func = document.querySelector('.func').value;


	let PDNF = document.querySelector('.f_table');
	PDNF.innerHTML = '';
	let minterm_arr = createTable(PDNF, n + 1, Math.pow(2, n) + 1, func);

	buildPDNF(PDNF, minterm_arr, n);

	let js = document.createElement("script");
	js.type = 'text/javascript';
	js.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML';
	document.body.appendChild(js);
})

// document.body.innerHTML = `123`
// document.body.innerHTML += `qwe`