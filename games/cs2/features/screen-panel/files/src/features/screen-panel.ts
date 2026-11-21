import { Page, State } from "../menu"

const SURFACE = "@@packageName@@:panel"
// prettier-ignore
const TITLE = "@@scriptName@@"

const shown = Page.AddToggle(
	"Screen panel",
	true,
	"Shows the match time and your health in the top left corner"
)
const canvas = new MenuSDK.Canvas(SURFACE, MenuSDK.EPanelLayer.Screen)
const origin = new Vector2()
const size = new Vector2()
const cursor = new Vector2()
let status = ""

Events.on("PostDataUpdate", () => {
	if (!State.value || !shown.value) {
		return
	}
	const pawn = LocalPlayer?.PlayerPawn
	const health = pawn === undefined ? "-" : `${Math.round(pawn.HPPercent)}%`
	status = `${Math.formatTime(GameState.RawGameTime)}  HP ${health}`
})

Events.on("Draw", () => {
	if (!State.value || !shown.value || !GameState.CanDrawOverlays) {
		return
	}
	const colors = MenuSDK.HudColors
	const padding = Source2SDK.Renderer.ScaleHeight(10)
	const font = Source2SDK.Renderer.ScaleHeight(16)
	const line = Source2SDK.Renderer.ScaleHeight(22)
	origin.SetVector(
		Source2SDK.Renderer.ScaleWidth(16),
		Source2SDK.Renderer.ScaleHeight(180)
	)
	size.SetVector(Source2SDK.Renderer.ScaleWidth(220), padding * 2 + line * 2)
	canvas.Rect(origin, size, { color: colors.glass, radius: padding })
	cursor.SetVector(origin.x + padding, origin.y + padding)
	canvas.Text(TITLE, cursor, { color: colors.accent, size: font, weight: 700 })
	cursor.SetVector(cursor.x, cursor.y + line)
	canvas.Text(status, cursor, { color: colors.title, size: font })
})
