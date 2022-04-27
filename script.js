
var button = document.querySelector('.calculate_button');
var links = ['https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML', 'cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'];
let count = 0;

let delete_script = document.querySelector('.delete_script');
let append_script = document.querySelector('.append_script');


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
	
	if (minterm_arr.length) {

		div.innerHTML += minterm_arr[0];
		for (let i = 1; i < minterm_arr.length; i++) {
			div.innerHTML += '\\vee ' + minterm_arr[i];
		}
		div.innerHTML += '\\]';

	} else {
		div.innerHTML += '0\\]'
	}
	
	parent.appendChild(div);
}





button.addEventListener('click', function() {
	let n = parseInt((document.querySelector('.input_n')).value);
	let func = document.querySelector('.func').value;


	let PDNF = document.querySelector('.f_table');
	PDNF.innerHTML = '';
	let minterm_arr = createTable(PDNF, n + 1, Math.pow(2, n) + 1, func);

	buildPDNF(PDNF, minterm_arr, n);

	// let js = document.getElementById('LaTeXscript');
	// reload_js(js);
	// console.log(js);
	// js.src = '';
	// js.remove();
	
	// js = document.createElement('script');
	// js.classList.add('LaTeXscript');
	// js.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML';
	
	// document.body.append(js);
	
	console.log(document.body);
	
	let script = document.createElement('script');

	// let script = document.getElementById('LaTeXscript');
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML';
	
	script.classList.add('LaTeXscript');
	document.body.appendChild(script);
})

delete_script.addEventListener('click', function() {
	let script = document.querySelector('.LaTeXscript');

	// script.src = 'foo.js';
	script.remove();

	console.log(document.body);
})

append_script.addEventListener('click', function add_scr() {
	let script = document.createElement('script');

	// let script = document.getElementById('LaTeXscript');
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML';
	
	script.classList.add('LaTeXscript');
	document.body.appendChild(script);

	console.log(document.body);
})

// function reload_js(script) {
// 	let script_cpy = script;
// 	console.log(document.body);
// 	script_cpy.src = links[count++];
// 	script.remove();

// 	document.body.appendChild(script_cpy);
// }




// document.body.innerHTML = `123`
// document.body.innerHTML += `qwe`

/*
https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML
*/