import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map'

// TODO: figure out how to intergate stylised components
// TODO: figure out how to handle the EUR and EUR error

const AmountDisplay = styled.h3
`
    font-size: 28px;
    color: green;
`

const InnerWrapper = styled.section
`
    background-color: #99ccff;
`


const Currency= () =>{

  const [amount, setAmount]= useState(1);
  const [newAmount, setNewAmount]= useState(1);
  const [currencyOptions, setCurrencyOptions]= useState([]);
  const [rate, setRate]= useState();
  const [toCurrency, setToCurrency]=useState();
  const [fromCurrency, setFromCurrency]= useState();
  const [errorMessage, setErrorMessage]=useState('');
  //initalizes the states for the various variables.

  const BASE_URL='https://api.exchangeratesapi.io/latest'


//used for the inital load
  useEffect(()=>{

    const money = async() =>{

        const{data} = await axios.get(BASE_URL)



        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        const firstCurrency= Object.keys(data.rates)[0];
        console.log("First currency: " +firstCurrency);
        setRate(data.rates[firstCurrency]);
        setToCurrency(data.base);
        setFromCurrency(firstCurrency);
        setNewAmount(amount*rate);
        console.log("Amount: "+amount);
        console.log("New Amount: "+newAmount);





    };

    money();

	}, []);


  //used for updating the rate of the currency by having a helper function get data from the API
  // useEffect is called anytime when the amount, currency options or rate changes
  //makes sure that the currency states aren't null befor calling the API
    useEffect(() => {

      const rateChange = async() =>{

        try{
          if (fromCurrency != null && toCurrency != null) {
            const {data} = await axios.get(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`);
                console.log("From currency: "+fromCurrency);
                console.log("To currency: "+toCurrency);
                console.log(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`);
                console.log("Data base: "+data.base);
                console.log(data.rates[toCurrency]);
                setRate(data.rates[toCurrency]);
                console.log("Current rate: "+ rate);
                setNewAmount(amount*rate);
                console.log("New amount: "+ newAmount);
                setErrorMessage("")
              //after a successful call, sets the errorMessage to blank
          }
        }catch (e) {
      		setErrorMessage(e.message);
      		  if(toCurrency=== "EUR" && fromCurrency==="EUR")
            {
              setErrorMessage(e.message + ": Cannot get request from EUR to EUR symbol")
            }
      }
      //catches errors such as when the EUR to EUR covertion returns a bad request



    };
      rateChange();

  }, [fromCurrency, toCurrency, amount, newAmount, rate]);

  //if the selected currency has the symbol to the right of the Amount
  // the function will return the Obtained symbol to the right of the amount as well
    function symbolDisplay(){
          if(fromCurrency==="SEK"|| fromCurrency==="TRY"||
            fromCurrency==="THB" || fromCurrency==="CZK"||
            fromCurrency==="HUF" || fromCurrency==="RUB"|| fromCurrency==="RON")
            return(amount + getSymbolFromCurrency(fromCurrency));

          else {
            return(getSymbolFromCurrency(fromCurrency)+amount);
          }

    }


    function newSymbol() {
            if(toCurrency==="SEK"|| toCurrency==="TRY"||
              toCurrency==="THB" || toCurrency==="CZK"||
              toCurrency==="HUF" || toCurrency==="RUB"|| toCurrency==="RON")
              return(newAmount + getSymbolFromCurrency(toCurrency));

            else {
              return(getSymbolFromCurrency(toCurrency)+newAmount);
            }



    }




    return (
    <InnerWrapper>
      <div
      className="ui segment"
      style={
        { padding: '10px',
          outlineStyle: 'solid',
          outlineColor:'#26c6da',
          minWidth:'400px',
        }}>
        <h1>Currency Converter</h1>
        <input
          value={amount}
          onChange={(e)=> setAmount(e.target.value)}
          className="input"
          placeholder="Enter an amount of money"
          type="number"
        />
            <AmountDisplay>
                        {symbolDisplay()}  {fromCurrency} = {newSymbol()} {toCurrency}
            </AmountDisplay>
                      Currency to be converted from:
            <div className="option">
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                  <option key={option} value={option}>
                      {option}
                  </option>
                ))}
              </select>
            </div>
              Currency to be converted into:
            <div className="option">
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
          </div>
              <div>
                {errorMessage}
              </div>
      </div>
    </InnerWrapper>


    );


}





export default Currency;
