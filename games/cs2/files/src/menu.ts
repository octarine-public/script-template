// What you typed in the launcher. The name and the description stay on one line however long they are:
// prettier-ignore keeps the formatter from moving them.
const TAB = "@@menuTab@@"
// prettier-ignore
const TITLE = "@@scriptName@@"
// prettier-ignore
const TOOLTIP = "@@description@@"

/** The script's page in the menu. Each feature adds its own rows to it. */
export const Page = MenuSDK.Menu.AddEntry(TAB).AddNode(
	TITLE,
	MenuSDK.MenuIcons.Puzzle,
	TOOLTIP
)
Page.SortNodes = false

/** The master switch on the page's header. Every feature returns early while it is off. */
export const State = Page.AddToggle("State", true)
Page.HeaderControl = State
Page.Gate = State
