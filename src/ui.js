function UserInterface() {
	this.ui = {
		enabled: false,	// pointerlock : false
		mobile: this.isMobile(), // 
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
	this.notificationDelay = 5000;

	var self = this;
	document.addEventListener("fullscreenchange", function(e) {
	//ui
	});
	document.addEventListener("touchstart", function(e) {
		self.ui.event = e;
		self.uiGrab(e.target, self.ui.event);
	});
	document.addEventListener("touchmove", function(e) {
		self.ui.event = e;
		self.uiEventMove(self.ui.event);
	});
	document.addEventListener("touchend", function(e) {
		self.ui.event = e;
		self.uiEventStop(self.ui.event);
	});

	document.addEventListener('mousemove', function(e) {
		self.ui.event = e;
		self.uiEventMove(self.ui.event);
	});
	document.addEventListener('mouseup', function(e) {
		self.ui.event = e;
		self.uiDrop(e.target, self.ui.event);
		self.uiEventStop(self.ui.event);
	});
	document.addEventListener('mousedown', function(e) {
		self.ui.event = e;
		if (self.ui.enabled==true) {
			self.uiGrab(e.target, self.ui.event);
		}
		else {
			//e.preventDefault();
		}
	});
};
UserInterface.prototype.enable = function(v) {
	this.ui.enabled = v;
};
UserInterface.prototype.isEnabled = function() {
	return this.ui.enabled;
};
UserInterface.prototype.isMobile = function() {
	var a = (navigator.userAgent||navigator.vendor||window.opera);
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
		return true;
	}
	return false;
}

UserInterface.prototype.uiEventMove = function(e) {
	if (this.ui.enabled==true) {
		if (this.ui.draggable.active == true) {
			if (this.ui.draggable.resize !== true) {
				var x = parseInt((this.ui.mobile == false ? e.pageX : e.touches[0].pageX), 10);
				var y = parseInt((this.ui.mobile == false ? e.pageY : e.touches[0].pageY), 10);

				this.ui.draggable.x2 += (x - this.ui.draggable.x1);
				this.ui.draggable.y2 += (y - this.ui.draggable.y1);

				this.ui.draggable.id.parentElement.style.left = this.ui.draggable.x2 + "px";
				this.ui.draggable.id.parentElement.style.top = this.ui.draggable.y2 + "px";
				//console.log(ui.draggable.x1, x);

				this.ui.draggable.x1 = x;
				this.ui.draggable.y1 = y;
			}
			else {
				var x = parseInt((this.ui.mobile == false ? e.pageX : e.touches[0].pageX) - parseInt(this.ui.draggable.id.parentElement.style.left, 10), 10);
				var y = parseInt((this.ui.mobile == false ? e.pageY : e.touches[0].pageY) - parseInt(this.ui.draggable.id.parentElement.style.top, 10), 10);

				this.ui.draggable.id.parentElement.style.width = x + "px";
				this.ui.draggable.id.parentElement.style.height = y + "px";
			}
		}
	}
}
UserInterface.prototype.uiEventStop = function(e) {
	if (this.ui.enabled==true) {
		this.ui.draggable.active = false;

		this.ui.draggable.x1 = 0;
		this.ui.draggable.y1 = 0;
		this.ui.draggable.x2 = 0;
		this.ui.draggable.y2 = 0;

	}
}
UserInterface.prototype.uiEventStart = function(e) {

}


