import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';
import { HexColorPicker } from "react-colorful";

import Color from './components/colors.js'
import styled from 'styled-components';
import Wrapper from './components/wrapper.js'


function App() {

    const [color, setColor] = useState("#b32aa9");
    const [colorList,setColorList]=useState([]);
    //const [siteColor, setSiteColor]= useState("#87b329")
    const [term, setTerm]= useState('');


    const ColorDisplay= styled.div
    `
        display:grid;
        grid-template-columns: auto auto auto;
        allign-items:center;
    `




    useEffect(()=>{

          Axios.get("http://localhost:3001/get").then((response) =>{
          setColorList(response.data);
          console.log(response.data);
          console.log("Current Color: "+color);
      });



    }, [color] );



    const submitColor =()=>{
      console.log(color);
      Axios.post("http://localhost:3001/insert", {
        CSSValue: color,
      }).then(()=>{
          alert("Insert succesful!");
        });
      };


      const deleteColor =() =>{
          var check=false;
          colorList.map((value)=>{
          if(value.CSSValue === term)
          { check=true;
            console.log("Check set to "+ check);
          }
        })

        if(check){
          console.log("deleteColor called.");
          Axios.post("http://localhost:3001/delete", {
            CSSValue: term,
          }).then(()=>{
              alert("Deletion succesful!");
            });
        }

        else{alert(term+ " is not in the database");}
      }



      /*const deleteColor =() =>{
        console.log("deleteColor called.");
        Axios.post("http://localhost:3001/delete", {
          CSSValue: term,
        }).then(()=>{
            alert("Deletion succesful!");
          });
      };*/

  return (
  <div className="App" style={{display:"flex", alignItems:"center"}}>
  <div className="ui container"style={{display:"grid", alignItems:"center"}}>
      <Wrapper>
            <ColorDisplay>
              {colorList.map((value)=>{
                return (<Color key={value.CSSValue} divColor={value.CSSValue}/>);
              })}
            </ColorDisplay>
        <h1>Current color is {color}</h1>
        <HexColorPicker color={color} onChange={setColor} />
        <div style={{display:"grid", alignItems:"center"}}>

                <div className="ui form">
                  <div className="input" style={{alignItems:"center"}}>
                    <input value={color} color={color} onChange={setColor} readOnly = {true}/>
                    <Button primary onClick={submitColor}>Submit Color</Button>
                    </div>
                    <div className="delete" style={{alignItems:"center"}}>
                      <input value={term}
                      onChange={(e)=> setTerm(e.target.value)}/>
                      <Button primary onClick={deleteColor}>Delete Color</Button>
                    </div>
                </div>
        </div>
      </Wrapper>
  </div>
  </div>
  );
}

export default App;
