export const getContacts = (state) => state.contacts.items;
export const getFilters = (state) => state.filters.value;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

