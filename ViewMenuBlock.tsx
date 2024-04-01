import Dropdown from "react-bootstrap/Dropdown";
import { eViewTypeXYZ } from "../../absSceneCube";
import { CameraUtils } from "../CameraUtils";
import { DropDownBtnStyle } from "./ViewMenuStyles";


export default function ViewMenuBlock({ menuData, setView }) {

  const changeView = async (event) => {
    CameraUtils.switchSceneView(event.target.dataset.value)
    setView(event.target.dataset.value)
  }

  return (
    <Dropdown>
      <DropDownBtnStyle>
        <Dropdown.Toggle style={{ display: 'flex', width: '100%', color: '#2e3333', justifyContent: "space-between" }} id="dropdown-basic">
          <div>Choose camera view</div>
          <i className="icon-chevron-down"></i>
        </Dropdown.Toggle>
      </DropDownBtnStyle>

      <Dropdown.Menu style={{ width: '100%' }}>
        <Dropdown.Item onClick={changeView} data-value={eViewTypeXYZ.ISO_VIEW}>{menuData.ISO}</Dropdown.Item>
        <Dropdown.Item onClick={changeView} data-value={eViewTypeXYZ.XY_VIEW}>{menuData.XY}</Dropdown.Item>
        <Dropdown.Item onClick={changeView} data-value={eViewTypeXYZ.YZ_VIEW}>{menuData.YZ}</Dropdown.Item>
        <Dropdown.Item onClick={changeView} data-value={eViewTypeXYZ.XZ_VIEW}>{menuData.ZY}</Dropdown.Item>
        <Dropdown.Item onClick={changeView} data-value={eViewTypeXYZ.FOUR_WINDOW_VIEW}>{menuData.FOUR_VIEW}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
