import React from 'react'
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import styled from 'styled-components';

function Color(props){

  //const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);



  const Collection=styled.div
  `
    background-color: ${props.divColor};
    display:flex;
    height: 100px;
    width: 200px;
  `

  const ColorText=styled.h4
`
    color:white;
    mix-blend-mode: difference;
`

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    console.log("Is Copied: "+isCopied);
    alert("Color copied onto clipboard")
  };

  return(
    <CopyToClipboard text={props.divColor} onCopy={onCopyText}>
    <Collection>
          <ColorText>
          {props.divColor}
          <span>{isCopied ? "Copied!" : <MdContentCopy />}</span>
          </ColorText>
    </Collection>
    </CopyToClipboard>
  );

}


export default Color;
/*
<CopyToClipboard text={props.divColor} onCopy={onCopyText}>
<div
style={{backgroundColor: props.divColor,
  display:"flex",
  height:"100px",
  paddingTop:"16px"
}}

>
 {props.divColor}
 <span>{isCopied ? "Copied!" : <MdContentCopy />}</span>
</div>
</CopyToClipboard>
*/
