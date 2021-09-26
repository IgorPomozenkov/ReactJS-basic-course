import { PUBLIC_URL } from "../../utils/constants";

export const GET_QUOTES_PENDING = "QUOTES::GET_PENDING";
export const GET_QUOTES_SUCCESS = "QUOTES::GET_SUCCESS";
export const GET_QUOTES_FAILURE = "QUOTES::GET_FAILURE";

const getQuotesPending = () => ({
    type: GET_QUOTES_PENDING,
});

const getQuotesSuccess = (quotes) => ({
    type: GET_QUOTES_SUCCESS,
    payload: quotes
});

const getQuotesFailure = (error) => ({
    type: GET_QUOTES_FAILURE,
    payload: error
});

export const getQuotes = () => (dispatch) => {
    dispatch(getQuotesPending());

    fetch(PUBLIC_URL)
        .then((response) => {
            if(!response.ok) {
                throw new Error(`error ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            dispatch(getQuotesSuccess(result));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getQuotesFailure(e.message));
        })
}