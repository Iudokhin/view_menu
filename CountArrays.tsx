
import styled from "styled-components";

export const ArrayBlockStyle = styled.div` 
    line-height:0;          
    background-color:#DEE3E3;
    opacity:0;
    display:flex;
    flex-direction:column;
    i{
        line-height:unset;
        font-size:12px;
        &:hover:before {
            background-color:#c8cccc;
        }
    }
`

export default function CountArrays({ increment, valueType, value, decrement }) {
    return (
        <ArrayBlockStyle>
            <i className="bi bi-caret-up-fill" onClick={ () => increment(value, valueType) }></i>
            <i className="bi bi-caret-down-fill" onClick={ () => decrement(value, valueType) }></i>
        </ArrayBlockStyle>
    )
}
