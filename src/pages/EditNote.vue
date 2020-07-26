<template>
    <div class="container">

        <Button :onClick="goHome" title="BACK TO NOTES"/>

        <note
                :note="note"
                :readonly="false"
                :controls="['REMOVE','ADD TASK', 'UNDO', 'REDO', 'SAVE']"
                @saveNote="saveNote"
                @removeNote="removeNote"
                @removeTask="removeTask"
                @addTask="addTask"
                @inputChange="inputChange"
                @undo="undo"
                @redo="redo"
        />
    </div>

</template>

<script>
	import Button from '@/components/Button/Button';
	import Note from '@/components/Note/Note';
	import { generateId } from '@/helpers';

	export default {
		name: 'EditNote',
		components: { Note, Button },
		data() {
			return {
				note: {
					title: '',
					tasks: []
				},
				noteCopies: [ {
					title: '',
					tasks: []
				}, {
					title: '',
					tasks: []
				} ],

			}
		},
		mounted() {
			this.$store.dispatch('init');
			this.note = this.$store.state.notes.find(el => el.id == this.$route.params.id)
			this.noteCopies[ 0 ] = { ...this.note }
		},

		methods: {

			goHome() {
				this.$store.dispatch('setModal', {
					modalOpen: true, data: {
						title: 'BACK TO HOME?',
						content: 'Changes will not be saved',
						route: '/',
						controls: [ 'CANCEL', 'OK' ]
					}
				})
			},

			saveNote() {
				this.$store.dispatch('saveNote', { id: this.note.id, tasks: this.note.tasks, title: this.note.title });
				this.$store.dispatch('setCanUndo', false)
				this.$store.dispatch('setCanRedo', false)
				this.$router.push('/')
			},
			removeNote(removeTask) {
				this.$store.dispatch('setModal', {
					modalOpen: true,
					data: {
						title: 'REMOVE THE NOTE?',
						content: 'Are you sure you want to delete the note?',
						controls: [ 'CANCEL', 'REMOVE' ]
					}
				})
				this.$store.dispatch('setNoteIdForRemove', removeTask)
			},

			addTask() {
				const id = generateId()
				this.note.tasks = [ ...this.note.tasks, { title: '', id: id, state: false } ]
				this.$store.dispatch('setCanUndo', true)
			},
			removeTask(removeTask) {
				this.note.tasks = this.note.tasks.filter(task => task.id != removeTask.id)
				this.$store.dispatch('setCanUndo', true)
			},

			undo(canUndo) {
				if (canUndo) {
					this.noteCopies[ 1 ] = { ...this.note }
					this.note = { ...this.noteCopies[ 0 ] }
					this.$store.dispatch('setCanUndo', false)
					this.$store.dispatch('setCanRedo', true)
				}
			},
			redo(canRedo) {
				if (canRedo) {
					this.note = { ...this.noteCopies[ 1 ] }
					this.$store.dispatch('setCanRedo', false)
					this.$store.dispatch('setCanUndo', true)
				}
			},

			inputChange() {
				this.$store.dispatch('setCanUndo', true)
			}
		}
	}
</script>

<style scoped>

</style>