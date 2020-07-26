<template>
    <div class="container">
        <Dialog @remove="confirmRemove"/>

        <Button :onClick="addNote" title="ADD NOTE"/>

        <div class="notes" v-if="notes.length">
            <note
                v-for="note in notes"
                :key="note.id"
                :note="note"
                :readonly="true"
                :controls="['REMOVE', 'VIEW', 'EDIT']"
                @removeNote="removeNote"
                @editNote="editNote"
                @viewNote="viewNote"
            />
        </div>

        <div v-else>NO NOTES</div>
    </div>
</template>

<script>
	import Note from '@/components/Note/Note'
	import Button from '@/components/Button/Button'
	import Dialog from '@/components/Dialog/Dialog'

	export default {
		name: 'Home',
		components: { Dialog, Button, Note },
		data: function () {
			return {
				idNoteForRemove: ''
			}
		},
		mounted() {
			if (localStorage.notes)
				this.$store.dispatch('init');
		},
		computed: {
			notes() {
				return this.$store.state.notes
			}
		},
		methods: {
			editNote(note) {
				console.log(note)
				this.$router.push({ name: 'edit', path: `edit/${ note.id }`, params: note });
			},
			viewNote(note) {
				this.$router.push({ name: 'view', path: `view/${ note.id }`, params: note });
			},
			addNote() {
				this.$router.push('/create')
			},

			removeNote(id) {
				this.idNoteForRemove = id
				this.$store.dispatch('setDialog', { title: 'REMOVE THE NOTE?', content: '', controls: [ 'CANCEL', 'REMOVE' ] })
				this.$store.dispatch('updateModal', true)
			},
			confirmRemove() {
				this.$store.dispatch('removeNote', this.idNoteForRemove)
				this.$store.dispatch('updateModal', false)
				this.idNoteForRemove = ''
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss">

    .note {
        margin-bottom: 20px;
    }

</style>