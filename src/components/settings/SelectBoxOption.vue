<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-select style="max-width=300px;" v-on="on" v-bind="attrs" class="mt-1" solo hide-details dense :items="options" :prefix="`${text}: `" v-model=val @change="$emit('update', { field: field, val: val });"></v-select>
		</template>
		<span> {{ key }} </span>
	</v-tooltip>
</template>

<script>
export default {
	name: "SelectBoxOption",
	components: {},
	props: ["text", "options", "field", "startValue"],
	data: () => ({
		val: null
	}),
	mounted: function() {
		this.$nextTick(() => {
			this.val = this.startValue;
		});
	},
};
</script>