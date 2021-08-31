import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinContext = React.createContext<any>({
    //this is the initial "state"
    coinName: {}, // stores an object {..,btc: "bitcoin",... "xrp":ripple,...}
    coinTickerArray: [], //stores a list of all the tickers available [....,"ada",..."btc",..."xrp"...]
});



export const CoinContextProvider = (props: any) => {
    const [coinName, setCoinName] = useState<any>({})
    const [coinTickerArray, setCoinTickerArray] = useState<any>([])


    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then((res) => {

                let coinNameHolder: any = {};
                res.data.map((i: any) => {
                    coinNameHolder[i.symbol] = i.id;
                    return "hello"
                })
                setCoinName(coinNameHolder)

                const coinTickerArrayHolder = res.data.map((i: any) => {
                    return i.symbol.toUpperCase()
                })
                setCoinTickerArray(coinTickerArrayHolder)

            })

    }, [])


    const contextValue = {
        coinName: coinName,
        coinTickerArray: coinTickerArray
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )




}



export default CoinContext