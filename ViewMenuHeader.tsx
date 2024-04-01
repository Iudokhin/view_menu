import { eViewMenuState } from "./ViewMenu"
import ViewMenuInputXYZ from "./ViewMenuInputXYZ";
import ViewMenuInputSpheric from "./ViewMenuInputSpheric";
import { MenuViewBtnStyle } from "./ViewMenuStyles";

export default function ViewMenuHeader({ changeMenuState, toggleModal }) {

    const handleChangeList = (pViewMenuState: eViewMenuState) => {
        changeMenuState[1](pViewMenuState)
    }

    const aViewMenuInput = {
        [eViewMenuState.SPHERIC]: <ViewMenuInputSpheric />,
        [eViewMenuState.XYZ]: <ViewMenuInputXYZ />,
    }
    return (
        <div >
            <MenuViewBtnStyle >
                <>
                    <div className="title">Mode </div>
                    <div className="headerInput">
                        <label>
                            <input
                                type="radio"
                                name='menuType'
                                checked={ changeMenuState[0] === eViewMenuState.XYZ && true }
                                onChange={ () => { } }
                                className={ `border-0 btn camera-view-opt ${changeMenuState[0] === eViewMenuState.XYZ && 'active'}` }
                                id="menu-button-XYZ"
                                onClick={ () => handleChangeList(eViewMenuState.XYZ) } />XYZ</label>
                        <label>
                            <input type="radio" name='menuType' checked={ changeMenuState[0] === eViewMenuState.SPHERIC && true }
                                onChange={ () => { } }
                                className={ `border-0 btn camera-view-opt ${changeMenuState[0] === eViewMenuState.SPHERIC && 'active'}` }
                                id="menu-button-spheric"
                                onClick={ () => handleChangeList(eViewMenuState.SPHERIC) } />θφ</label>
                    </div>
                </>
                <button
                    onClick={ toggleModal }
                    style={ { marginRight: '-0.2em' } }
                    type="button"
                    className="close" >
                    <i className="icon-close"></i>
                </button>
            </MenuViewBtnStyle>
            { aViewMenuInput[changeMenuState[0]] }
        </div>
    )
}
