import { Page, State } from "../menu"

const SURFACE = "@@packageName@@:marker"
const RADIUS = 10
const WIDTH = 2

const shown = Page.AddToggle("World marker", true, "Draws a ring above every other hero")
const tint = Page.AddColorPicker("Marker color", new Color(120, 200, 255))
const canvas = new MenuSDK.WorldCanvas(SURFACE)
const head = new Vector3()
const screen: [number, number] = [0, 0]

Events.on("Draw", () => {
	if (!State.value || !shown.value || !GameState.CanDrawOverlays) {
		return
	}
	const local = LocalPlayer?.Hero
	const color = tint.SelectedColor
	const pawns = EntityManager.GetEntitiesByClass(PlayerPawn)
	for (let i = 0, end = pawns.length; i < end; i++) {
		const pawn = pawns[i]
		if (!pawn.IsValid || !pawn.IsAlive || pawn === local) {
			continue
		}
		const position = pawn.Position
		const height = pawn.BoundingBox.MaxOffset.z
		head.SetVector(position.x, position.y, position.z + height)
		if (canvas.Project(head, screen)) {
			canvas.PinEntity(pawn.Handle, 0, 0, height)
			canvas.Circle(screen[0], screen[1], RADIUS, WIDTH, color)
			canvas.Unpin()
		}
	}
})
