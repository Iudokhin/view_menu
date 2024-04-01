import { useState } from "react"
import ViewMenuHeader from "./ViewMenuHeader"
import ViewMenuBlock from "./ViewMenuBlock"
import { eViewTypeXYZ } from "../../absSceneCube"
import { SceneContext } from "../../SceneContext"
import Draggable from "react-draggable"
import { MenuStyles } from "./ViewMenuStyles"


export enum eViewMenuState {
    XYZ = "XYZ",
    SPHERIC = "θφ"
}
export const eXYZMenu = {
    ISO: 'Isometric View',
    XY: 'Orthographic XY View',
    YZ: 'Orthographic YZ View',
    ZY: 'Orthographic XZ View',
    FOUR_VIEW: '4 panes'
}
export const eSphericMenu = {
    ISO: 'Isometric View',
    XY: 'Orthographic front View',
    YZ: 'Orthographic right View',
    ZY: 'Orthographic top View',
    FOUR_VIEW: '4 panes'
}

export function ViewMenu({ toggleModal }) {
    const [viewMenuState, setViewMenuState] = useState(SceneContext.CURRENT_VIEW.mode)
    const [, setCurrentView] = useState(eViewTypeXYZ.ISO_VIEW)

    const handleMenuState = (pViewMenuState: eViewMenuState) => {
        SceneContext.CURRENT_VIEW.mode = pViewMenuState
        setViewMenuState(pViewMenuState)
    }

    const eViewStateList = {
        [eViewMenuState.XYZ]: <ViewMenuBlock menuData={ eXYZMenu } setView={ setCurrentView } />,
        [eViewMenuState.SPHERIC]: <ViewMenuBlock menuData={ eSphericMenu } setView={ setCurrentView } />
    }

    return (
        <Draggable
            cancel="input"
        >
            <MenuStyles className="menu">
                <ViewMenuHeader changeMenuState={ [viewMenuState, handleMenuState] } toggleModal={ toggleModal } />
                { eViewStateList[viewMenuState] }
            </MenuStyles>
        </Draggable >
    )
}
