export const isDigit = (char: string): boolean => {
    return /[\d]/.test(char)
}

export const isWordChar = (char: string): boolean => {
    return /[\w]/.test(char)
}