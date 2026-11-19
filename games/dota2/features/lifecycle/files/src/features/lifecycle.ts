import { Page, State } from "../menu"

const TAG = "[@@packageName@@]"

const log = Page.AddToggle(
	"Log match events",
	true,
	"Writes the start and the end of a match and every hero that appears to the console"
)
const heroes = new Set<Hero>()

function report(message: string): void {
	if (State.value && log.value) {
		console.log(TAG, message)
	}
}

EventsSDK.on("GameStarted", () => report("match started"))
EventsSDK.on("GameEnded", () => {
	heroes.clear()
	report("match ended")
})
EventsSDK.on("EntityCreated", entity => {
	if (entity instanceof Hero && !entity.IsIllusion) {
		heroes.add(entity)
		report(`hero created: ${entity.Name} (${heroes.size} in the match)`)
	}
})
EventsSDK.on("EntityDestroyed", entity => {
	if (entity instanceof Hero && heroes.delete(entity)) {
		report(`hero destroyed: ${entity.Name} (${heroes.size} left)`)
	}
})
