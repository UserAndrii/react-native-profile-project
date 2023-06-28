import { createSelector } from 'reselect';

export const selectUser = state => state.user;
export const selectLogin = state => state.user.login;
export const selectEmail = state => state.user.email;
export const selectAvatar = state => state.user.avatar;
export const selectUserId = state => state.user.id;

export const selectIsLogged = state => state.user.isLogged;
export const selectIsLoading = state => state.user.isLoading;
export const selectErrorMessage = state => state.user.error;

export const selectAllPosts = state => state.posts.posts;

export const selectPost = id =>
  createSelector(selectAllPosts, posts => {
    const post = posts.find(post => post.creationTime === id);
    return post ? post.comments : [];
  });

export const selectUsersPosts = email =>
  createSelector(selectAllPosts, posts =>
    posts.filter(post => post.email === email)
  );
