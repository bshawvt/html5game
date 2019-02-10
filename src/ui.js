var ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl arcu, egestas quis dapibus ac, mollis id augue. Vestibulum pellentesque vehicula turpis non consequat. Proin vitae sapien vulputate, tempor elit in, vestibulum metus. Nunc vel tellus nibh. Curabitur eu lacus tristique, tincidunt sem eu, consectetur leo. Donec ac laoreet tortor, sed blandit turpis. In sollicitudin convallis aliquam. Nunc sed nisi eu est sagittis convallis dictum sed nibh. Donec malesuada imperdiet erat, in bibendum odio pellentesque condimentum.";

(() => {
	var item = null;
	item = uiCreateConsole("dummy container");
	item.console.appendChild(uiCreateElement({name: "div", text: ipsum}));
	uiUpdateElement(item.parent, {x: 100, y: 100, w: 400, h: 100});
	item = uiCreateConsole("console" + Math.random() * 10);
	uiUpdateElement(item.parent, {x: 150, y: 150, w: 250, h: 150});
	item.input.onkeydown = function(e) { 
		if (e.keyCode == 13) {
			item.console.appendChild(uiCreateElement({name: "span", text: this.value}));// += this.value + 
			item.console.appendChild(uiCreateElement({name: "br"}));
			item.console.scrollTop = item.console.scrollHeight;
			this.value = "";
			console.log(item);
		}
	};
	console.log(item);
})();


function isMobile() {
	var a = (navigator.userAgent||navigator.vendor||window.opera);
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
		return true;
	}
	return false;
}

var ui = {
	enabled: true,	// pointerlock : false
	mobile: isMobile(), // 
	index: 0,
	draggable: {
		id: null,
		active: 0,

		x1: 0,
		y1: 0,

		x2: 0,
		y2: 0
	},
	event: null
}

document.addEventListener("fullscreenchange", function(e) {
	//ui
});
document.addEventListener("touchstart", function(e) {
	ui.event = e;
	uiGrab(e.target, ui.event);
});
document.addEventListener("touchmove", function(e) {
	ui.event = e;
	uiEventMove(ui.event);
});
document.addEventListener("touchend", function(e) {
	ui.event = e;
	uiEventStop(ui.event);
});

document.addEventListener('mousemove', function(e) {
	ui.event = e;
	uiEventMove(ui.event);
});
document.addEventListener('mouseup', function(e) {
	ui.event = e;
	uiDrop(e.target, ui.event);
	uiEventStop(ui.event);
});
document.addEventListener('mousedown', function(e) {
	ui.event = e;
	if (ui.enabled==true) {
		uiGrab(e.target, ui.event);
	}
});

function uiEventMove(e) {
	if (ui.enabled==true) {
		if (ui.draggable.active == true) {
			if (ui.draggable.resize !== true) {
				var x = parseInt((ui.mobile == false ? e.pageX : e.touches[0].pageX), 10);
				var y = parseInt((ui.mobile == false ? e.pageY : e.touches[0].pageY), 10);

				ui.draggable.x2 += (x - ui.draggable.x1);
				ui.draggable.y2 += (y - ui.draggable.y1);

				ui.draggable.id.parentElement.style.left = ui.draggable.x2 + "px";
				ui.draggable.id.parentElement.style.top = ui.draggable.y2 + "px";
				//console.log(ui.draggable.x1, x);

				ui.draggable.x1 = x;
				ui.draggable.y1 = y;
			}
			else {
				var x = parseInt((ui.mobile == false ? e.pageX : e.touches[0].pageX) - parseInt(ui.draggable.id.parentElement.style.left, 10), 10);
				var y = parseInt((ui.mobile == false ? e.pageY : e.touches[0].pageY) - parseInt(ui.draggable.id.parentElement.style.top, 10), 10);

				ui.draggable.id.parentElement.style.width = x + "px";
				ui.draggable.id.parentElement.style.height = y + "px";
			}
		}
	}
}
function uiEventStop(e) {
	if (ui.enabled==true) {
		ui.draggable.active = false;

		ui.draggable.x1 = 0;
		ui.draggable.y1 = 0;
		ui.draggable.x2 = 0;
		ui.draggable.y2 = 0;

	}
}
function uiEventStart(e) {

}


