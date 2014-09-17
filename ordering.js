// 	5 blocks (num)
//		in each block, 9 phenomenons appear 4 times (conditions)
//		two CONDITIONS of the same PHENOMENON must be separated by at least 4 instances of different phenomenons

//qty
var blocks = 5;
var phenomenons = 9;
var conditions = 4;

//setup
var separated = (process.argv[2])?process.argv[2]:4;

//debug
var count = 0;

//generation
var final_array = new Array();
var block_array = shuffle(oneToNArray(blocks));
var phenomenon_array = genPhenomenonArray(blocks, phenomenons, conditions, separated);
for (var i = 0; i < blocks; i++) {
	var condition_matrix = genConditionMatrix(phenomenons, conditions);
	for (var j = 0; j < phenomenons*conditions; j++) {
		final_array.push(new Array(block_array[i], phenomenon_array[j], condition_matrix[phenomenon_array[j]-1][0]));
	};
};
console.log(final_array);

// count = 0;
// var tests = 1;
// var time1 = Date.now();
// for (var i = 0; i < tests; i++) {
// 	genPhenomenonArray(blocks, phenomenons, conditions, separated);
// };
// console.log(tests+" tests in "+((Date.now()-time1)/1000)+"s with an average block generation faliure of "+count/tests+" per experiment generation");


function genConditionMatrix (phenomenons, conditions) {
	var matrix = new Array();
	for (var i = 0; i < phenomenons; i++) {
		matrix[i] = shuffle(oneToNArray(conditions));
	};
	return matrix;
}

function genPhenomenonArray (blocks, phenomenons, conditions, separated){
	var array = new Array();
	for (var i = 0; i < blocks; i++) {
		var block_level_array, block_level_validation = false;
		while(!block_level_validation){
			block_level_validation = true;
			block_level_array = new Array();
			var remaining_values = oneToNArrayTimesM(phenomenons, conditions);
			for (var j = 0; j < phenomenons*conditions; j++) {

				var possible_values = remaining_values.concat(); //cloning
				var forbidden_values = new Array();
				var temp_concat_array = array.concat(block_level_array);
				for (var k = 0, l = temp_concat_array.length, m = Math.min(separated, l); k<m; k++){
					possible_values = removeAllXFromArray(possible_values, temp_concat_array[l-1-k]);
					forbidden_values.push(temp_concat_array[l-1-k]);
				};

				if(possible_values.length === 0){
					count++;
					block_level_validation = false;
					break;
				}

				var pick = Math.floor(Math.random()*possible_values.length);
				block_level_array.push(possible_values[pick]);
				remaining_values.splice(remaining_values.indexOf(possible_values[pick]), 1);
			};
		}
		array = array.concat(block_level_array);
	};
	return array;
}

function removeAllXFromArray(array, x){
	var idx = array.indexOf(x);
	while (idx != -1) {
		array.splice(idx, 1);
		idx = array.indexOf(x);
	}
	return array;
}

function oneToNArrayTimesM (n, m) {
	var array = new Array();
	for (var i = 0; i < m; i++) {
		array = array.concat(oneToNArray(n));
	};
	return array;
}

function oneToNArray (n) {
	var array = new Array();
	for (var i = 0; i < n; i++) {
		array[i] = i+1;
	};
	return array;
}

function shuffle(array) { // unbiased Fisher-Yates shuffle http://stackoverflow.com/a/2450976/2306481
	var currentIndex = array.length, temporaryValue, randomIndex ;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}