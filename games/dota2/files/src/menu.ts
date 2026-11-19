const TAB = "@@menuTab@@"
const TITLE = "@@scriptName@@"
const TOOLTIP = "@@description@@"

/** The script's page in the menu. Each feature adds its own rows to it. */
export const Page = Menu.AddEntry(TAB).AddNode(TITLE, Menu.Icons.Puzzle, TOOLTIP)
Page.SortNodes = false

/** The master switch on the page's header. Every feature returns early while it is off. */
export const State = Page.AddToggle("State", true)
Page.HeaderControl = State
Page.Gate = State
