// Inicializo lo que voy a consumir (en este caso los post de la API)
// API: https://jsonplaceholder.typicode.com/posts
/*
-Actualizan el estado de acuerdo a las acciones.-

Un reducers es una función que toma dos
parámetros: "state" y "action". 
Generalmente va a consistir en una declaración switch
que pasa por todos los tipos de acción
posibles.
*/

// Importo las actions
import * as actions from "../actions/postsAction";

// Creo un objeto como estado
export const initialState = {
  posts: [],
  loading: false,
  hasErrors: false,
};

// Funcion reducer
export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_POSTS:
      return { ...state, loading: true };
    case actions.GET_POSTS_SUCCESS:
      return { posts: action.payload, loading: false, hasErrors: false };
    case actions.GET_POSTS_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
}
