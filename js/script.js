function init() {
	var list = document.querySelectorAll('#navigation li')
	for (var x = 0; x < list.length; x++) {
		list[x].addEventListener('click', showHideContent, false);
	}
}

function showHideContent() {
	
	var div = document.getElementById(this.firstChild.nodeValue.toLowerCase().replace(/\s/g, '_'));
	
	if (!div.getAttribute('class').match(/selected/)) {
		
		var previousSelections = document.querySelectorAll('.content.selected, #navigation li.selected');

		for (var x = 0; x < previousSelections.length; x++) {
			previousSelections[x].setAttribute('class', previousSelections[x].getAttribute('class').replace(/\s?selected/, ''));
			
			if (previousSelections[x].getAttribute('class').length == 0) {
				previousSelections[x].removeAttribute('class');
			}
		}
	
		div.setAttribute('class', div.getAttribute('class') + ' selected');
		this.setAttribute('class', 'selected');
		
		var marker = document.getElementById('marker');
		console.log(this.offsetLeft + (this.offsetWidth /2));
		console.log(this.offsetLeft + (this.offsetWidth /2) - (marker.offsetWidth / 2));
				
		//var newX = this.clientOffset
		marker.setAttribute('style', 'left: ' + (this.offsetLeft + (this.offsetWidth /2) - (marker.offsetWidth / 2) - marker.offsetParent.offsetLeft) + 'px');
	}
}