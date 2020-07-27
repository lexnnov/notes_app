<template>
    <div class="container">

        <btn :onClick="addNote" title="ADD NOTE"/>

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
	import Btn from '@/components/Btn/Btn'

	export default {
		name: 'Home',
		components: { Btn, Note },

		mounted() {
			this.$store.dispatch('init');
		},
		computed: {
			notes() {
				return this.$store.getters.getNotes
			}
		},
		methods: {
			editNote(note) {
				this.$router.push({ name: 'edit', path: `edit/${ note.id }`, params: note });
			},
			viewNote(note) {
				this.$router.push({ name: 'view', path: `view/${ note.id }`, params: note });
			},
			addNote() {
				this.$router.push('/create')
			},
			removeNote(removeTask) {
				this.$store.dispatch('setNoteIdForRemove', removeTask)
				this.$store.dispatch('setModal', { modalOpen: true, data: { title: 'REMOVE THE NOTE?', content: '', controls: [ 'CANCEL', 'REMOVE' ] } })
			}
		}
	}
</script>

<style lang="scss">

    .note {
        margin-bottom: 20px;
    }

</style>