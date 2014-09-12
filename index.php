<!DOCTYPE html>
<meta charset="utf-8">
<title>Experiment</title>
<link rel="stylesheet" href="s.css">

<!-- <header>
	<p>This sentence gives direction.</p>
</header> -->
<main>
	<!-- <p>Which employee did Noah learn whether Lily dismissed?</p> -->
	<div id="input" class="yes-no"> <!-- yes / no -->
		<table><tr>
			<td>
				<button value="No"><span>No</span></button>
			</td><td>
				<button value="Yes"><span>Yes</span></button>
			</td>
		</tr></table>
	</div>
	<div id="input" class="points"> <!-- points -->
		<table><tr>
			<td>
				<span>Minimum</span>
			</td><td>
				<button value="1"><span></span></button>
			</td><td>
				<button value="2"><span></span></button>
			</td><td>
				<button value="3"><span></span></button>
			</td><td>
				<button value="4"><span></span></button>
			</td><td>
				<button value="5"><span></span></button>
			</td><td>
				<button value="6"><span></span></button>
			</td><td>
				<button value="7"><span></span></button>
			</td><td>
				<span>Maximum</span>
			</td>
		</tr></table>
	</div>
	<div id="input" class="points labeled"> <!-- points -->
		<table><tr>
			<td>
				<span>Minimum</span>
			</td><td>
				<button id="b1" value="1"><span></span><label for="b1">1</label></button>
			</td><td>
				<button id="b2" value="2"><span></span><label for="b2">2</label></button>
			</td><td>
				<button id="b3" value="3"><span></span><label for="b3">3</label></button>
			</td><td>
				<button id="b4" value="4"><span></span><label for="b4">4</label></button>
			</td><td>
				<button id="b5" value="5"><span></span><label for="b5">5</label></button>
			</td><td>
				<button id="b6" value="6"><span></span><label for="b6">6</label></button>
			</td><td>
				<span>Maximum</span>
			</td>
		</tr></table>
	</div>
	<div id="input" class="textbox"> <!-- free number input -->
		<table><tr>
			<td>
				<input type="text" autofocus>
			</td>
		</tr></table>
		<script type="text/javascript">
			var input = document.getElementsByClassName('textbox')[0].getElementsByTagName('input')[0];
			input.addEventListener('keypress', function(event){
				var code = (event.keyCode ? event.keyCode : event.which);
				if(!(code >= 48 && code <= 57))
					event.preventDefault();
			}, false);
			input.addEventListener('input', function(){
				this.value = this.value.match(/\d*\.?\d+/);
			}, false);
		</script>
	</div>
	<div id="input" class="scale"> <!-- scale -->
		<table><tr>
			<td>
				<input type="text" autofocus>
			</td>
		</tr></table>
	</div>
</main>
<footer>
	<div id="progress"><div class="" style="width: 20%;"><span>2/10</span></div></div>
</footer>

<script src="s.js"></script>

<!-- yes no -->