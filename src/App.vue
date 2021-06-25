<template>
	<v-app>
		<v-system-bar class="elevation-1 mb-0 pa-0" window>
			<span class="ml-2 mr-2" style="-webkit-app-region: drag;"> {{ gui_main_title }}</span>
			<v-icon size=20>{{ toolboxStatus }}</v-icon>
			<v-icon size=20 :style="adminBadgeStyle">{{ mdiShieldKeyOutline }}</v-icon>
			<div v-if="!newUpdate" class="flex-grow-1" style="-webkit-app-region: drag; height:100%"></div>
			<span v-if="newUpdate" class="flex-grow-1" style="-webkit-app-region: drag;">{{ gui_main_status-update-available }}</span>
			<v-icon @click="openDiscordClick" class="ml-1" size=18> {{ mdiDiscord }}</v-icon>
			<v-icon @click="minimizeClick" class="ml-1" size=18> {{ mdiWindowMinimize  }}</v-icon>
			<v-icon @click="closeClick" class="ml-1" size=18> {{ mdiClose }}</v-icon>
		</v-system-bar>
		<template v-if="!settings">
			<v-container fluid fill-height>
				<v-row align="center" justify="center">
					<v-progress-circular :size="70" indeterminate></v-progress-circular>
				</v-row>
			</v-container>
		</template>
		<template v-else>
			<v-container fluid class="pa-0">
				<v-tabs ref="tabs" v-model="selectedTab" left background-color="#191919" slider-size="1" @change="tabChange">
					<v-tab class="pr-2">
						<v-icon size=20 left>
							{{ mdiConsole }}
						</v-icon>
						{{ gui_main_static_tabs_log_title }}
					</v-tab>
					<v-tab class="pl-2 pr-2">
						<v-icon size=20 left>
							{{ mdiArchiveOutline }}
						</v-icon>
						{{ gui_main_static_tabs_mods_title }}
					</v-tab>
					<v-tab class="pl-2 pr-2">
						<v-icon size=20 left>
							{{ mdiArchiveArrowDownOutline }}
						</v-icon>
						{{ gui_main_static_tabs_newmods_title }}
					</v-tab>
					<v-tab class="pl-2 pr-2">
						<v-icon size=20 left>
							{{ mdiCogOutline }}
						</v-icon>
						{{ gui_main_static_tabs_settings_title }}
					</v-tab>
					<v-spacer></v-spacer>
					<v-btn @click="startToolbox" text :class="toolboxButtonBorderClass" tile>
						<v-icon size=20 left>
							{{ toolboxButtonIcon }}
						</v-icon>
						Toolbox
					</v-btn>
					<v-tab-item :transition="false" :reverse-transition="false">
						<v-container fluid class="pa-1 pre-wrap-words" >
							<div class="override-line-height scroller" id="logs" ref="logs">
								<div v-for="(item, index) of logs" :key="index" :class="item.type">{{ item.text }}</div>
							</div>
						</v-container>
					</v-tab-item>
					<v-tab-item :transition="false" :reverse-transition="false">
						<v-container fluid class="pa-1">
							<v-toolbar height=32>
								<v-spacer></v-spacer>
								<v-btn @click="showModsFolder" small>
									<v-icon left>{{ mdiFolderOutline }}</v-icon>
									{{  gui_main_static_tabs_modsfolder_title }}
								</v-btn>
								<v-spacer></v-spacer>
							</v-toolbar>
							<div class="scroller-cutted">
								<v-expansion-panels multiple accordion flat focusable v-model="openedPanels">
									<InstalledMod @action="installedModActionClick" v-for="(item, index) of modList" :key="index" :modInfo="item"></InstalledMod>
								</v-expansion-panels>
							</div>
						</v-container>
					</v-tab-item>
					<v-tab-item :transition="false" :reverse-transition="false">
						<template v-if="!modOnlineListRaw.length">
							<v-container fluid fill-height>
								<v-row align="center" justify="center">
									<v-progress-circular :size="70" indeterminate></v-progress-circular>
								</v-row>
							</v-container>
						</template>
						<template v-else>
							<v-container fluid class="pa-1">
								<v-toolbar height=32>
									<v-spacer></v-spacer>
									<v-text-field v-model="filter" single-line :prepend-inner-icon="mdiMagnify" :label="gui_main_static_tabs_newmods_content_filter" style="max-width: 220px;" dense hide-details></v-text-field>
									<v-checkbox v-model="networkModsCheckbox" class="ml-2" :label="gui_main_static_tabs_newmods_content_filter_network" dense hide-details></v-checkbox>
									<v-checkbox v-model="clientModsCheckbox" class="ml-2" :label="gui_main_static_tabs_newmods_content_filter_client" dense hide-details></v-checkbox>
									<v-spacer></v-spacer>
								</v-toolbar>
								<div class="scroller-cutted">
									<v-expansion-panels multiple accordion flat focusable v-model="openedPanelsNewMod">
										<NewMod @action="newModActionClick" v-for="(item, index) of newModsWithFilter" :key="index" :modInfo="item"></NewMod>
									</v-expansion-panels>
								</div>
							</v-container>
						</template>
					</v-tab-item>
					<v-tab-item :transition="false" :reverse-transition="false">
						<v-container fluid class="pa-1 pl-3">
							<div class="scroller">
								<v-subheader> {{ gui_main_static_tabs_settings_toolbox }}</v-subheader>
								<SelectBoxOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_uilanguage" :options="languages" :field="'uilanguage'" :startValue="settings.uilanguage"></SelectBoxOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_autostart" :field="'autostart'" :startValue="settings.gui.autostart"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_updatelog" :field="'updatelog'" :startValue="settings.updatelog"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_logtimes" :field="'logtimes'" :startValue="settings.gui.logtimes"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_cleanstart" :field="'cleanstart'" :startValue="settings.gui.cleanstart"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_noupdate" :field="'noupdate'" :startValue="settings.noupdate"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_noselfupdate" :field="'noselfupdate'" :startValue="settings.noselfupdate"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_minimizetotray" :field="'minimizetotray'" :startValue="settings.gui.minimizetotray"></BoolOption>
								<v-subheader> {{ gui_main_static_tabs_settings_groupclient }}</v-subheader>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_noslstags" :field="'noslstags'" :startValue="settings.noslstags"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_removecounters" :field="'removecounters'" :startValue="settings.removecounters"></BoolOption>
								<BoolOption @update="settingsChange" :text="gui_main_static_tabs_settings_content_noserverautojoin" :field="'noserverautojoin'" :startValue="settings.noserverautojoin"></BoolOption>
							</div>
						</v-container>
					</v-tab-item>
				</v-tabs>
			</v-container>
		</template>
	</v-app>
