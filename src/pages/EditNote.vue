<template>
    <div class="container">
        <Dialog @remove="confirmRemove"/>

        <Button :onClick="goHome" title="BACK TO NOTES"/>

        <note
                :note="note"
                :readonly="false"
                :controls="['REMOVE','ADD TASK', 'UNDO', 'REDO', 'SAVE']"
                @saveNote="saveNote"
                @removeNote="removeNote"
                @removeTask="removeTask"
                @addTask="addTask"
                @undo="undo"
                @redo="redo"
        />
    </div>

</template>

<script>
	import Button from '@/components/Button/Button';
	import Dialog from '@/components/Dialog/Dialog';
	import Note from '@/components/Note/Note';
	import { generateId } from '@/helpers';

	export default {
		name: 'EditNote',
		components: { Dialog, Note, Button },
		data() {
			return {
				note: {
					title: '',
					tasks: []
				},
				qwer: {
					title: '',
					tasks: []
				},
				rweq: {
					title: '',
					tasks: []
				}
			}
		},
		mounted() {
			if (localStorage.notes) {
				this.$store.dispatch('init');
				this.note = this.$store.state.notes.find(el => el.id == this.$route.params.id)
				this.qwer = { ...this.note }
			}

		},

		methods: {

			goHome() {
				this.$store.dispatch('setDialog', {
					isOpen: true,
					title: 'BACK TO HOME?',
					content: 'Changes will not be saved',
					route: '/',
					controls: [ 'CANCEL', 'OK' ]
				})
				this.$store.dispatch('updateModal', true)
			},
			removeNote() {
				this.$store.dispatch('setDialog', {
					title: 'REMOVE THE NOTE?',
					content: 'Are you sure you want to delete the note?',
					controls: [ 'CANCEL', 'REMOVE' ]
				})
				this.$store.dispatch('updateModal', true)
			},
			confirmRemove() {
				this.$store.dispatch('removeNote', this.note.id);
				this.$store.dispatch('updateModal', false);
				this.$router.push('/');
			},
			addTask() {
				const id = generateId()
				this.note.tasks = [ ...this.note.tasks, { title: '', id: id, state: false } ]
				this.$store.dispatch('setUndo', true)
			},

			removeTask(removeTask) {
				this.note.tasks = this.note.tasks.filter(task => task.id != removeTask.id)
				this.$store.dispatch('setUndo', true)
			},
			saveNote() {
				this.$store.dispatch('saveNote', { id: this.note.id, tasks: this.note.tasks, title: this.note.title });
				this.$router.push('/')
				this.$store.dispatch('setUndo', false)
				this.$store.dispatch('setRedo', false)
			},
			undo(qw) {
				if (qw) {
					this.rweq = { ...this.note }
					this.note = { ...this.qwer }
					this.note.canRedo = true
					this.$store.dispatch('setUndo', false)
					this.$store.dispatch('setRedo', true)
				}
			},
			redo(qw) {
				if (qw) {
					this.note.tasks = this.rweq.tasks
					this.note.title = this.rweq.title
					this.$store.dispatch('setRedo', false);
					this.$store.dispatch('setUndo', true)
					this.note.canRedo = false
				}

			}
		}
	}
</script>

<style scoped>

</style>