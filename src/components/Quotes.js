import { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { getQuotes } from "../store/quotes/actions";
import { selectQuotes, selectQuotesError, selectQuotesLoading } from "../store/quotes/selectors";
import './Quotes.css';

export default function Quotes() {
    const dispatch = useDispatch();
    const quotesList = useSelector(selectQuotes, shallowEqual);
    const error = useSelector(selectQuotesError, shallowEqual);
    const loading = useSelector(selectQuotesLoading, shallowEqual);

    const reload = () => {
        dispatch(getQuotes());
    }

    useEffect(() => {
        reload();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="quotes">
            <h2>Some Game of Thrones quotes</h2>
            {loading && <CircularProgress />}
            {error ? (
                <div className="quotes__error">
                    <h3>Error: {error}</h3>
                    <Button variant="contained" color="secondary" onClick={reload}>Refresh</Button>
                </div>
            ) : (
                <div className="quotes__text">
                    {quotesList.map((quote, idx) => <p key={idx}>{quote.quoteText}<span>{quote.quoteAuthor}</span></p>)}
                </div>
            )}
        </div>
    )
}