function uiGrab(who, event) {
	if (ui.enabled==false) { return; }
	ui.draggable.resize = false;
	
	console.dir(who);
	if (who.parentElement !== null) {
		uiUpdateElement(who.parentElement, {pushZOrder: true});
		if (who.className.match(/ui-icon-resize/) !== null) { // typical only to the resize icon for containers
			ui.draggable.resize = true;
			ui.draggable.active = true;
			ui.draggable.id = who;
		}
		

		if (parseInt(who.getAttribute('data-uidrag'),10) !== 1) { return; }
		ui.draggable.active = true;
		ui.draggable.id = who;

		var rx = who.getBoundingClientRect().x || who.getBoundingClientRect().left;
		var ry = who.getBoundingClientRect().y || who.getBoundingClientRect().top;

		ui.draggable.x1 = parseInt((ui.mobile == false ? event.pageX : event.touches[0].pageX), 10) - parseInt((rx - 2), 10); // -2 because padding
		ui.draggable.y1 = parseInt((ui.mobile == false ? event.pageY : event.touches[0].pageY), 10) - parseInt((ry - 2), 10);
	}
}
function uiDrop(who, event) {
	if (ui.enabled==false) { return; }
	if (who.parentElement === null || parseInt(who.getAttribute('data-uidrag'), 10) !== 1) { return; }

	ui.draggable.active = false;
}
function uiRemove(who, event) {
	if (ui.enabled==false) { return; }
	ui.draggable.active = false;

	document.body.removeChild(who.parentElement.parentElement); // TODO: broken in internet explorer
}
function uiResize(who, event) {
	if (ui.enabled==false) { return; }
}
function uiHide(who, event) {
	if (ui.enabled==false) { return; }
	ui.draggable.active = false;
	//who.parentElement.parentElement.
}
function uiCreateConsole(title) {
	var container = uiCreateElement({name: "div", className: "ui-console-container"});
	var containerTitle = uiCreateElement({name: "div", className: "ui-console-title noselect", attributes: [{name: "data-uidrag", value: 1}], text: title});
	var containerRemove = uiCreateElement({name: "button", className: "ui-console-title-button ui-icon-remove", attributes: [{name: "onclick", value: "uiRemove(this, event)"}]});
	var containerHide = uiCreateElement({name: "button", className: "ui-console-title-button ui-icon-hide", attributes: [{name: "onclick", value: "uiHide(this, event)"}]});

	containerTitle.appendChild(uiCreateElement({name: "span", className: "empty"}))
	containerTitle.appendChild(containerRemove);
	containerTitle.appendChild(containerHide);
	containerTitle.appendChild(uiCreateElement({name: "span", className: "clearfix"}));
	container.appendChild(containerTitle);
	
	var containerBody = uiCreateElement({name: "div", className: "ui-console-body"});
	
	var containerTextarea = uiCreateElement({name: "div", className: "ui-console-textarea"});
	containerBody.appendChild(containerTextarea);
	container.appendChild(containerBody);
	
	var containerInput = uiCreateElement({name: "input", className: "ui-console-input", type: "text", attributes: [{name: "placeholder", value: "> Press return to send"}]});

	var containerFooter = uiCreateElement({name: "div", className: "ui-console-footer"});
	containerFooter.appendChild(containerInput);
	container.appendChild(containerFooter);

	//container.appendChild(uiCreateElement({name: "span", className: "clearfix"}));
	var containerResize = uiCreateElement({name: "div", className: "ui-icon-resize noselect", attributes: [{name: "onclick", value: "uiResize(this, event)"}]});
	container.appendChild(containerResize);

	document.body.appendChild(container);
	//return container;
	return {parent: container, console: containerTextarea, input: containerInput};
}
function uiUpdateElement(elem, opt) {
	if (opt.pushZOrder !== undefined && opt.pushZOrder == true) {
		ui.index++;
		elem.style.zIndex = ui.index;
	}
	if (opt.x !== undefined) {
		elem.style.left = opt.x + "px";
	}
	if (opt.y !== undefined) {
		elem.style.top = opt.y + "px";
	}
	if (opt.w !== undefined) {
		elem.style.width = opt.w + "px";
	}
	if (opt.h !== undefined) {
		elem.style.height = opt.h + "px";
	}
}
function uiCreateElement(opt) {
	if (opt.name == undefined)  return;
	
	var node = document.createElement(opt.name)
	node.className = (opt.className !== undefined ? opt.className : "");

	if (opt.attributes !== undefined) { 
		for(var i = 0; i < opt.attributes.length; i++) {
			node.setAttribute(opt.attributes[i].name, opt.attributes[i].value);
		}
	}

	var textNode = null;
	if (opt.text !== undefined) {
		textNode = document.createTextNode(opt.text);
		node.appendChild(textNode);
	}

	if (opt.type !== undefined) {
		node.type = opt.type;
	}
	return node;
}