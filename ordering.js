/*

This algorithm is used to generate the order in which items of an experiment will appear to a subject. The setup we assume here is the following:
There are phenomenons (9) — each representing an experiment — within which you find several conditions (4) for each iteration of the experiment (5). Within one "block" of items (9*4=36), we will present all conditions for all phenomenons from a single iteration. Between two items of the same phenomenon (varying only the iteration and the condition), we want to insert a minimum number of fillers (4) — ie. of items from other phenomenons — even across "blocks".
In order to obtain such a setup in an unbiased fashion, we proceed separately for each dimension:
 - the order of "blocks", ie. iterations, is simply obtained by shuffling the array representing all iterations with the Fisher–Yates shuffle algorithm. (http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 - the order of the phenomenons has to be determined directly across the whole experiment because we wish to have a minimum number of "fillers" between two items of the same phenomenon. We create an array of all possible elements (all phenomenons times all conditions) for a block and iteratively randomly pick one out of all possible choices (meaning that before every pick, we exclude all the items that come from the same phenomenon as the 4 (minimum number of fillers required) previous items). Such procedure can (with a very small probability) reach a "dead-end" where all possible remaining items for the current block have to be excluded because of the minimum number of fillers required. In such a case, we discard the generated block and start over. The generation of the full list (iterations * phenomenons * conditions) will take less than a millisecond for up to 500 items on most computers.
 - the order of the conditions is determined for each phenomenon in each iteration in the same fashion as the order of the iterations: a Fisher–Yates shuffle of an array representing all conditions.

*/

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