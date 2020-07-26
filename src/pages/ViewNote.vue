<template>
    <div class="container">
        <Dialog @remove="confirmRemove"/>

        <Button :onClick="goHome" title="BACK TO NOTES"/>

        <note
                :note="note"
                :controls="['REMOVE']"
                :readonly="true"
                :view="true"
                @removeNote="removeNote"
        />
    </div>

</template>

<script>
	import Button from '@/components/Button/Button';
	import Dialog from '@/components/Dialog/Dialog';
	import Note from '@/components/Note/Note';

	export default {
		name: 'ViewNote',
		components: { Dialog, Note, Button },
		data() {
			return {
				note: {
					title: '',
					tasks: [],
				}
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
				this.$router.push('/')
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
				this.$store.dispatch('removeNote', this.note.id)
				this.$store.dispatch('updateModal', false)
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped>

</style>