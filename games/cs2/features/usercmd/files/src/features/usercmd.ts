import { Page, State } from "../menu"

const HANDLER = "@@packageName@@.walk"

const key = Page.AddKeybind("Walk key", "", "While held, walks forward")
const handler = UserCmdManager.AddHandler(HANDLER, ({ command }) => {
	command.move.Set(1, 0)
})

function sync(): void {
	handler.Enabled = State.value && key.isPressed
}

State.OnValue(sync)
key.OnValue(sync)