</template>

<script>
import { mdiMagnify, mdiFolderOutline, mdiShieldKeyOutline, mdiDiscord, mdiWindowMinimize, mdiClose, mdiCogOutline, mdiConsole, mdiArchiveOutline, mdiArchiveArrowDownOutline, mdiPlay, mdiStopCircleOutline, mdiPauseCircleOutline } from "@mdi/js";
import events from "./wrappers/rendererEvents.js";
import { storeGetters, storeKeys, setState } from "./wrappers/translationStore.js";

import NewMod from "./components/Mods/NewMod.vue";
import InstalledMod from "./components/Mods/InstalledMod.vue";
import BoolOption from "./components/settings/BoolOption.vue";
import SelectBoxOption from "./components/settings/SelectBoxOption.vue";

let mui = null;

const displayName = (modInfo) => {
	if (modInfo.options) {
		if (modInfo.options.guiName)
			return modInfo.options.guiName;
		if (modInfo.options.cliName)
			return modInfo.options.cliName;
	}

	return modInfo.rawName || modInfo.name;
};
export default {
	name: "App",
	components: {
		BoolOption,
		InstalledMod,
		NewMod,
		SelectBoxOption
	},
	data: () => ({
		languages: [],
		tbRunning: false,
		tbStarting: false,
		settings: null,
		logs: [],
		modList: [],
		modOnlineListRaw: [],
		admin: false,
		newUpdate: false,

		filter: "",
		networkModsCheckbox: true,
		clientModsCheckbox: true,
		selectedTab: 0,
		openedPanels: [],
		openedPanelsNewMod: [],
		awaitInstalledModAction: false,
		awaitNewModAction: false,
		mdiShieldKeyOutline,
		mdiDiscord,
		mdiWindowMinimize,
		mdiClose,
		mdiCogOutline,
		mdiConsole,
		mdiArchiveArrowDownOutline,
		mdiArchiveOutline,
		mdiPlay,
		mdiStopCircleOutline,
		mdiPauseCircleOutline,
		mdiFolderOutline,
		mdiMagnify
	}),
	computed: {
		...storeGetters,
		adminBadgeStyle() {
			return this.admin ? "opacity: 100%;" : "opacity: 0%;";
		},
		toolboxButtonBorderClass() {
			// eslint-disable-next-line no-nested-ternary
			return this.tbStarting ? "border-bott-orange" : this.tbRunning ? "border-bott-red" : "border-bott-green";
		},
		toolboxButtonIcon() {
			// eslint-disable-next-line no-nested-ternary
			return this.tbStarting ? this.mdiPauseCircleOutline : this.tbRunning ? this.mdiStopCircleOutline : this.mdiPlay;
		},
		toolboxStatus() {
			// eslint-disable-next-line no-nested-ternary
			return this.tbStarting ? this.mdiPauseCircleOutline : this.tbRunning ? this.mdiPlay :this.mdiStopCircleOutline ;
		},
		newModsWithFilter() {
			const keywordsFromFilter = this.filter.length > 0 ? this.filter.split(",").map(x => x.trim().toLowerCase()).filter(x => x.length > 0) : [];
			return this.modOnlineListRaw.filter(modInfo => {
				if(modInfo.keywords && !this.networkModsCheckbox && modInfo.keywords.includes("network")) return false;
				if(modInfo.keywords && !this.clientModsCheckbox && modInfo.keywords.includes("client")) return false;

				return keywordsFromFilter.length === 0 || keywordsFromFilter.some(keyword => (modInfo.author && modInfo.author.toLowerCase().includes(keyword)) || (modInfo.description && modInfo.description.toLowerCase().includes(keyword)) || displayName(modInfo).toLowerCase().includes(keyword) || (modInfo.keywords && modInfo.keywords.includes(keyword)));
			});
		}
	},
	mounted: function() {
		this.languages = Object.keys(window.languageNames).forEach(id => { this.languages.push({ text: window.languageNames[id], value: id});});
		this.setLanguage();
		window.renderer.on(events.INC_EVENTS.LOGENTRY, (_, msg, type) => {
			let timeStr = "";
			if (this.settings.gui.logtimes) {
				const now = new Date();
				timeStr = `[${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}] `;
			}
			this.logs.push({
				type: `log-${type}` || "log",
				text: `${timeStr || ""}${msg}`
			});

			this.$nextTick(() => {
				const container =this.$refs.logs;
				container.scrollTop = container.scrollHeight;
			});
		});
		window.renderer.on(events.INC_EVENTS.MODLIST, (_, modList) => {
			this.awaitInstalledModAction = false;
			this.modList = modList;
		});

		window.renderer.on(events.INC_EVENTS.MODLISTONLINE, (_, modList) => {
			this.awaitNewModAction = false;
			this.modOnlineListRaw = modList;
		});

		window.renderer.on(events.INC_EVENTS.NEWUPDATE, () => {
			this.newUpdate = true;
		});
		window.renderer.on(events.INC_EVENTS.CONFIG, (_, settings) => {
			this.settings = settings;
			setState("language", this.settings.uilanguage);
			this.setLanguage();
		});
		window.renderer.on(events.INC_EVENTS.TBINSTARTPROCESS, () => {
			this.tbStarting = true;
		});
		window.renderer.on(events.INC_EVENTS.TBSTARTED, (_, running) => {
			if(this.tbStarting && !running && this.tbRunning) return;
			this.tbRunning = running;
			this.tbStarting = false;
		});
		window.renderer.on(events.INC_EVENTS.ISADMIN, (_, isAdmin) => {
			this.admin = isAdmin;
		});
		window.renderer.send(events.OUT_EVENTS.INIT);
	},
	methods: {
		startToolbox() {
		
			if(this.tbRunning) {
				window.renderer.send(events.OUT_EVENTS.STOPTB);
			}
			else {
				if(this.tbRunning || this.tbStarting) return;
				this.tbStarting = true;
				window.renderer.send(events.OUT_EVENTS.STARTTB);
				if(this.settings.gui.cleanstart) this.logs = [];
				if(this.selectedTab !== 0) {
					this.selectedTab = 0;
				}
			}
		},
		showModsFolder() {
			window.renderer.send(events.OUT_EVENTS.SHOWMODFOLDER);
		},
		closeClick() {
			window.renderer.send(events.OUT_EVENTS.CLOSEUI);
		},
		minimizeClick() {
			if (this.settings.gui.minimizetotray)
				window.renderer.send(events.OUT_EVENTS.HIDEUI);
			else
				window.renderer.send(events.OUT_EVENTS.MINUI);
		},
		openDiscordClick() {
			window.renderer.send(events.OUT_EVENTS.OPENDISCORD);
		},
		setLanguage() {
			mui = new window.TeraToolboxMUI(this.language);
			storeKeys.forEach(key => {
				if(key !== "language")
					setState(key, mui.get(key.replaceAll("_", "/")));
			});
			if(this.$refs.tabs) this.$refs.tabs.onResize();
		},
		installedModActionClick(payload) {
			switch(payload.type) {
			case("uninstall"): if(!this.tbRunning && !this.tbStarting && !this.awaitInstalledModAction) { this.awaitInstalledModAction = true; window.renderer.send(events.OUT_EVENTS.UNINSTALLMOD, payload.payload); } break;
			case("toggle"): if(!this.awaitInstalledModAction) { this.awaitInstalledModAction = true; window.renderer.send(events.OUT_EVENTS.TOGGLEMODLOAD, payload.payload); } break; 
			case("toggle-autoupdate"): if(!this.awaitInstalledModAction) { this.awaitInstalledModAction = true; window.renderer.send(events.OUT_EVENTS.TOGGLEMODUPDATE, payload.payload); } break; 
			case("readme"): window.renderer.send(events.OUT_EVENTS.OPENINNOTEPAD, payload.payload); break; 
			default: console.log(payload); break;
			}
		},
		newModActionClick(payload) {
			switch(payload.type) {
			case("install"): if(!this.tbRunning && !this.tbStarting && !this.awaitNewModAction) { this.awaitNewModAction = true; window.renderer.send(events.OUT_EVENTS.INSTALLMOD, payload.payload); } break;
			default: console.log(payload); break;
			}
		},
		settingsChange(payload) {
			console.log("change settings", payload);
			switch(payload.field) {
			case("autostart"): this.settings.gui.autostart = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("updatelog"): this.settings.updatelog = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("logtimes"): this.settings.gui.logtimes = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("noupdate"): this.settings.noupdate = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("noselfupdate"): this.settings.noselfupdate = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("noslstags"): this.settings.noslstags = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("noserverautojoin"): this.settings.noserverautojoin = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("minimizetotray"): this.settings.gui.minimizetotray = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("cleanstart"): this.settings.gui.cleanstart = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("removecounters"): this.settings.removecounters = payload.val; window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			case("uilanguage"): this.settings.uilanguage = payload.val; setState("language", this.settings.uilanguage); this.setLanguage(); window.renderer.send(events.OUT_EVENTS.SETCONFIG, this.settings); break;
			default: console.log(payload); break;
			}
			console.log("log times after switch", this.settings.gui.logtimes);
		},
		tabChange() {
			switch(this.selectedTab) {
			case(1): window.renderer.send(events.OUT_EVENTS.REQMODLIST); break;	
			case(2): window.renderer.send(events.OUT_EVENTS.REQMODSONLINE); break;
			case(3): window.renderer.send(events.OUT_EVENTS.REQCONFIG); break;
			default: console.log(this.selectedTab); break;
			}
		}
	}
};
</script>