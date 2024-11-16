export const parseTemplate = <T extends Record<string, unknown>>(
  template: string,
  variables: T,
): string => {
  const parsedString = template.replace(/{(.*?)}/g, (_, key: string) => {
    if (key.includes('?')) {
      const [condition, truthy, falsy] = key.split(/[?:]/).map(part => part.trim())

      const value = Boolean(variables[condition])

      const cleanTruthy = truthy.replace(/^['"](.*)['"]$/, '$1')
      const cleanFalsy = falsy.replace(/^['"](.*)['"]$/, '$1')

      return value ? cleanTruthy : cleanFalsy
    }

    return variables[key] !== undefined ? String(variables[key]) : ''
  })

  return capitalizeFirstLetter(parsedString)
}

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}
