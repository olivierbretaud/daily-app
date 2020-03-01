import axios from 'axios';
const cookieparser = process.server ? require('cookieparser') : undefined
const cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {
    auth: null,
    error: null,
    userCreated: null
  }
}

export const mutations = {
  SET_AUTH(state, auth) {
    state.auth = auth;
  },
  SET_TOKEN(state, auth) {
    if (auth && auth.token ) {
      cookie.set('auth' , auth.token)
    }
    state.auth = auth.token;
  },
  SET_ERROR( state  , value) {
		state.error = value
  },
  SET_USER_CREATED( state  , value) {
		state.userCreated = value
	},
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      auth = parsed.auth
      commit('SET_AUTH', auth)
    }
  },
  	
	resetAuthErrors({ commit }) {
    commit('SET_ERROR', null );
    commit('SET_USER_CREATED', null);
	},

	async login({ commit } , payload ) {
		postData( "/users/login" , 'SET_TOKEN' , 'SET_ERROR' , commit , payload , false );
  },
  
  async signIn({ commit } , payload ) {
		postData( "/users/register" , 'SET_USER_CREATED' , 'SET_ERROR' , commit , payload , false );
	},

	logout({ commit }) {
		cookie.remove('auth')
    commit('SET_AUTH', null)
    commit('SET_USER_CREATED', null)
	}
}

// GLOBALS REQUESTS

const API_URL = "http://0.0.0.0:8081";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export async function getData( url , mutationType , errorType , commit , payload , requireAuth ) {
  var config = {
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
	try {
    var response = payload ? await axios.get(API_URL + url , payload , requireAuth ? config : null ) : await axios.get(API_URL + url , requireAuth ? config : null );
    commit( mutationType  , response.data )
  } catch (error) {
    commit( errorType,  error.response.data);
  }
}

export async function postData( url , mutationType , errorType , commit , payload  , requireAuth) {
	try {
		const response = await axios.post(API_URL + url , payload , requireAuth ? config : null);
    commit( mutationType  , response.data )
  } catch (error) {
    console.log(error)
    commit( errorType,  error.response.data);
  }
} 