export const selectChats = state => state.chats.chatsList;

export const chatsLoading = state => state.chats.request.status === 1;

export const chatsFailure = state => state.chats.request.error;
