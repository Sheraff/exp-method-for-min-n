function setup_new_page () {
	var all_items_for_a_run = document.querySelectorAll('[data-run]');

	for (var i = all_items_for_a_run.length - 1; i >= 0; i--) {
		var run_type = all_items_for_a_run[i].getAttribute('data-run');

		switch (run_type) {

			case "progress":
				var progress = all_items_for_a_run[i];
				var step = progress.getAttribute('data-progress');
				var steps = progress.getAttribute('data-steps');
				var progress_bar = progress.getElementsByTagName('div')[0];
				var label = progress.getElementsByTagName('span')[0];
				var advancement = 100*step/steps;
				progress_bar.style.width = advancement+'%';
				if(advancement>50){progress_bar.className = 'left';};
				label.innerHTML = step + '/' + steps;
				break;

			case "scale":
				var scaleDiv = all_items_for_a_run[i];
				var value = scaleDiv.getAttribute('data-start');
				var scaleDiv = scaleDiv.getElementsByTagName('div')[0];
				var scaleGauge = scaleDiv.getElementsByTagName('span')[0];
				scaleGauge.style.width = value+'%';
				var left = scaleDiv.getBoundingClientRect().left + 0;
				var size = - left + (scaleDiv.getBoundingClientRect().right - 1);
				scaleDiv.addEventListener('mousemove', function(event) {
					value = (event.pageX-left)/size*100;
					value = value>100?100:value;
					value = value<0?0:value;
					scaleGauge.style.width = value+'%';
				}, false);
				scaleDiv.addEventListener('mouseleave', function (event) {
					if(event.pageX-left<0) value = 0;
					if(event.pageX-left>size) value = 100;
					scaleGauge.style.width = value+'%';
				}, false);
				break;

			case "textbox":
				var input = all_items_for_a_run[i].getElementsByTagName('input')[0];
				input.addEventListener('keypress', function(event){
					var code = (event.keyCode ? event.keyCode : event.which);
					if(!(code >= 48 && code <= 57))
						event.preventDefault();
				}, false);
				input.addEventListener('input', function(){
					this.value = this.value.match(/\d*\.?\d+/);
				}, false);
				break;

			default:
				break;
		}
	};


}