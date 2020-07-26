<template>
    <div class="container">
        <Dialog @remove="confirmRemove"/>

        <Button :onClick="goHome" title="BACK TO NOTES"/>

        <note :note="note" :readonly="false" @saveNote="saveNote" @removeNote="removeNote" @removeTask="removeTask"
              @addTask="addTask"
              :controls="['REMOVE', 'UNDO', 'REDO', 'SAVE']"/>
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
					tasks: [],
				},
				idNoteForRemove: ''
			}
		},
		mounted() {
			if (localStorage.notes) {
				this.$store.dispatch('init');
				this.note = this.$store.state.notes.find(el => el.id == this.$route.params.id)
			}
		},


		methods: {
			goHome() {
				this.$store.dispatch('setDialog', {
					isOpen: true,
					title: 'BACK TO HOME?',
					content: 'Изменения не будут сохранены',
					route: '/',
					controls: [ 'CANCEL', 'OK' ]
				})
				this.$store.dispatch('updateModal', true)
			},
			removeNote(id) {
				this.idNoteForRemove = id
				this.$store.dispatch('setDialog', { title: 'REMOVE THE NOTE?', content: '', controls: [ 'CANCEL', 'REMOVE' ] })
				this.$store.dispatch('updateModal', true)
			},
			confirmRemove() {
				this.$store.dispatch('removeNote', this.idNoteForRemove);
				this.$store.dispatch('updateModal', false);
				this.idNoteForRemove = '';
				this.$router.push('/');
			},
			addTask() {
				this.note.tasks = [ ...this.note.tasks, { title: '', id: generateId(), state: false } ]
			},
			removeTask(removeTask) {
				this.note.tasks = this.note.tasks.filter(task => task.id != removeTask.id)
			},
			saveNote() {
				this.$store.dispatch('saveNote', { id: this.note.id, tasks: this.note.tasks, title: this.note.title });
				this.$router.push('/')
			},
		}
	}
</script>

<style scoped>

</style>