function Command(invoker, cmd, out) {
	this.out = out;
	
	var params = cmd.split(" ");
	switch(params[0]) {
		case "test": {
			this.write("test? ok. weirdo. 1");
			break;
		}
		case "uitest": {
			break;
		}
		/*case "": {
			break;
		}*/
		default: {
			break;
		}
	}

}
Command.prototype.write = function(msg) {
	if (this.out !== undefined ) {
		this.out.appendChild(UI.uiCreateElement({name: "span", text: msg}));// += this.value + 
		this.out.appendChild(UI.uiCreateElement({name: "br"}));
		this.out.scrollTop = this.out.scrollHeight;
	}
};