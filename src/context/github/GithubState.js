import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Netlify Requests

  // Search User
  const searchUsers = async text => {
    setLoading();

    const res = await fetch(
      `../../../.netlify/functions/fetch-github?path=/search/users?q=${text}`
    );

    const data = await res.json();

    dispatch({
      type: SEARCH_USERS,
      payload: data.items,
    });
  };

  // Get User
  const getUser = async username => {
    setLoading();

    const res = await fetch(
      `../../../.netlify/functions/fetch-github?path=/users/${username}`
    );

    const data = await res.json();

    dispatch({
      type: GET_USER,
      payload: data,
    });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading();

    const res = await fetch(
      `../../../.netlify/functions/fetch-github?path=/users/${username}/repos?per_page=5&sort=created:asc`
    );

    const data = await res.json();

    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
