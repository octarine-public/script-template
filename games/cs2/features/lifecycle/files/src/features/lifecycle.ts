import { Page, State } from "../menu"

const TAG = "[@@packageName@@]"

const log = Page.AddToggle(
	"Log match events",
	true,
	"Writes the start and the end of a match and every hero that appears to the console"
)
const heroes = new Set<PlayerPawn>()

function report(message: string): void {
	if (State.value && log.value) {
		console.log(TAG, message)
	}
}

Events.on("GameStarted", () => report("match started"))
Events.on("GameEnded", () => {
	heroes.clear()
	report("match ended")
})
Events.on("EntityCreated", entity => {
	if (entity instanceof PlayerPawn) {
		heroes.add(entity)
		report(`hero created: ${entity.Name} (${heroes.size} in the match)`)
	}
})
Events.on("EntityDestroyed", entity => {
	if (entity instanceof PlayerPawn && heroes.delete(entity)) {
		report(`hero destroyed: ${entity.Name} (${heroes.size} left)`)
	}
})
