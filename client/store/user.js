import { getData } from './index';

export const strict = false

export const state = () => ({
	user: null,
	error: null
})
  
export const mutations = {
	SET_USER( state  , value) {
		state.user = value
	},
	SET_ERROR( state  , value) {
		state.error = value
	},
}

export const actions = {
	// async nuxtServerInit({ commit }, { req }) {
	// 	let auth = null
	// 	console.log(req.headers.cookie)
  //   if (req.headers.cookie) {
	// 		const parsed = cookieparser.parse(req.headers.cookie)
  //     try {
	// 			auth = JSON.parse(parsed.auth)
  //     } catch (err) {
  //       // No valid cookie found
  //     }
	// 	}
	async getUser({ commit }) {
		getData('/users/me' ,  'SET_USER' , 'SET_ERROR', commit , null , true )
	}

}

