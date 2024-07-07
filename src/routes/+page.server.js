import { json } from "@sveltejs/kit";

export function load({ cookies }) {
	let gallery = cookies.get("gallery");

	if (!gallery) {
		console.log("setting gallery to []");
		cookies.set("gallery", JSON.stringify({}), { path: "/" });
	}

	gallery = cookies.get("gallery");

	console.log(gallery);

	return {
		gallery,
	};
}
