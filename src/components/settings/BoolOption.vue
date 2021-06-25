<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-checkbox v-on="on" v-bind="attrs" dense hide-details :label="text" v-model=val @change="$emit('update', { field, val: val });"></v-checkbox>
		</template>
		<span> {{ key }} </span>
	</v-tooltip>
</template>

<script>
export default {
	name: "BoolOption",
	components: {},
	props: ["text", "field", "startValue"],
	data: () => ({
		val: false
	}),
	mounted: function() {
		this.$nextTick(() => {
			this.val = this.startValue;
		});
	},
};
</script>