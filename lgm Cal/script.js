/* -------------------------
    Calculator ...
---------------------------*/
var result = document.getElementById('result');
var smallResult = document.getElementById('smallResult');
var cal = false;
var val_1 = false;
var val_2 = false;
var oper = '+';
var operPressed = false;
var tot = 0;
var cal_done = false;
var currentStatus = 0;
var o;

function num(val) {
	val = val.toString(); // converting to string so it won't be added together in display (2 + '2' should not do '22')

	if (cal_done)
		// if calculation is done
		cls(); // clear everything

	if (!operPressed) {
		// if no operator is pressed (means it's first value)
		if (!val_1) val_1 = 0;

		val_1 = val_1 + val;

		val_1 = lengthFix(val_1); // limiting to 12

		result.innerHTML = val_1;
		smallResult.innerHTML = val_1;
		// console.log('num to be calc: ' + val_1);
	}
	if (operPressed) {
		// if operator is pressed (means it's 2nd value)
		if (!val_2) val_2 = 0;

		val_2 = val_2 + val;

		val_2 = lengthFix(val_2); // limiting to 12

		result.innerHTML = val_2;
		smallResult.innerHTML = val_1 + oper + val_2;
		// console.log('2nd num to be calc: ' + val_2);
	}
}

// when /,*,+,- is clicked
function calc(val) {
	if (val_1 && val_2) {
		operPressed = true;
		total();
		oper = val;
	}

	if (cal_done) {
		var x = (val_1 = tot);
		cls();
		val_1 = x;
		val_1 = lengthFix(val_1); // limiting to 12
		result.innerHTML = val; // display which operator is selected
		// var a = smallResult.innerHTML.toString();
		smallResult.innerHTML = +x + val;
		oper = val;
		operPressed = true;
	}

	if (!val_1 || operPressed) {
		return false;
	}

	if (val_1 && !val_2) {
		result.innerHTML = val; // display which operator is selected
		var a = smallResult.innerHTML.toString();
		smallResult.innerHTML = a + val;
		oper = val;
		operPressed = true;
	}
}

function total() {
	if (!val_1) return false;

	if (!val_2 && operPressed) {
		tot = magic(val_1, val_1, oper);
		tot = lengthFix(tot);
	}

	if (val_1 && val_2) {
		tot = magic(val_1, val_2, oper);
		tot = lengthFix(tot);
	}

	tot = tot.toString();
	var noDec = tot.indexOf('.') == -1;
	if (!noDec) tot = parseFloat(tot).toFixed(3);

	result.innerHTML = tot;
	// smallResult.innerHTML = tot;
	// console.log('total: ' + tot);
}

function magic(a, b, oper) {
	switch (oper) {
		case '+':
			tot = +a + +b;
			cal_done = true;
			break;
		case '-':
			tot = +a - +b;
			cal_done = true;
			break;
		case '/':
			tot = +a / +b;
			cal_done = true;
			break;
		case '*':
			tot = +a * +b;
			cal_done = true;
			break;
		default:
			return false;
	}
	return tot;
}

// clearing everything...
function cls() {
	smallResult.innerHTML = '';
	result.innerHTML = 0;
	val_1 = false;
	val_2 = false;
	oper = '+';
	tot = 0;
	cal_done = false;
	operPressed = false;
}

function lengthFix(o) {
	o = o.toString();

	if (o != 0 || o != '0') {
		if (o.charAt(0) == 0) o = o.slice(1);
	}

	if (o.toString().length > 12) o = o.substring(0, 12);

	return o;
}

document.onkeyup = function(e) {
	if (e.which == 110 || e.which == 190) num('.');
	if (e.which == 96 || e.which == 48) num('0');
	if (e.which == 97 || e.which == 49) num('1');
	if (e.which == 98 || e.which == 50) num('2');
	if (e.which == 99 || e.which == 51) num('3');
	if (e.which == 100 || e.which == 52) num('4');
	if (e.which == 101 || e.which == 53) num('5');
	if (e.which == 102 || e.which == 54) num('6');
	if (e.which == 103 || e.which == 55) num('7');
	if (e.which == 104 || e.which == 56) num('8');
	if (e.which == 105 || e.which == 57) num('9');

	if (e.which == 111) calc('/');
	if (e.which == 106) calc('*');
	if (e.which == 107) calc('+');
	if (e.which == 109) calc('-');

	if (e.which == 13) total();

	if (e.which == 8 || e.which == 46) cls();

	if (e.which == 27) cls();
};