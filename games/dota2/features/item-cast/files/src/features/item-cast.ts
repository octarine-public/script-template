import { Page, State } from "../menu"

const enabled = Page.AddToggle(
	"Auto Phase Boots",
	false,
	"Uses Phase Boots whenever your hero is moving",
	0,
	ImageData.GetItemTexture("item_phase_boots")
)
let order: Nullable<ExecuteOrder>

function isUnderway(): boolean {
	const stage = order?.Stage
	return stage === EOrderStage.Queued || stage === EOrderStage.Sent
}

EventsSDK.on("PostDataUpdate", delta => {
	if (delta === 0 || !State.value || !enabled.value || GameRules?.IsPaused !== false) {
		return
	}
	const hero = LocalPlayer?.Hero
	if (hero === undefined || !hero.IsAlive || !hero.IsMoving || hero.IsInvisible) {
		return
	}
	const boots = hero.GetItemByClass(item_phase_boots)
	if (boots !== undefined && boots.CanBeCasted() && !isUnderway()) {
		order = hero.CastNoTarget(boots)
	}
})
EventsSDK.on("GameEnded", () => {
	order = undefined
})
