import { useEffect, useState } from "react";
import { SceneContext } from "../../SceneContext";
import { CameraUtils } from "../CameraUtils";
import { InputStyle } from "./ViewMenuStyles";
import CountArrays from "./CountArrays";

export default function ViewMenuInputSpheric() {
    const [cameraValuesSpheric, setCameraValuesSpheric] = useState({
        PHI: +CameraUtils.phi().toFixed(0),
        THETA: +CameraUtils.theta().toFixed(0)
    })

    const setAnglePhi = () => {
        CameraUtils.setPhi(cameraValuesSpheric.PHI)
    }
    const setAngleTheta = () => {
        CameraUtils.setTheta(cameraValuesSpheric.THETA)
    }

    useEffect(() => {
        const endHandler = () => {
            setCameraValuesSpheric({
                PHI: +CameraUtils.phi().toFixed(0),
                THETA: +CameraUtils.theta().toFixed(0)
            })
        };

        SceneContext.OP3D_SCENE.op3dCameraController.cameraControls.addEventListener('update', endHandler);

        return () => {
            SceneContext.OP3D_SCENE.op3dCameraController.cameraControls.removeEventListener('update', endHandler);
        };
    }, []);

    const handleChange = (event, value) => {
        if (isNaN(event.target.value) || event.target.value.includes('-')) return
        setCameraValuesSpheric(prevValue => ({ ...prevValue, [value]: event.target.value }))
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
            case 'PHI':
                setAngleFunction = (value) => CameraUtils.setPhi(value)
                break;
            case 'THETA':
                setAngleFunction = (value) => CameraUtils.setTheta(value,)
                limit = 180
                break;
        }
        let aValue = +value + 1
        if (limit && +value === limit) {
            return
        }
        setCameraValuesSpheric(prevValue => ({ ...prevValue, [valueType]: aValue }))
        setAngleFunction(aValue)
    }
    const decrement = (value, valueType) => {
        let setAngleFunction, limit
        switch (valueType) {
            case 'PHI':
                setAngleFunction = (value) => CameraUtils.setPhi(value)
                break;
            case 'THETA':
                setAngleFunction = (value) => CameraUtils.setTheta(value)
                limit = 180
                break;
        }
        let aValue = +value - 1
        if (limit && +value === 0) {
            return
        }
        setCameraValuesSpheric(prevValue => ({ ...prevValue, [valueType]: aValue }))
        setAngleFunction(aValue)
    }

    return (
        <InputStyle justifycontent="unset">
            <label htmlFor="x-pos" style={ { width: '30%', display: 'flex' } }>
                <p >Θ:</p>
                <input
                    onChange={ (event) => handleChange(event, 'THETA') }
                    onKeyDown={ (event) => handleKeyDown(event, 'THETA') }
                    onBlur={ setAngleTheta }
                    style={ { width: '100%' } }
                    name='x-pos' value={ cameraValuesSpheric.THETA } />
                <CountArrays
                    increment={ increment }
                    valueType='THETA'
                    value={ cameraValuesSpheric.THETA }
                    decrement={ decrement } />
            </label>
            <label htmlFor="y-pos" style={ { width: '30%', display: 'flex' } }>
                <p>Φ:</p>
                <input
                    onChange={ (event) => handleChange(event, 'PHI') }
                    onKeyDown={ (event) => handleKeyDown(event, 'PHI') }
                    onBlur={ setAnglePhi }
                    style={ { width: '100%' } }
                    name='y-pos' value={ cameraValuesSpheric.PHI } />
                <CountArrays
                    increment={ increment }
                    valueType='PHI'
                    value={ cameraValuesSpheric.PHI }
                    decrement={ decrement } />
            </label>
        </InputStyle>
    )
}
