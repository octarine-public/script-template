import { Page, State } from "../menu"

const key = Page.AddKeybind(
	"Cast first ability",
	"",
	"While held, casts your first ability as soon as it is ready"
)

function firstAbility(hero: PlayerPawn): Nullable<Ability> {
	const spells = hero.Spells
	for (let i = 0, end = spells.length; i < end; i++) {
		const spell = spells[i]
		if (spell?.AbilitySlot === EAbilitySlots.ESlot_Signature_1) {
			return spell
		}
	}
	return undefined
}

Events.on("CreateMove", (cmd: UserCmd) => {
	if (!State.value || !key.isPressed) {
		return
	}
	const hero = LocalPlayer?.Hero
	if (hero === undefined || !hero.IsAlive) {
		return
	}
	const ability = firstAbility(hero)
	if (ability !== undefined && ability.CanBeCasted()) {
		ability.Use(cmd)
	}
})
