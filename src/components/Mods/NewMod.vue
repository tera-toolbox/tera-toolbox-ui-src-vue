<template>
	<v-expansion-panel class="mt-1" style="min-height: 25px">
		<v-expansion-panel-header class="pa-1" v-slot="{ open }">
			<v-row no-gutters>
				<v-chip outlined label class="margin-top-2px mr-2">
					<v-icon size=20 v-if="modInfo.drmKey" left> {{ mdiCurrencyUsd }}</v-icon>
					{{ displayName(modInfo) }}
				</v-chip>
				<v-chip v-if="modInfo.author" outlined label class="margin-top-2px mr-4 text--secondary">
					{{ modInfo.author }}
				</v-chip>
				<v-spacer></v-spacer>
				<v-tooltip open-delay="500"  bottom v-if="!open">
					<template v-slot:activator="{ on, attrs }">
						<v-btn v-bind="attrs" v-on="on" @click.stop="emitEvent('install', modInfo)" class="ml-3" icon>
							<v-icon>
								{{ mdiCloudDownload }}
							</v-icon>
						</v-btn>
					</template>
					<span> {{ downloadString }}</span>
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
					<v-tooltip open-delay="500" bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn  v-bind="attrs" v-on="on" @click="emitEvent('install', modInfo)" class="ml-3 mr-2" icon small>
								<v-icon>
									{{ mdiCloudDownload }}
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
	mdiCloudDownload
} from "@mdi/js";

import { state } from "./../../wrappers/translationStore.js";

export default {
	name: "NewMod",
	components: {},
	props: ["modInfo"],
	data: () => ({
		mdiCloudDownload
	}),
	computed: {
		downloadString() {
			return state.gui_tooltip_download;
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