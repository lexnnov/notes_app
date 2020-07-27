import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: [],
		modal: {
			data: {
				title: '',
				content: '',
				controls: [],
				route: '',
			},
			modalOpen: false
		},
		noteIdForRemove: '',
		canRedo: false,
		canUndo: false,

	},
	mutations: {

		'SET_NOTES'(state, value) {
			state.notes = value
			localStorage.setItem('notes', JSON.stringify(value))
		},
		'CREATE_NOTE'(state, payload) {
			if (localStorage.getItem('notes'))
				localStorage.setItem('notes', JSON.stringify([ ...JSON.parse(localStorage.notes), {
					id: payload.id,
					title: payload.title,
					tasks: payload.tasks
				} ]))
			else
				localStorage.setItem('notes', JSON.stringify([ {
					id: payload.id,
					title: payload.title,
					tasks: payload.tasks
				} ]))
		},
		'REMOVE_NOTE'(state, payload) {
			state.notes = state.notes.filter(note => note.id != payload)
			localStorage.setItem('notes', JSON.stringify(state.notes))
			state.noteIdForRemove = ''
		},
		'SET_MODAL'(state, value) {
			state.modal = value
		},
		'SET_CAN_UNDO'(state, value) {
			state.canUndo = value
		},
		'SET_CAN_REDO'(state, value) {
			state.canRedo = value
		},
		'SET_REMOVE_ID'(state, value) {
			state.noteIdForRemove = value
		},
		'SAVE_NOTE'(state, payload) {
			state.notes = state.notes.map(note => {
				if (note.id == payload.id) {
					return { ...note, tasks: payload.tasks, title: payload.title }
				} else return note
			})
			localStorage.setItem('notes', JSON.stringify(state.notes))
		}
	},

	actions: {

		init(store) {
			store.commit('SET_NOTES', JSON.parse(localStorage.getItem('notes') || ''))
		},
		createNote(store, payload) {
			store.commit('CREATE_NOTE', payload)
		},
		removeNote(store, payload) {
			store.commit('REMOVE_NOTE', payload)
		},
		saveNote(store, payload) {
			store.commit('SAVE_NOTE', payload)
		},
		setModal(store, payload) {
			store.commit('SET_MODAL', payload)
		},
		setCanUndo(store, payload) {
			store.commit('SET_CAN_UNDO', payload)
		},
		setCanRedo(store, payload) {
			store.commit('SET_CAN_REDO', payload)
		},
		setNoteIdForRemove(store, payload) {
			store.commit('SET_REMOVE_ID', payload)
		}

	},
	getters: {

		getNotes: state => {
			return state.notes
		},
		getModal: state => {
			return state.modal
		},
		getCanUndo: state => {
			return state.canUndo
		},
		getCanRedo: state => {
			return state.canRedo
		},
		getNoteIdForRemove: state => {
			return state.noteIdForRemove
		}

	}
})