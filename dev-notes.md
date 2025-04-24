# Dev Notes

Get all skills from API and store in `skills.json:

```sh
curl https://api.guildwars2.com/v2/skills?ids=all > skills.json
```

Process skills into custom arrays based on slot and type. Optionally use `--debug` arg to verify skill names in output instead of just ids.

```sh
node generate-skills-list.mjs
node generate-skills-list.mjs --debug
```

Copy arrays of ids from `out.json` into `tempo.json`.

**EXCEPTIONS**:

- Bladesworn skills are not included in the API for some reason, those need to be added in manually
- Ranger spear stealth attack 2 has to be added manually as it's not a slot 1 skill
- Necro sword auto-attack doesn't have prev or next listed in API
