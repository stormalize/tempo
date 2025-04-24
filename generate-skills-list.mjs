import fs from "node:fs";
import { argv } from "node:process";

const DEBUG = argv.includes("--debug");

const lists = {
	first: new Set(),
	middle: new Set(),
	last: new Set(),
	special: new Set(),
};

const specialTypes = ["Stealth Attack", "Ambush", "Unleashed Ambush"];

try {
	const data = fs.readFileSync("./skills.json", "utf8");
	const skills = JSON.parse(data);

	skills.forEach((skill) => {
		if (["Weapon_1", "Downed_1"].includes(skill.slot)) {
			const hasPrev = Object.hasOwn(skill, "prev_chain");
			const hasNext = Object.hasOwn(skill, "next_chain");

			if (hasNext && !hasPrev) {
				lists.first.add(skill);
			} else if (hasNext && hasPrev) {
				lists.middle.add(skill);
			} else if (!hasNext && hasPrev) {
				lists.last.add(skill);
			}

			const descriptionPrefix = skill.description.split(".", 2)[0];

			if (specialTypes.includes(descriptionPrefix)) {
				lists.special.add(skill);
			}
		}
	});

	const save = {};

	Object.entries(lists).forEach(([category, list]) => {
		save[category] = [];
		list.forEach((item) => {
			if (DEBUG) {
				save[category].push({ id: item.id, name: item.name });
			} else {
				save[category].push(item.id);
			}
		});
	});

	fs.writeFileSync("./out.json", JSON.stringify(save), "utf8");
} catch (err) {
	console.error(err);
}
