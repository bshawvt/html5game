function Input(i) {

	var self = this;
	this.buttonStates = [];
	this.mouseStates = [];

	this.mousePosition = {x: 0, y: 0};

	this.pointerLock = false;

	window.addEventListener('mousedown', function(e) {
		// todo: mobile should go into fullscreen on touch
		self.mouseStates[e.button] = true;
	});
	window.addEventListener('mouseup', function(e) {
		self.mouseStates[e.button] = false;
	});
	window.addEventListener('mousemove', function(e) {
		if (self.pointerLock) {
			// todo: mouse positions in pointerlock rely on screenX/Y
			return;
		}
		//console.log(e);
		self.mousePosition.x = e.pageX;
		self.mousePosition.y = e.pageY;
	});

	window.addEventListener('keydown', function(e) {
		self.buttonStates[e.keyCode] = true;
	});
	window.addEventListener('keyup', function(e) {
		self.buttonStates[e.keyCode] = false;
	});


};
Input.prototype.getMousePosition = function() {
	return this.mousePosition;
};
Input.prototype.getMouseState = function(button) {
	return this.mouseStates[button] || false;
};
Input.prototype.getButtonState = function(button) {
	return this.buttonStates[button] || false;
};
var Controller = null;

// copy of input.js for reworking 
// todo: this is an ancient library that is bad

