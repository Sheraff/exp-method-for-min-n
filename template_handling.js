function Template(templates, elements, data, callback) {
	var fileReaderCount = 0,
	fillTemplatePointer = -1,
	templates, elements, experiment;

	readFileIntoVariable(data, "experiment");
	readFileIntoVariable(elements, "elements");
	readFileIntoVariable(templates, "templates");

	function doneReading() {
		if (fileReaderCount++ == 2) {
			experiment = window["experiment"];
			elements = window["elements"];
			templates = window["templates"];
			callback();
		}
	};

	//reader
	function readFileIntoVariable(file, variable){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				window[variable] = JSON.parse((xmlhttp.responseText).replace(/[\r\n\t]+/g,""));
				doneReading();
			}
		};
		xmlhttp.open("GET",file,true);
		xmlhttp.send();
	}

	//utils
	function stringReplaceAll(string, find, replace){
		return string.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
	}

	//logic
	this.fillTemplate = function(i) {
		fillTemplatePointer = i;
		if (i >= experiment.length) return false;
		return fillTemplate((experiment[i].template?templates[experiment[i].template]:templates.default), elements, experiment[i]);
	}
	this.fillNextTemplate = function() {
		return this.fillTemplate(++fillTemplatePointer);
	}

	function fillTemplate(template, elements, data) {
		if (!template) return "";
		var completed = template,
		sections = template.match(/\{.+?\}/g);

		if (sections){
			for (var i = 0, l = sections.length; i < l; i++) {
				var section_name = sections[i].substring(1, sections[i].length - 1);
				if(section_name==="progress") completed = stringReplaceAll(completed, sections[i], fillTemplatePointer);
				else if(section_name==="nb_of_steps") completed = stringReplaceAll(completed, sections[i], experiment.length);
				else completed = stringReplaceAll(completed, sections[i], fillTemplate((data[section_name] ? data[section_name] : elements[section_name]), elements, data));
			};
		}
		return completed;
	}
}

function next_page(){
	document.body.innerHTML = myTemplate.fillNextTemplate();
	setup_new_page();
}

//debug
var myTemplate = new Template('./templates.json', './elements.json', './experiment.json', loaded);

function loaded() {
	window.setTimeout(function () {
		next_page();
		console.log("coucou");
		window.onclick = function () {
			next_page();
		}
	}, 1000);
}