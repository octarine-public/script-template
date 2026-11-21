import { Page, State } from "../menu"

const TAG = "[@@packageName@@]"

const log = Page.AddToggle(
	"Log match events",
	true,
	"Writes the start and the end of a match and every player that appears to the console"
)
const players = new Set<PlayerPawn>()

function report(message: string): void {
	if (State.value && log.value) {
		console.log(TAG, message)
	}
}

Events.on("GameStarted", () => report("match started"))
Events.on("GameEnded", () => {
	players.clear()
	report("match ended")
})
Events.on("EntityCreated", entity => {
	if (entity instanceof PlayerPawn) {
		players.add(entity)
		report(`player created: ${entity.Name} (${players.size} in the match)`)
	}
})
Events.on("EntityDestroyed", entity => {
	if (entity instanceof PlayerPawn && players.delete(entity)) {
		report(`player destroyed: ${entity.Name} (${players.size} left)`)
	}
})
