import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "./userServices.js";

const initialState = {
  success: false,
  message: "",
  errors: [],
  statusCode: 0,
  statusName: "",
  loading: false,
  users: [],
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  userByID: {},
};

export const getUserThunk = createAsyncThunk(
  "User/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserThunk = createAsyncThunk(
  "User/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createUser(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserByIdThunk = createAsyncThunk(
  "User/getUserById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getUserById(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserByThunk = createAsyncThunk(
  "User/updateUserMemberById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserById(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUserByIdThunk = createAsyncThunk(
  "User/deleteUserById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await deleteUserById(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.users = payload.data;
      state.userByID = {};
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.success = false;
      state.loading = false;
    });

    builder.addCase(createUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserThunk.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.isCreated = true;
      state.isDeleted = false;
      state.isUpdated = false;
      state.userByID = {};
      state.errors = [];
    });
    builder.addCase(createUserThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.errors = payload.errors;
    });

    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserByIdThunk.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.userByID = payload.data;
      state.users = [];
      state.errors = [];
    });
    builder.addCase(getUserByIdThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });

    builder.addCase(updateUserByThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserByThunk.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = true;
      state.errors = [];
    });
    builder.addCase(updateUserByThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.errors = payload.errors;
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });

    builder.addCase(deleteUserByIdThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteUserByIdThunk.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = true;
      state.isUpdated = false;
    });
    builder.addCase(deleteUserByIdThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.errors = payload.errors;
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });
  },
});

// export const getMembersList = (state) => {
//   return state.team?.projects;
// };
// export const isMemberCreated = (state) => {
//   return state.team?.isCreated;
// };
// export const isMemberDeleted = (state) => {
//   return state.team?.isDeleted;
// };
// export const isMemberUpdated = (state) => {
//   return state.team?.isUpdated;
// };
// export const getOneMember = (state) => {
//   return state.team?.memberByID;
// };
// export const getTeamsErrors = (state) => {
//   return state.team?.errors;
// };
