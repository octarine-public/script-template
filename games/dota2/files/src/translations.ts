function load(name: string): Map<string, string> {
	return new Map(
		Object.entries(
			SharedSDK.readJSON<Record<string, string>>(`translations/${name}.json`)
		)
	)
}

Menu.Localization.AddLocalizationUnit("russian", load("ru"))
Menu.Localization.AddLocalizationUnit("english", load("en"))
Menu.Localization.AddLocalizationUnit("chinese", load("cn"))
