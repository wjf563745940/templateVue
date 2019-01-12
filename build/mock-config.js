const SocketServer = require("./socket-server");
const fs = require("fs");
const mock = require("./mock-analyze");
const uri = process.cwd();

function isContain(str, strPart) {
	return str && -1 !== str.indexOf(strPart);
}

function _getAnswerUrl(opt) {
	const basePath = url + "/test/";
	const parmas = opt;
	let path = basePath + "answers/";
	return path + parmas.question + ".json";
}

function getData(opt) {
	try {
		const str = fs.readFileSync(_getAnswerUrl(opt));
		return JSON.parse(str);
	} catch (e) {
		console.error("get data error:", e);
	}
	return null;
}

mock.mock("/api/?", "get", getData);
SocketServer.start();
SocketServer.send = function(req) {
	console.log("send", req);
};