/*var dKeyEvent;
var g_oddwarg = 5;
Input = function(canvas) {

	this.mobileStatus = (function() {
	  var check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
	})();
	this.mobileInput = document.getElementById("hiddeninput1");
	this.usingiOS = (/ipad|iphone|ipod/.test(navigator.platform.toLowerCase()));
	this.iPhoneInput = "";

	this.canvas = canvas;
	this.userTaps = [];
	this.tapQueue = [];

	this.p_keyStates = [];
	this.p_mouseStates = [];
	this.p_mouseX = 0;
	this.p_mouseY = 0;
	this.p_mouseLastX = 0;
	this.p_mouseLastY = 0;
	this.p_cursorX = 0;
	this.p_cursorY = 0;

	this.p_myMouseX = 0;
	this.p_myMouseY = 0;

	this.wheelDelta = {x: 2, y: 2, z: 2};

	this.inputKeys = ""; // this is a hack to get keyboard input

	this.p_isPointerLocked = false; // only report events when the canvas is active 
	this.canPointerLock = true;
	this.state = 0 ;// prevents mouse button event from firing when pointer lock is activated
	var self = this;
	
	self.getCanvas().onclick = function(e) { 
		if (self.mobileStatus == true)  {
			// fullscreen snippet taken from: https://developers.google.com/web/fundamentals/native-hardware/fullscreen/
			var doc = window.document;
			var docEl = doc.documentElement;

			var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
			var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

			if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
				requestFullScreen.call(docEl);
			}
			return;
		}
		if (self.isPointerLocked()==false) {
			if (self.getCanvas().requestPointerLock === undefined) {
				self.getCanvas().requestPointerLock = self.getCanvas().requestPointerLock || self.getCanvas().mozRequestPointerLock;
				if (self.getCanvas().requestPointerLock === undefined) {
					self.canPointerLock = false;
					return;
				}
			}
			self.canPointerLock = true;
			self.getCanvas().requestPointerLock();
			self.state = 1;
			return;
		}
	};
	document.addEventListener("wheel", function(e) {
		self.wheelDelta.x += e.deltaX;
		self.wheelDelta.y += e.deltaY;
		self.wheelDelta.z += e.deltaZ;
	});
	document.addEventListener("touchstart", function(e) {
		console.log(e);
		//this.userTaps.push({})
		self.p_mouseStates[0] = true;
		self.p_cursorX = e.touches[0].pageX;
		self.p_cursorY = e.touches[0].pageY;
	});
	document.addEventListener("touchmove", function(e) {

		// single point support, for now.
		self.p_cursorX = e.touches[0].pageX;
		self.p_cursorY = e.touches[0].pageY;
	});
	document.addEventListener("touchend", function(e) {
		console.log(e);
		self.p_mouseStates[0] = false;
		//self.p_cursorX = e.touches[0].pageX;
		//self.p_cursorY = e.touches[0].pageY;
	});
	document.addEventListener('mousedown', function(e) {
		if (self.state == 1) {
			self.p_mouseStates[e.button] = !self.p_mouseStates[e.button];
		}
	});
	document.addEventListener('mouseup', function(e) {
		if (self.state == 1) {
			self.p_mouseStates[e.button] = !self.p_mouseStates[e.button];
		}
	});
	document.addEventListener('pointerlockchange', function(e) {

		if (self.mobileStatus == true) return;
		self.p_isPointerLocked = true;
		self.state = 1;
		if (document.pointerLockElement !== self.getCanvas())
		{
			//console.log("idk");
			self.p_isPointerLocked = false;
			self.state = 0;
		}

	});
	
	window.addEventListener("keydown", function(e) {
		//console.log(e);
		if (!self.isPointerLocked())
			return;
		self.p_keyStates[e.keyCode] = 1;
		//e.preventDefault();
	});
	window.addEventListener("keyup", function(e) { 
		//console.log(this);
		if (!self.isPointerLocked())
			return;
		self.p_keyStates[e.keyCode] = 0;
		//e.preventDefault();
	});
	window.addEventListener("mousemove", function(e) {
		var x = e.movementX || e.mozMovementX || e.webkitMovementX || e.clientX - self.p_cursorX;
		var y = e.movementY || e.mozMovementY || e.webkitMovementY || e.clientY - self.p_cursorY;
		if (self.canPointerLock == false || g_oddwarg == true) {
			
			//console.log(e);
			if (self.p_cursorX + x <= self.getCanvas().width && self.p_cursorX + x >= 0) {
				self.p_cursorX += x;//e.movementX;
			}
			if (self.p_cursorY + y <= self.getCanvas().height && self.p_cursorY + y >= 0) {
				self.p_cursorY += y;//e.movementY;
			}
			return;
		}

		if (!self.isPointerLocked() && g_oddwarg != true)
			return;

		var movementX = e.movementX;
		var movementY = e.movementY;

		var mx = self.p_mouseX + movementX;
		var my = self.p_mouseY + movementY;
		
		self.p_mouseX = mx;//e.movementX; 
		self.p_mouseY = my;//e.movementY;

		if (self.p_cursorX + movementX <= self.getCanvas().width && self.p_cursorX + movementX >= 0) {
			self.p_cursorX += movementX;//e.movementX;
		}
		if (self.p_cursorY + movementY <= self.getCanvas().width && self.p_cursorY + movementY >= 0) {
			self.p_cursorY += movementY;//e.movementY;
		}
	});
};
Input.prototype.clamp = function(value, min, max) {
	var t = value;//(((value)%(2*Math.PI))+2*Math.PI)%(2*Math.PI) // todo
	//console.log(t);
	//var a = (alimit*Math.PI)/180;
	//var b = (blimit*Math.PI)/180;
	if (t > max ) {
		t = max;
	}
	if (t < min) {
		t = min;
	}
	//console.log(t);
	return t;
};
Input.prototype.getWheelDelta = function() {
	return this.wheelDelta;
};
Input.prototype.isMobile = function() {
	return this.mobileStatus;
};
Input.prototype.focusMobileInput = function() {
	var self = this;
	if (this.usingiOS == true) {
		this.iPhoneInput = prompt("Sorry, I don't have an iOS device to properly dev and test :(\nTap the input element again after writing your text.");
		console.log(this.iPhoneInput);
		return;
	}
	setTimeout(function() {
		self.mobileInput.focus({preventScroll: true});
	}, 500);

	console.log(this.mobileInput);
};
Input.prototype.getMobileInput = function() {
	//console.log(this.iPhoneInput);
	if (this.usingiOS == true) {
		return this.iPhoneInput;
	}
	return this.mobileInput.value;
};
Input.prototype.consumeMobileInput = function(v) {
	if (this.usingiOS == true) {
		this.iPhoneInput = (v !== undefined ? v : "");
		return;
	}
	this.mobileInput.value = (v !== undefined ? v : "");
};
Input.prototype.getCanvas = function() {
	return this.canvas;
};
Input.prototype.getMouseState = function(key) {
	return this.p_mouseStates[key];
};
Input.prototype.isPointerLocked = function() {
	if (this.mobileStatus==true) return true;
	return this.p_isPointerLocked && this.canPointerLock==true;
};
Input.prototype.getCursorX = function() {
	return this.p_cursorX;
}
Input.prototype.getCursorY = function() {
	return this.p_cursorY;
};
Input.prototype.lockPointer = function(enable) {
	if (this.mobileStatus == true) return;
	if (!enable) {
		document.exitPointerLock();
		this.p_isPointerLocked = false;
		return 0;
	}

	this.getCanvas().requestPointerLock();
	this.state = 1;

};
Input.prototype.setCursorPos = function(pos) {
	this.p_cursorX = pos.x;
	this.p_cursorY = pos.y;

};
Input.prototype.getMouseX = function() {
	return this.p_mouseX;
};

Input.prototype.getMouseY = function() {
	return this.p_mouseY;
};

Input.prototype.getKey = function(key) {
	return this.p_keyStates[key];
};

// The amount of keys in here is too damn high
// probably lots wrong with this list
Input.MOUSE_LEFT = 0;
Input.MOUSE_MIDDLE = 1;
Input.MOUSE_RIGHT = 2;

Input.KEY_BACKSPACE = 8;
Input.KEY_TAB = 9;
Input.KEY_ENTER = 13;
Input.KEY_SHIFT = 16;
Input.KEY_CTRL = 17;
Input.KEY_ALT = 18;
Input.KEY_PAUSE = 19;
Input.KEY_CAPSLOCK = 20;
Input.KEY_ESCAPE = 27;
Input.KEY_SPACE = 32;
Input.KEY_PAGEUP = 33;
Input.KEY_PAGEDOWN = 34;
Input.KEY_END = 35;
Input.KEY_HOME = 36;

Input.KEY_ARROW_LEFT = 37;
Input.KEY_ARROW_UP = 38;
Input.KEY_ARROW_RIGHT = 39;
Input.KEY_ARROW_DOWN = 40;

Input.KEY_INSERT = 45;
Input.KEY_DELETE = 46;

Input.KEY_0 = 48;
Input.KEY_1 = 49;
Input.KEY_2 = 50;
Input.KEY_3 = 51;
Input.KEY_4 = 52;
Input.KEY_5 = 53;
Input.KEY_6 = 54;
Input.KEY_7 = 55;
Input.KEY_8 = 56;
Input.KEY_9 = 57;

Input.KEY_A = 65;
Input.KEY_B = 66;
Input.KEY_C = 67;
Input.KEY_D = 68;
Input.KEY_E = 69;
Input.KEY_F = 70;
Input.KEY_G = 71;
Input.KEY_H = 72;
Input.KEY_I = 73;
Input.KEY_J = 74;
Input.KEY_K = 75;
Input.KEY_L = 76;
Input.KEY_M = 77;
Input.KEY_N = 78;
Input.KEY_O = 79;
Input.KEY_P = 80;
Input.KEY_Q = 81;
Input.KEY_R = 82;
Input.KEY_S = 83;
Input.KEY_T = 84;
Input.KEY_U = 85;
Input.KEY_V = 86;
Input.KEY_W = 87;
Input.KEY_X = 88;
Input.KEY_Y = 89;
Input.KEY_Z = 90;

Input.KEY_LWINDOWKEY = 91;
Input.KEY_RWINDOWKEY = 92;
Input.KEY_SELECT = 93;

Input.KEY_NUMPAD_0 = 96;
Input.KEY_NUMPAD_1 = 97;
Input.KEY_NUMPAD_2 = 98;
Input.KEY_NUMPAD_3 = 99;
Input.KEY_NUMPAD_4 = 100;
Input.KEY_NUMPAD_5 = 101;
Input.KEY_NUMPAD_6 = 102;
Input.KEY_NUMPAD_7 = 103;
Input.KEY_NUMPAD_8 = 104;
Input.KEY_NUMPAD_9 = 105;

Input.KEY_MULTIPLY = 106;
Input.KEY_ADD = 107;
Input.KEY_SUBTRACT = 109;
Input.KEY_DECIMAL = 110;
Input.KEY_DIVIDE = 111;

Input.KEY_F1 = 112;
Input.KEY_F2 = 113;
Input.KEY_F3 = 114;
Input.KEY_F4 = 115;
Input.KEY_F5 = 116;
Input.KEY_F6 = 117;
Input.KEY_F7 = 118;
Input.KEY_F8 = 119;
Input.KEY_F9 = 120;
Input.KEY_F10 = 121;
Input.KEY_F11 = 122;
Input.KEY_F12 = 123;

Input.KEY_NUMLOCK = 144;
Input.KEY_SCROLLOCK = 145;
Input.KEY_SEMICOLON = 186;
Input.KEY_EQUAL = 187;
Input.KEY_COMMA = 188;
Input.KEY_DASH = 189;
Input.KEY_PERIOD = 190;
Input.KEY_FORWARDSLASH = 191;
Input.KEY_GRAVE = 192;
Input.KEY_OPENBRACKET = 219;
Input.KEY_BACKSLASH = 220;
Input.KEY_CLOSEBRACKET = 221;
Input.KEY_QUOTE = 222;

*/