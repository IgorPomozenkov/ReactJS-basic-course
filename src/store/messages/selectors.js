export const selectMessages = state => state.messages.messagesList;

export const MessagesLoading = state => state.messages.request.status === 1;

export const MessagesFailure = state => state.messages.request.error;
