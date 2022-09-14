export const profile = state => state.profile;

export const userLoading = state => state.profile.request.status === 1;

export const userFailure = state => state.profile.request.error;

export const userAdmin = state => state.profile.user.role === 'admin';
