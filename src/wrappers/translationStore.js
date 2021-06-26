import Vue from "vue";
const state = Vue.observable({
	"language": "en",
	"gui_tooltip_download": "",
	"gui_tooltip_remove": "",
	"gui_tooltip_supportLink": "",
	"gui_tooltip_donate": "",
	"gui_tooltip_readme": "",
	"gui_tooltip_toggleMod": "",
	"gui_tooltip_toggleModAutoupdate": "",
	"gui_main_title": "",
	"gui_main_static_tabs_log_title": "",
	"gui_main_static_tabs_mods_title": "",
	"gui_main_static_tabs_newmods_title": "",
	"gui_main_static_tabs_settings_title": "",
	"gui_main_static_tabs_modsfolder_title": "",
	"gui_main_static_tabs_newmods_content_filter": "",
	"gui_main_static_tabs_newmods_content_filter_network": "",
	"gui_main_static_tabs_newmods_content_filter_client": "",
	"gui_main_static_tabs_newmods_loading": "",
	"gui_main_static_tabs_settings_toolbox": "",
	"gui_main_static_tabs_settings_content_uilanguage": "",
	"gui_main_static_tabs_settings_content_theme": "",
	"gui_main_static_tabs_settings_content_autostart": "",
	"gui_main_static_tabs_settings_content_updatelog": "",
	"gui_main_static_tabs_settings_content_logtimes": "",
	"gui_main_static_tabs_settings_content_cleanstart": "",
	"gui_main_static_tabs_settings_content_noupdate": "",
	"gui_main_static_tabs_settings_content_noselfupdate": "",
	"gui_main_static_tabs_settings_content_minimizetotray": "",
	"gui_main_static_tabs_settings_groupclient": "",
	"gui_main_static_tabs_settings_content_noslstags": "",
	"gui_main_static_tabs_settings_content_removecounters": "",
	"gui_main_static_tabs_settings_content_noserverautojoin": "",
	"gui_main_status-update-available": "",
	"gui_main_start-stop-proxy-starting": "",
	"gui_main_start-stop-proxy-stopping": "",
	"gui_main_start-stop-proxy-running": "",
	"gui_main_start-stop-proxy-not-running": "",
	"gui_main_modal_error-cannot-install-mod-while-running": "",
	"gui_main_modal_error-cannot-uninstall-mod-while-running": "",
	"gui_main_modal_warn-self-update-disabled": "",
	"gui_main_modal_warn-mod-update-disabled": ""
});

const storeGetters = Object.keys(state)
	.reduce((getters, key) => {
		getters[key] = () => state[key];
		return getters;
	}, {});

const storeKeys = Object.keys(state);

export const setState = (key, value) => {
	state[key] = value;
};

export { storeGetters };
export { storeKeys };
export { state };
