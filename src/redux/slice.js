import { createSlice } from '@reduxjs/toolkit';
import {
  authUser,
  createPost,
  createUser,
  getAllPosts,
  getLike,
  logOut,
  addComment,
  updateAvatar,
} from '../redux/operations';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: '',
    email: '',
    avatar: null,
    id: null,

    isLogged: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    updateUserCredential(state, action) {
      handleAuthFulfilled(state, action);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, handlePending)
      .addCase(createUser.fulfilled, handleAuthFulfilled)
      .addCase(createUser.rejected, handleRejected)

      .addCase(authUser.pending, handlePending)
      .addCase(authUser.fulfilled, handleAuthFulfilled)
      .addCase(authUser.rejected, handleRejected)

      .addCase(updateAvatar.pending, handlePending)
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload.url;
      })
      .addCase(updateAvatar.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(logOut.rejected, handleRejected);
  },
});

export const { updateUserCredential } = userSlice.actions;

function handlePending(state) {
  state.isLoading = true;
}

function handleAuthFulfilled(state, action) {
  state.login = action.payload.login;
  state.email = action.payload.email;
  state.avatar = action.payload.url;
  state.id = action.payload.id;

  state.isLogged = true;
  state.isLoading = false;
  state.error = null;
}

function handleLogOutFulfilled(state) {
  state.login = '';
  state.email = '';
  state.avatar = null;
  state.id = '';

  state.isLogged = false;
  state.isLoading = false;
  state.error = null;
}

function handleRejected(state, action) {
  state.isLogged = false;
  state.isLoading = false;
  state.error = action.payload;
}

// createPost

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: true,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(createPost.pending, () => {})
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, () => {})

      .addCase(getAllPosts.pending, () => {})
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, () => {})

      .addCase(getLike.pending, () => {})
      .addCase(getLike.fulfilled, (state, action) => {
        const post = state.posts.find(
          post => post.creationTime === action.payload.id
        );
        post.likes
          ? post.likes.push(action.payload.email)
          : (post.likes = [action.payload.email]);
      })
      .addCase(getLike.rejected, () => {})

      .addCase(addComment.pending, () => {})
      .addCase(addComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          post => post.creationTime === action.payload.id
        );
        post.comments
          ? post.comments.push(action.payload)
          : (post.comments = [action.payload]);
      })
      .addCase(addComment.rejected, () => {});
  },
});

export const userReducer = userSlice.reducer;
export const postReducer = postSlice.reducer;
