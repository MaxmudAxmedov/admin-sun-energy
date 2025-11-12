export const formator = (value) => {
    return new Intl.NumberFormat("uz-UZ").format(value)
}