import classes from "./MarketDataItem.module.css";



const MarketDataItem: React.FC<any> = (props) => {

    const formatPrice = (price: any) => {
        if (price > 1) {
            price.toFixed(2)
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        else if (price < 0.00001) {
            return price.toFixed(8)
        }
        else {
            return price
        }
    }
    const formatPercent = (percent: any) => {
        return percent ? percent.toFixed(2) : "N/A"
    }


    return (
        <tr>
            <td>{props.rank}</td>
            <td colSpan={3}><img className={classes.logo} src={props.image} alt={props.asset} ></img>{props.name}</td>
            <td>{props.symbol.toUpperCase()}</td>
            <td colSpan={2}>${formatPrice(props.price)}</td>
            <td colSpan={2} className={props.hourPriceChange < 0 ? classes.negative : classes.positive}>{formatPercent(props.hourPriceChange)}%</td>
            <td colSpan={2} className={props.dayPriceChange < 0 ? classes.negative : classes.positive}>{formatPercent(props.dayPriceChange)}%</td>
            <td colSpan={2} className={props.weekPriceChange < 0 ? classes.negative : classes.positive}>{formatPercent(props.weekPriceChange)}%</td>
            <td colSpan={2}>${formatPrice(props.marketCap)}</td>
        </tr>

    );
};

export default MarketDataItem;
