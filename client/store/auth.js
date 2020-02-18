import axios from 'axios';

export const strict = false

export const state = () => ({
	user: null,
	error: null
})
  
export const mutations = {
	SET_USER( state  , value) {
		state.user = value.success
	},
	SET_ERROR( state  , value) {
		state.error = value
	},
}

export const actions = {
	async login({ commit }) {
		postData( "/users/login" , 'SET_USER' , 'SET_ERROR' , commit , {
			"email": "olivierbretautmail.fr",
			"password": "bak@2560"
		});
	},
}

async function getData( url , mutationType , errorType , commit , payload = {}) {
	try {
    const response = await axios.get("http://0.0.0.0:8081" +url , payload);
    commit( mutationType  , response.data )
  } catch (error) {
    commit( errorType,  error.response.data);
  }
}

async function postData( url , mutationType , errorType , commit , payload = {}) {
	try {
    const response = await axios.post("http://0.0.0.0:8081" +url , payload);
    commit( mutationType  , response.data )
  } catch (error) {
    commit( errorType,  error.response.data);
  }
} 