function Command(invoker, cmd, out) {
	var msg = "";
	if (cmd === "test") {
		msg = "test? ok. weirdo.";
	}

	if (msg.length > 0) {
		out.appendChild(UI.uiCreateElement({name: "span", text: msg}));// += this.value + 
		out.appendChild(UI.uiCreateElement({name: "br"}));
		out.scrollTop = out.scrollHeight;
	}
}