import styled from "styled-components";

export const InputStyle = styled.div<{ justifycontent: string }>` 
    display:flex ;
    justify-content:${(props) => (props.justifycontent && props.justifycontent)};
    gap:8px;
    
    label {
        margin:0;
        align-items:center;
        display:flex;
        border:1px solid #BABDBD;
        border-radius: 4px;
        background-color:white;
        padding:0px 8px;
        height:32px;
        &:hover {
            border-color: #23A7DE;
            box-shadow: 0 0 0 0.2rem rgb(35 167 222 / 30%);
            div{
                opacity:1;
            }
        }
    }
    p{
        margin:0;
        z-index:1;
        padding-right:5px;
        
    }
    input{
        border:none;
        outline:none;
    }
`
export const DropDownBtnStyle = styled.div`
 button:hover {
      background-color:#f5f5f5 !important;
 }
 button{
      border:1px solid #959E9E;
      border-radius:4px;
      align-items:center;
 }
`;

export const MenuStyles = styled.div`
    position: absolute;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    bottom: 35px;
    left: 5px;
    width: 336px;
    padding: 8px 16px 16px 16px;
    background-color:#f5f5f5;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.50);
`
export const MenuViewBtnStyle = styled.div`
    display:flex;
    margin-bottom:16px;
    align-items:baseline;
     div.title {
        font-size:14px;
        margin-right:8px;
     }
     div.headerInput {
        display:flex;
        gap:16px;
     }
     input{
        width: 18px;
        height: 18px;
        margin-right:4px;
        filter:brightness(1.5);
        &:hover, &:focus{
            box-shadow:unset;
        }
     }
     button {
        margin-left:auto;
     }
     label{
        margin:0
     }
`