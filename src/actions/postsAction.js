// Creo las "actions types"
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

// Creo las "actions creators" que retornen una accion.
// Son funciones que crean acciones.
export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});

// Despacho.
//Consumiendo una API desde determinado componente en un useEffect. (se ejecuta primero)
export function fetchPosts() {
  return async (dispatch) => {
    dispatch(getPosts());

    try {
      const response = await fetch(
        
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`
        
      );
      const data = await response.json();
      const dataWithImage = await Promise.all( data.results.map(async item => {
      const result = await fetch(item.url)
      const resultJson= await result.json()
           
      return {    name: item.name,     image: resultJson.sprites.front_default   } }))

           
           dispatch(getPostsSuccess(dataWithImage));
      
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}


export function fetchPostsByName(name) {
  return async (dispatch) => {
    dispatch(getPosts());
const limit = name== ""? 20 : 151
    try {
      const response = await fetch(
        
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        
      );
      const data = await response.json();
      const dataWithImage = await Promise.all( data.results.map(async item => {
      const result = await fetch(item.url)
      const resultJson= await result.json()
           
      return {    name: item.name,     image: resultJson.sprites.front_default   } }))
        const filterResult = dataWithImage.filter(item => item.name.includes(name))
           
           dispatch(getPostsSuccess(filterResult));
      
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}
