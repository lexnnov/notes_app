<template>
    <div class="container">

        <Button :onClick="goHome" title="BACK TO NOTES"/>

        <div class="notes">
            <note
                    :note="note"
                    :readonly="false"
                    :controls="['ADD TASK', 'CREATE']"
                    @removeTask="removeTask"
                    @addTask="addTask"
                    @createNote="createNote"
            />
        </div>
    </div>

</template>

<script>
	import Button from '@/components/Button/Button'
	import Note from '@/components/Note/Note'
	import { generateId } from '@/helpers'

	export default {
		name: 'CreateNote',
		components: { Note, Button },
		data: function () {
			return {
				note: {
					title: '',
					tasks: [],
				}
			}
		},
		methods: {
			createNote() {
				// Проверка на наличие title и хотя бы одной задачи
				if (this.note.title && this.note.tasks.length) {
					this.$store.dispatch('createNote', { id: generateId(), title: this.note.title, tasks: this.note.tasks })
					this.$router.push('/')
				} else {
					this.$store.dispatch('setModal', {
						modalOpen: true,
						data: {
							title: 'All fields must be filled',
							content: 'To create a note, you need to fill in the title and add a task',
							route: '',
							controls: [ 'OK' ]
						}
					})
				}
			},
			addTask() {
				this.note.tasks = [ ...this.note.tasks, { title: '', id: generateId(), state: false } ]
			},
			removeTask(removeTask) {
				this.note.tasks = this.note.tasks.filter(task => task.id !== removeTask.id)
				this.$store.dispatch('setNoteIdForRemove', removeTask.id)
			},
			goHome() {
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped>

</style>