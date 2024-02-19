export type TestSettings = {
  [key: string]: boolean | number
}

export type OptionProps = {
  label: string
  value: string
  icon: string
  options: TestSettings
  setOptions: React.Dispatch<React.SetStateAction<TestSettings>>
  gameActive: boolean
}

export type MobileSettingsProps = {
  options: TestSettings
  setOptions: React.Dispatch<React.SetStateAction<TestSettings>>
}

export type handleNumericSettingsProps = {
  value: number
  setOptions: React.Dispatch<React.SetStateAction<TestSettings>>
}

export type handleStringSettingProps = {
  optionName: string
  options: TestSettings
  setOptions: React.Dispatch<React.SetStateAction<TestSettings>>
}