UserInterface.prototype.uiGrab = function(who, event) {
	//console.log(who.parentElement.parentElement);
	if (this.ui.enabled==false) { return; }
	this.ui.draggable.resize = false;

	if (who.parentElement !== null) {
		this.uiUpdateElement(who.parentElement.parentElement, {pushZOrder: true});
		this.uiUpdateElement(who.parentElement, {pushZOrder: true});
		if (who.className.match(/ui-icon-resize/) !== null) { // typical only to the resize icon for containers
			this.ui.draggable.resize = true;
			this.ui.draggable.active = true;
			this.ui.draggable.id = who;
		}
		//this.ui.draggable.active = true;

		if (parseInt(who.getAttribute('data-uidrag'),10) !== 1) { return; }
		this.ui.draggable.active = true;
		this.ui.draggable.id = who;

		var rx = who.getBoundingClientRect().x || who.getBoundingClientRect().left;
		var ry = who.getBoundingClientRect().y || who.getBoundingClientRect().top;

		this.ui.draggable.x1 = parseInt((this.ui.mobile == false ? event.pageX : event.touches[0].pageX), 10) - parseInt((rx - 2), 10); // -2 because padding
		this.ui.draggable.y1 = parseInt((this.ui.mobile == false ? event.pageY : event.touches[0].pageY), 10) - parseInt((ry - 2), 10);
	}
}
UserInterface.prototype.uiDrop = function(who, event) {
	if (this.ui.enabled==false) { return; }
	if (who.parentElement === null || parseInt(who.getAttribute('data-uidrag'), 10) !== 1) { return; }

	this.ui.draggable.active = false;
}
UserInterface.prototype.uiRemove = function(who, event) {
	if (this.ui.enabled==false) { return; }
	this.ui.draggable.active = false;

	document.body.removeChild(who.parentElement.parentElement); // TODO: broken in internet explorer
}
UserInterface.prototype.uiResize = function(who, event) {
	if (this.ui.enabled==false) { return; }
}
UserInterface.prototype.uiHide = function(who, event) {
	if (this.ui.enabled==false) { return; }
	this.ui.draggable.active = false;
	//who.parentElement.parentElement.
}
UserInterface.prototype.uiUpdateElement = function(elem, opt) {
	if (opt.pushZOrder !== undefined && opt.pushZOrder == true) {
		this.ui.index++;
		elem.style.zIndex = this.ui.index;
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
UserInterface.prototype.uiCreateElement = function(opt) {
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



UserInterface.prototype.uiCreateConsole = function(title) {
	var container = this.uiCreateElement({name: "div", className: "ui-console-container"});
	var containerTitle = this.uiCreateElement({name: "div", className: "ui-console-title noselect", attributes: [{name: "data-uidrag", value: 1}], text: title});
	var containerRemove = this.uiCreateElement({name: "button", className: "ui-console-title-button ui-icon-remove", attributes: [{name: "onclick", value: "UI.uiRemove(this, event)"}]});
	var containerHide = this.uiCreateElement({name: "button", className: "ui-console-title-button ui-icon-hide", attributes: [{name: "onclick", value: "UI.uiHide(this, event)"}]});

	containerTitle.appendChild(this.uiCreateElement({name: "span", className: "empty"}))
	containerTitle.appendChild(containerRemove);
	containerTitle.appendChild(containerHide);
	containerTitle.appendChild(this.uiCreateElement({name: "span", className: "clearfix"}));
	container.appendChild(containerTitle);
	
	var containerBody = this.uiCreateElement({name: "div", className: "ui-console-body"});
	
	var containerTextarea = this.uiCreateElement({name: "div", className: "ui-console-textarea"});
	containerBody.appendChild(containerTextarea);
	container.appendChild(containerBody);
	
	var containerInput = this.uiCreateElement({name: "input", className: "ui-console-input", type: "text", attributes: [{name: "placeholder", value: "> Press return to send"}]});

	var containerFooter = this.uiCreateElement({name: "div", className: "ui-console-footer"});
	containerFooter.appendChild(containerInput);
	container.appendChild(containerFooter);

	//container.appendChild(uiCreateElement({name: "span", className: "clearfix"}));
	var containerResize = this.uiCreateElement({name: "div", className: "ui-icon-resize noselect", attributes: [{name: "onclick", value: "UI.uiResize(this, event)"}]});
	container.appendChild(containerResize);

	document.body.appendChild(container);
	//return container;
	return {parent: container, console: containerTextarea, input: containerInput};
}
UserInterface.prototype.createLevelEditor = function(first_argument) {
	var container = this.uiCreateElement({name: "div", className: "ui-default-container"});
	var containerTitle = this.uiCreateElement({name: "div", className: "ui-default-title noselect", attributes: [{name: "data-uidrag", value: 1}], text: "level editor"});
	var containerRemove = this.uiCreateElement({name: "button", className: "ui-default-title-button ui-icon-remove", attributes: [{name: "onclick", value: "UI.uiRemove(this, event)"}]});
	var containerHide = this.uiCreateElement({name: "button", className: "ui-default-title-button ui-icon-hide", attributes: [{name: "onclick", value: "UI.uiHide(this, event)"}]});

	containerTitle.appendChild(this.uiCreateElement({name: "span", className: "empty"}))
	containerTitle.appendChild(containerRemove);
	containerTitle.appendChild(containerHide);
	containerTitle.appendChild(this.uiCreateElement({name: "span", className: "clearfix"}));
	container.appendChild(containerTitle);
	
	var containerBody = this.uiCreateElement({name: "div", className: "ui-default-body"});
	
	var button = this.uiCreateElement({name: "button", className: "ui-button noselect", text: "Toggle Editor"});
	containerBody.appendChild(button);
	
	var button2 = this.uiCreateElement({name: "button", className: "ui-button noselect", text: "Open Console"});
	containerBody.appendChild(button2);
	container.appendChild(containerBody);

	//container.appendChild(uiCreateElement({name: "span", className: "clearfix"}));
	var containerResize = this.uiCreateElement({name: "div", className: "ui-icon-resize noselect", attributes: [{name: "onclick", value: "UI.uiResize(this, event)"}]});
	container.appendChild(containerResize);

	document.body.appendChild(container);
	//return container;
	return {toggle: button, openConsole: button2};
};

UserInterface.prototype.createNotification = function(msg) {

	// template
	var container = this.uiCreateElement({name: "div", className: "ui-notification-container noselect", attributes: [{name: "z-index", value: this.ui.index}]});
	//var containerTitle = this.uiCreateElement({text: "level editor", name: "div", className: "ui-default-title noselect", attributes: [{name: "data-uidrag", value: 1}]});
	//var containerRemove = this.uiCreateElement({name: "button", className: "ui-default-title-button ui-icon-remove", attributes: [{name: "onclick", value: "UI.uiRemove(this, event)"}]});
	//var containerHide = this.uiCreateElement({name: "button", className: "ui-default-title-button ui-icon-hide", attributes: [{name: "onclick", value: "UI.uiHide(this, event)"}]});

	//containerTitle.appendChild(this.uiCreateElement({name: "span", className: "empty"}))
	//containerTitle.appendChild(containerRemove);
	//containerTitle.appendChild(containerHide);
	//containerTitle.appendChild(this.uiCreateElement({name: "span", className: "clearfix"}));
	//container.appendChild(containerTitle);

	var containerBody = this.uiCreateElement({text: msg, name: "div", className: "ui-notification-body"});
	container.appendChild(containerBody);

	// template
	//var containerResize = this.uiCreateElement({name: "div", className: "ui-icon-resize noselect", attributes: [{name: "onclick", value: "UI.uiResize(this, event)"}]});
	//container.appendChild(containerResize);

	document.body.appendChild(container);
	setTimeout(() => {
		document.body.removeChild(container);
	}, this.notificationDelay);
	//return container;
	return {notification: container};

};

UserInterface.prototype._template = function(msg) {

	// template
	var container = this.uiCreateElement({name: "div", className: "ui-default-container noselect"});
	var containerTitle = this.uiCreateElement({text: "level editor", name: "div", className: "ui-default-title noselect", attributes: [{name: "data-uidrag", value: 1}]});
	var containerRemove = this.uiCreateElement({name: "button", className: "ui-default-title-button ui-icon-remove", attributes: [{name: "onclick", value: "UI.uiRemove(this, event)"}]});
	var containerHide = this.uiCreateElement({name: "button", className: "ui-default-title-button ui-icon-hide", attributes: [{name: "onclick", value: "UI.uiHide(this, event)"}]});

	containerTitle.appendChild(this.uiCreateElement({name: "span", className: "empty"}))
	containerTitle.appendChild(containerRemove);
	containerTitle.appendChild(containerHide);
	containerTitle.appendChild(this.uiCreateElement({name: "span", className: "clearfix"}));
	container.appendChild(containerTitle);

	var containerBody = this.uiCreateElement({name: "div", className: "ui-default-body"});
	
	// custom
	var button = this.uiCreateElement({name: "button", className: "ui-button noselect", text: "Toggle Editor"});
	containerBody.appendChild(button);
	
	var button2 = this.uiCreateElement({name: "button", className: "ui-button noselect", text: "Open Console"});
	containerBody.appendChild(button2);
	container.appendChild(containerBody);

	// template
	var containerResize = this.uiCreateElement({name: "div", className: "ui-icon-resize noselect", attributes: [{name: "onclick", value: "UI.uiResize(this, event)"}]});
	container.appendChild(containerResize);

	document.body.appendChild(container);
	//return container;
	return {toggle: button, openConsole: button2};
};

var UI = null;