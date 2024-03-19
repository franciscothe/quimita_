import { IconStyle, IconesAvancarVoltar, SideBar } from './styles'
import BookIcon from './Vector.png'
import IconSidebarImage from './icone-sidebar.png'
import IconAvancarpng from './icone-avancar.png'
import IconVoltarpng from './icone-voltar.png'

export const IconBook = () => <IconStyle src={BookIcon} />

export const IconSidebar = () => <SideBar src={IconSidebarImage} />
export const IconAvancar = () => <IconesAvancarVoltar src={IconAvancarpng} />
export const IconVoltar = () => <IconesAvancarVoltar src={IconVoltarpng} />
