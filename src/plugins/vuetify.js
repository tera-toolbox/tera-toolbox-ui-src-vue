import Vuetify from "vuetify/lib";

export function useVuetify (app) {
	app.use(Vuetify);
}

export function createVuetify () {
	const vuetify = new Vuetify({
		theme: {
			dark: true
		},
		icons: {
			iconfont: "mdiSvg",
		}
	});

	return vuetify;
}