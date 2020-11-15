import { getData ,  putData  , postData , deleteData } from './index';

export const strict = false

export const state = () => ({
	tasksList: null,
	error: null
})
  
export const mutations = {
	GET_TASKS_LIST( state  , value) {
		state.tasksList = value.tasks
	},
	UPDATE_TASK( state  , value) {
		let list = [...state.tasksList];
		const index = list.findIndex((item) => item._id === value.task._id );
		list[index] = value.task
		state.tasksList = list
	},
	CREATE_TASK( state  , value) {
		let list = [...state.tasksList];
		list.unshift(value.task)
		state.tasksList = list
	},
	DELETE_TASK( state  , value) {
		let list = [...state.tasksList];
		state.tasksList = list.filter(item => item._id !== value._id)
	},
	SET_ERROR( state  , value) {
		state.error = value
	},
}

export const actions = {
	async getTasksList({ commit }, user ) {
		getData(`/tasks/${user}` ,  'GET_TASKS_LIST' , 'SET_ERROR', commit , null , true )
	},

	async updateTask({ commit }, payload ) {
		putData(`/tasks/update/${payload._id}` , 'UPDATE_TASK' ,'SET_ERROR' , commit , payload  , true )
	},

	async createTask({ commit }, payload ) {
		postData(`/tasks/create` , 'CREATE_TASK' ,'SET_ERROR' , commit , payload  , true )
	},

	async deleteTask({ commit }, taskId ) {
		deleteData(`/tasks/delete/` , 'DELETE_TASK' ,'SET_ERROR' , commit , taskId , true )
	}
}

