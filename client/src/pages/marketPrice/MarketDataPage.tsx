import classes from "./MarketDataPage.module.css";
import axios from "axios";
import MarketDataItem from "../../components/marketPage/MarketDataItem";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Fragment } from "react";
import { createImportSpecifier } from "typescript";


const MarketDataPage: React.FC<{}> = () => {
    const baseUrl: String = "https://api.coingecko.com/api/v3/"

    const [dataLoading, setDataLoading] = useState(true)
    const [marketData, setMarketData] = useState<any>([])

    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        getMarketPrice(pageNumber)
    }, [pageNumber])

    const getMarketPrice = (pageNum: any) => {
        const data = axios.get(`${baseUrl}/coins/markets`, {
            params: {
                vs_currency: "usd",
                page: pageNum,
                per_page: 100,
                price_change_percentage: "1h,24h,7d"
            }
        }).then((res => {
            setMarketData(res.data)
            setDataLoading(false)
            return res.data
        })).catch(err => {
            console.log("Error:", err)
        })
    }


    console.log("This is the data", marketData)
    const content = dataLoading ? <LoadingSpinner /> : (marketData
        .map((item: any) =>
            <MarketDataItem
                key={item.symbol}
                rank={item.market_cap_rank}
                name={item.name}
                symbol={item.symbol}
                price={item.current_price}
                hourPriceChange={item.price_change_percentage_1h_in_currency}
                dayPriceChange={item.price_change_percentage_24h_in_currency}
                weekPriceChange={item.price_change_percentage_7d_in_currency}
                marketCap={item.market_cap}
                image={item.image}
            />
        )
    )
    console.log(pageNumber)

    const nextPageHandler = () => {
        setDataLoading(true)
        setPageNumber((prev) => {
            console.log(prev)
            return prev + 1
        })
    }

    const prevPageHandler = () => {
        if (pageNumber > 1) {
            setDataLoading(true)
            setPageNumber((prev) => {
                console.log(prev)
                return prev - 1
            })
        }
    }


    return (
        <div className={classes.body}>
            <span className={pageNumber > 1 ? classes.arrow : [classes.arrow, classes.mute].join(" ")} onClick={prevPageHandler}> &#8592; </span>
            <span>{pageNumber}   </span>
            <span className={classes.arrow} onClick={nextPageHandler}>&#8594;</span>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th colSpan={3}>Coin</th>
                        <th >Ticker</th>
                        <th colSpan={2}>Price</th>
                        <th colSpan={2}>1h</th>
                        <th colSpan={2}>24h</th>
                        <th colSpan={2}>7d</th>
                        <th colSpan={2}>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
            {/* <tr>
                <td>1</td>
                <td>Bitcoin</td>
                <td>btc</td>
                <td>49549</td>
                <td>-0.47366262150166216</td>
                <td>-1.2475545611399328</td>
                <td> 7.643630516756371</td>
                <td>931318608161</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Etheruem</td>
                <td>eth</td>
                <td>3249</td>
                <td>-0.47366262150166216</td>
                <td>-1.2475545611399328</td>
                <td> 7.643630516756371</td>
                <td>531318608161</td>
            </tr> */}

        </div>
    );
};

export default MarketDataPage;