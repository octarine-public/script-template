import { Page, State } from "../menu"

const SURFACE = "@@packageName@@:marker"
const RADIUS = 12
const THICKNESS = 3

const shown = Page.AddToggle(
	"World marker",
	true,
	"Draws a health ring above every visible hero"
)
const tint = Page.AddColorPicker("Marker color", new Color(120, 200, 255))
const canvas = new MenuSDK.Canvas(SURFACE)
const center = new Vector2()

EventsSDK.on("Draw", () => {
	if (!State.value || !shown.value || !GameState.CanDrawOverlays) {
		return
	}
	const color = tint.SelectedColor
	const radius = GUIInfo.ScaleHeight(RADIUS)
	const thickness = GUIInfo.ScaleHeight(THICKNESS)
	const heroes = EntityManager.GetEntitiesByClass(Hero)
	for (let i = 0, end = heroes.length; i < end; i++) {
		const hero = heroes[i]
		if (!hero.IsAlive || !hero.IsVisible || hero.IsIllusion) {
			continue
		}
		const position = hero.Position
		canvas.AnchorWorld(position.x, position.y, position.z + hero.HealthBarOffset)
		canvas.Arc(center, radius, thickness, -90, hero.HPPercentDecimal * 360, color)
	}
	canvas.Anchor()
})
