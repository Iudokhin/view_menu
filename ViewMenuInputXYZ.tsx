import { useEffect, useState } from "react";
import { SceneContext } from "../../SceneContext";
import { CameraUtils } from "../CameraUtils";
import { InputStyle } from "./ViewMenuStyles";
import CountArrays from "./CountArrays";


export default function ViewMenuInputXYZ() {
    const [cameraValuesXYZ, setCameraValuesXYZ] = useState(CameraUtils.returnXYZAngles())
    const [prevCameraValuesXYZ, setPrevCameraValuesXYZ] = useState(CameraUtils.returnXYZAngles())

    const setAngleY = (event) => {
        if (+event.target.value === prevCameraValuesXYZ.Y) return
        CameraUtils.setTheta(cameraValuesXYZ.Y)
    }
    const setAngleX = (event) => {
        if (+event.target.value === prevCameraValuesXYZ.X) return
        CameraUtils.setPhi(cameraValuesXYZ.X)
    }
    const setAngleZ = (event) => {
        if (+event.target.value === prevCameraValuesXYZ.Z) return
        let aValue = event.target.value - prevCameraValuesXYZ.Z
        CameraUtils.setPhi(cameraValuesXYZ.X - aValue)
    }

    useEffect(() => {
        const endHandler = () => {
            setCameraValuesXYZ(CameraUtils.returnXYZAngles())
            setPrevCameraValuesXYZ(CameraUtils.returnXYZAngles())
        };

        SceneContext.OP3D_SCENE.op3dCameraController.cameraControls.addEventListener('update', endHandler);
        return () => {
            SceneContext.OP3D_SCENE.op3dCameraController.cameraControls.removeEventListener('update', endHandler);
        };
    }, []);

    const handleChange = (event, value) => {
        if (isNaN(event.target.value) || event.target.value.includes('-')) return
        setCameraValuesXYZ(prevValue => ({ ...prevValue, [value]: event.target.value }))
    }

    const handleKeyDown = (event, value) => {
        if (event.key === "Enter") {
            event.target.blur();
        }

        if (event.key === "ArrowUp") {
            increment(event.target.value, value)
        }
        if (event.key === "ArrowDown") {
            decrement(event.target.value, value)
        }

    };

    const increment = (value, valueType) => {
        let setAngleFunction, limit
        switch (valueType) {
            case 'X':
                setAngleFunction = (value) => CameraUtils.setPhi(value)
                break;
            case 'Y':
                setAngleFunction = (value) => CameraUtils.setTheta(value)
                limit = 180
                break;
            case 'Z':
                setAngleFunction = (value) => {
                    let aValue = value - prevCameraValuesXYZ.Z
                    CameraUtils.setPhi(prevCameraValuesXYZ.X - aValue)
                }
                break
        }
        let aValue = +value + 1
        if (limit && +value === limit) {
            return
        }
        setCameraValuesXYZ(prevValue => ({ ...prevValue, [valueType]: aValue }))
        setAngleFunction(aValue)
    }
    const decrement = (value, valueType) => {
        let setAngleFunction, limit
        switch (valueType) {
            case 'X':
                setAngleFunction = (value) => CameraUtils.setPhi(value)
                break;
            case 'Y':
                setAngleFunction = (value) => CameraUtils.setTheta(value)
                limit = 180
                break;
            case 'Z':
                setAngleFunction = (value) => {
                    let aValue = value - prevCameraValuesXYZ.Z
                    CameraUtils.setPhi(prevCameraValuesXYZ.X - aValue)
                }
                break
        }
        let aValue = +value - 1
        if (limit && +value === 0) {
            return
        }
        setCameraValuesXYZ(prevValue => ({ ...prevValue, [valueType]: aValue }))
        setAngleFunction(aValue)
    }


    return (
        <InputStyle
            justifycontent='space-between'>
            <label htmlFor="x-pos">
                <p style={ { color: '#F63F30' } }>X:</p>
                <input
                    onChange={ event => handleChange(event, 'X') }
                    onKeyDown={ event => handleKeyDown(event, 'X') }
                    onBlur={ setAngleX }
                    style={ { width: '100%' } }
                    name='x-pos'
                    value={ cameraValuesXYZ.X } />
                <CountArrays
                    increment={ increment }
                    valueType='X'
                    value={ cameraValuesXYZ.X }
                    decrement={ decrement } />

            </label>
            <label htmlFor="y-pos" >
                <p style={ { color: '#1BBE1B' } }>Y:</p>
                <input
                    onChange={ (event) => handleChange(event, 'Y') }
                    onKeyDown={ event => handleKeyDown(event, 'Y') }
                    onBlur={ setAngleY }
                    style={ { width: '100%' } }
                    name='y-pos'
                    value={ cameraValuesXYZ.Y } />
                <CountArrays increment={ increment } valueType='Y' value={ cameraValuesXYZ.Y } decrement={ decrement } />
            </label>
            <label htmlFor="z-pos" >
                <p style={ { color: '#1486BD' } }>Z:</p>
                <input
                    onChange={ (event) => handleChange(event, 'Z') }
                    onKeyDown={ event => handleKeyDown(event, 'Z') }
                    onBlur={ setAngleZ }
                    style={ { width: '100%' } }
                    name='z-pos' value={ cameraValuesXYZ.Z } />
                <CountArrays increment={ increment } valueType='Z' value={ cameraValuesXYZ.Z } decrement={ decrement } />
            </label>
        </InputStyle>
    )
}
