<template>
	<v-expansion-panel class="mt-1" style="min-height: 25px" :class="isDisabledClass">
		<v-expansion-panel-header class="pa-1" v-slot="{ open }">
			<v-row no-gutters>
				<v-chip outlined label class="mr-2">
					<v-icon size=20 v-if="modInfo.drmKey" left> {{ mdiCurrencyUsd }}</v-icon>
					{{ displayName(modInfo) }}
				</v-chip>
				<v-chip v-if="modInfo.author" outlined label class="mr-4 text--secondary">
					{{ modInfo.author }}
				</v-chip>
				<v-spacer></v-spacer>
				<v-tooltip open-delay="1500" bottom v-if="!open && !modInfo.isCoreModule && modInfo.compatibility === 'compatible'">
					<template v-slot:activator="{ on, attrs }">
						<v-btn v-bind="attrs" v-on="on" @click.stop="emitEvent('toggle-autoupdate', modInfo)" class="ml-3" icon>
							<v-icon>
								{{ !modInfo.disableAutoUpdate ? mdiProgressClose : mdiProgressDownload }}
							</v-icon>
						</v-btn>
					</template>
					<span> {{ toggleAutoupdateString }}</span>
				</v-tooltip>
				<v-tooltip open-delay="1500" bottom v-if="!open && !modInfo.isCoreModule && modInfo.compatibility === 'compatible'">
					<template v-slot:activator="{ on, attrs }">
						<v-btn v-bind="attrs" v-on="on" @click.stop="emitEvent('toggle', modInfo)" icon>
							<v-icon>
								{{ !modInfo.disabled ? mdiFlaskMinusOutline : mdiFlaskOutline }}
							</v-icon>
						</v-btn>
					</template>
					<span> {{ toggleString }}</span>
				</v-tooltip>
			</v-row>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-container class="pa-1 pl-2 pt-2" fluid>
				<v-row v-if="modInfo.description" no-gutters>
					<p class="text--secondary">
						{{ modInfo.description }}
					</p>
				</v-row>
				<v-row no-gutters>
					<v-spacer></v-spacer>
					<v-tooltip open-delay="1500" bottom v-if="modInfo.readmePath">
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" @click="emitEvent('readme', modInfo.readmePath)" icon small>
								<v-icon>
									{{ mdiInformationOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>
							{{ readmeString }}
						</span>
					</v-tooltip>
					<v-tooltip open-delay="1500" bottom v-if="modInfo.donationUrl">
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" @click="emitEvent('donation', modInfo.donationUrl)" icon small>
								<v-icon>
									{{ mdiGiftOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>
							{{ donateString }}
						</span>
					</v-tooltip>
					<v-tooltip open-delay="1500" bottom v-if="modInfo.supportUrl">
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" @click="emitEvent('support', modInfo.supportUrl)" icon small>
								<v-icon>
									{{ mdiLinkVariant }}
								</v-icon>
							</v-btn>
						</template>
						<span>
							{{ supportString }}
						</span>
					</v-tooltip>
					<v-tooltip open-delay="1500" bottom v-if="!modInfo.isCoreModule && modInfo.compatibility === 'compatible'">
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" @click="emitEvent('toggle-autoupdate', modInfo)" class="ml-3" icon small>
								<v-icon>
									{{ !modInfo.disableAutoUpdate ? mdiProgressClose : mdiProgressDownload }}
								</v-icon>
							</v-btn>
						</template>
						<span>
							{{ toggleAutoupdateString }}
						</span>
					</v-tooltip>
					<v-tooltip open-delay="1500" bottom v-if="!modInfo.isCoreModule && modInfo.compatibility === 'compatible'">
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" @click="emitEvent('toggle', modInfo)" icon small>
								<v-icon>
									{{ !modInfo.disabled ? mdiFlaskMinusOutline : mdiFlaskOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>
							{{ toggleString }}
						</span>
					</v-tooltip>
					<v-tooltip open-delay="1500" bottom v-if="!modInfo.isCoreModule">
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on" @click="emitEvent('uninstall', modInfo)"  class="ml-3 mr-2" icon small>
								<v-icon>
									{{ mdiTrashCanOutline }}
								</v-icon>
							</v-btn>
						</template>
					</v-tooltip>
				</v-row>
			</v-container>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
import {
	mdiCurrencyUsd,
	mdiProgressClose,
	mdiProgressDownload,
	mdiFlaskMinusOutline,
	mdiFlaskOutline,
	mdiInformationOutline,
	mdiGiftOutline,
	mdiLinkVariant,
	mdiTrashCanOutline
} from "@mdi/js";

import { state } from "./../../wrappers/translationStore.js";

export default {
	name: "InstalledMod",
	components: {},
	props: ["modInfo"],
	data: () => ({
		mdiCurrencyUsd,
		mdiProgressClose,
		mdiProgressDownload,
		mdiFlaskMinusOutline,
		mdiFlaskOutline,
		mdiInformationOutline,
		mdiGiftOutline,
		mdiLinkVariant,
		mdiTrashCanOutline
	}),
	computed: {
		isDisabledClass() {
			return this.modInfo.disabled ? "disabled-mod" : "not-disabled-mod";
		},
		readmeString() {
			return state.gui_tooltip_readme;
		},
		supportString() {
			return state.gui_tooltip_supportLink;
		},
		donateString() {
			return state.gui_tooltip_donate;
		},
		removeString() {
			return state.gui_tooltip_remove;
		},
		toggleString() {
			return state.gui_tooltip_toggleMod;
		},
		toggleAutoupdateString() {
			return state.gui_tooltip_toggleModAutoupdate;
		}
	},
	methods: {
		displayName(modInfo) {
			if (modInfo.options) {
				if (modInfo.options.guiName)
					return modInfo.options.guiName;
				if (modInfo.options.cliName)
					return modInfo.options.cliName;
			}

			return modInfo.rawName || modInfo.name;
		},
		emitEvent(event, payload) {
			this.$emit("action", { payload: payload, type: event});
		}
	}
};
</script>