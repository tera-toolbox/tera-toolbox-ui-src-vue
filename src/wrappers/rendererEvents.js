const INC_EVENTS = {
	CONFIG: "set config",
	ISADMIN: "is admin",
	NEWUPDATE: "update available",
	TBINSTARTPROCESS: "proxy starting",
	TBSTARTED: "proxy running",
	LOGENTRY: "log",
	MODLIST: "set mods",
	MODLISTONLINE: "set installable mods",
	EXTERROR: "error"
};

const OUT_EVENTS = {
	HIDEUI: "hide window",
	CLOSEUI: "close toolbox",
	MINUI: "minimize window",
	OPENDISCORD: "open discord",
	OPENLINK: "open link",
	SHOWMODFOLDER: "show mods folder",
	SETCONFIG: "set config",
	STARTTB: "start proxy",
	STOPTB: "stop proxy",
	OPENINNOTEPAD: "open in notepad",
	TOGGLEMODLOAD: "toggle mod load",
	TOGGLEMODUPDATE: "toggle mod autoupdate",
	UNINSTALLMOD: "uninstall mod",
	INSTALLMOD: "install mod",
	REQMODLIST: "get mods",
	REQMODSONLINE: "get installable mods",
	REQCONFIG: "get config",
	INIT: "init"
};

export default {
	INC_EVENTS,
	OUT_EVENTS
};