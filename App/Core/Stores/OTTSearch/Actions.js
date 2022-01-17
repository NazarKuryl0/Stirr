import { GET_SUGGESTIONS_LIST, CLEAR_SUGGESTIONS_LIST } from './Constants';

export const getSuggestionsList = (value) => ({
  type: GET_SUGGESTIONS_LIST,
  value,
});

export const clearSuggestionsList = () => ({
  type: CLEAR_SUGGESTIONS_LIST,
});
