import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserRequest, UserSearchParams } from '@nemo/common-types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userApi } from '@nemo/common-api';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const getUsers = createAsyncThunk<User[], UserSearchParams>(
  'user/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsersApi(params);
      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      } else {
        throw error;
      }
    }
  }
);

export const createUser = createAsyncThunk<null, UserRequest>(
  'user/createUser',
  async (data, { rejectWithValue }) => {
    try {
      await userApi.createUserApi(data);
      return null;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      } else {
        throw error;
      }
    }
  }
);

export const updateUser = createAsyncThunk<
  null,
  {
    id: string;
    data: UserRequest;
  }
>('user/updateUser', async ({ id, data }, { rejectWithValue }) => {
  try {
    await userApi.updateUserApi(id, data);
    return null;
  } catch (error) {
    if (error) {
      return rejectWithValue(error);
    } else {
      throw error;
    }
  }
});

export const deleteUser = createAsyncThunk<null, string>(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await userApi.deleteUserApi(id);
      return null;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      } else {
        throw error;
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

const userConfig = {
  key: 'user',
  storage,
  whitelist: ['users'],
};

export const userReducer = persistReducer(userConfig, userSlice.reducer);
