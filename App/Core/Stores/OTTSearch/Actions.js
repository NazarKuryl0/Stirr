import { GET_SUGGESTIONS_LIST } from './Constants';

export const getSuggestionsList = (value) => ({
  type: GET_SUGGESTIONS_LIST,
  value,
});
