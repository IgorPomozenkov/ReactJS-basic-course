import { REQUEST_STATUS } from "../../utils/constants";

export const selectQuotes = state => state.quotes.list;
export const selectQuotesError = state => state.quotes.request.error;
export const selectQuotesLoading = state => state.quotes.request.status === REQUEST_STATUS.PENDING;