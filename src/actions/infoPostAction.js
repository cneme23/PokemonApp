export const GET_INFO = "GET_INFO";
export const GET_INFO_SUCCESS = "GET_INFO_SUCCESS";
export const GET_INFO_FAILURE = "GET_INFO_FAILURE";

export const getInfoPosts = () => ({
  type: GET_INFO,
});

export const getInfoPostsSuccess = (info) => ({
  type: GET_INFO_SUCCESS,
  payload: info,
});

export const getInfoPostsFailure = () => ({
  type: GET_INFO_FAILURE,
});

export function fetchInfoPosts(name) {
  return async (dispatch) => {
    dispatch(getInfoPosts());

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
       
      );
      const data = await response.json();
      dispatch(getInfoPostsSuccess(data));
    } catch (error) {
      dispatch(getInfoPostsFailure());
    }
  };
}
