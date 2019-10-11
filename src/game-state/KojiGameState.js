import Koji from '@withkoji/vcc'

const general = Koji.config.general
const fonts = Koji.config.fonts

export default {
    fonts,
    ...general
}