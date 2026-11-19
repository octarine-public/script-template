import { Page, State } from "../menu"

const MESSAGE = "glhf"
const COOLDOWN_MS = 5000

const key = Page.AddKeybind(
	"Greet key",
	"",
	"Sends a short greeting to the team chat, at most once in five seconds"
)
let readyAt = 0

key.OnPressed(() => {
	const now = hrtime()
	if (!State.value || !GameState.IsConnected || now < readyAt) {
		return
	}
	readyAt = now + COOLDOWN_MS
	GameState.ExecuteCommand(`say_team "${MESSAGE}"`)
})
