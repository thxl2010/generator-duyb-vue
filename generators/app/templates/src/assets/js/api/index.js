import API from './api-client';

export default {
  fetchUserRepositories(param) {
    return API.fetch('/api/fetchUserRepositories', param);
  },
};
