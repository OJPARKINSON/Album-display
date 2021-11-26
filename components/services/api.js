import { API } from "aws-amplify";
import { getAuth } from "../../graphql/queries";
import { createAuth, updateAuth } from "../../graphql/mutations";

export const getUser = async (id) => {
  const { id, access_token } = await API.graphql(
    graphqlOperation(getAuth, { id })
  );
  return { id, access_token };
};

export const createUser = async (id, access_token) => {
  try {
    await API.graphql(
      graphqlOperation(createAuth, {
        input: {
          id,
          access_token,
        },
      })
    );
  } catch (err) {
    console.warn(err);
  }
  return { id, access_token };
};

export const updateUser = async (id, access_token) => {
  try {
    await API.graphql(
      updateAuth(updateAuth, {
        input: {
          id,
          access_token,
        },
      })
    );
  } catch (err) {
    console.warn(err);
  }
  return { id, access_token };
};
