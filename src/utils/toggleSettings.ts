import type {
  handleNumericSettingsProps,
  handleStringSettingProps,
} from '@/types/settingsTypes'

export function handleNumericSetting({
  value,
  setOptions,
}: handleNumericSettingsProps) {
  setOptions(prevOptions => ({
    ...prevOptions,
    count: value,
  }))
}

export function handleStringSetting({
  optionName,
  options,
  setOptions,
}: handleStringSettingProps) {
  if (optionName === 'time' && options['time']) return
  if (optionName === 'words' && options['words']) return

  if (optionName === 'time' && options['words']) {
    setOptions(prevOptions => ({
      ...prevOptions,
      time: true,
      words: false,
    }))
  } else if (optionName === 'words' && options['time']) {
    setOptions(prevOptions => ({
      ...prevOptions,
      time: false,
      words: true,
    }))
  } else {
    setOptions(prevOptions => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName],
    }))
  }
}
