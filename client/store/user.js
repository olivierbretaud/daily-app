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
	async getUser({ commit }) {
		getData('/users/profile' ,  'SET_USER' , 'SET_ERROR', commit , null , true )
	}
}

