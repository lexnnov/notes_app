<template>
    <div :class="[readonly ? 'note readOnly' : 'note']">
        <div class="note-title">
            <input @input="inputChange" placeholder="Note title" :disabled="readonly" v-model="note.title"
                   type="text"/>
        </div>

        <div :class="taskFilter.length ? 'note-content' : 'note-content note_empty'">
            <transition-group v-if="taskFilter.length" name="fade">
                <task
                    v-for="task in taskFilter"
                    :key="task.id"
                    :readonly="readonly"
                    :task="task"
                    @removeTask="removeTask"
                />
            </transition-group>
            <div v-else>NO TASKS</div>

        </div>

        <div class="note-footer">
            <btn
                v-for="control in controls"
                :key="control"
                :dis="control == 'REDO' ? canRedo : control == 'UNDO' ? canUndo :''"
                :color="control == 'REMOVE' ? 'c51111' : ''"
                :title="control"
                :onClick="
                    control == 'EDIT' ? editNote :
                    control == 'VIEW' ? viewNote :
                    control == 'REMOVE' ? removeNote :
                    control == 'SAVE' ? saveNote :
                    control == 'UNDO' ? undo :
                    control == 'REDO' ? redo :
                    control == 'ADD TASK' ? addTask :
                    createNote
            "/>
        </div>

    </div>
</template>

<script>
	import Btn from '@/components/Btn/Btn';
	import Task from '@/components/Note/Task/Task';

	export default {
		name: 'Note',
		components: { Btn, Task },
		data: function () {
			return {
				tasks: []
			}
		},
		props: {
			note: {
				type: Object,
				required: true
			},
			readonly: {
				type: Boolean,
				required: true
			},
			view: {
				type: Boolean
			},
			controls: {
				type: Array,
				required: true
			}
		},
		computed: {
			// Отображать на главной только 3 задачи
			taskFilter: function () {
				if (this.readonly && !this.view)
					return this.note.tasks.slice(0, 3)
				else
					return this.note.tasks
			},
			canRedo: function () {
				return this.$store.getters.getCanRedo
			},
			canUndo: function () {
				return this.$store.getters.getCanUndo
			}
		},

		methods: {

			// Работа с заметкой
			editNote() {
				this.$emit('editNote', this.note)
			},
			viewNote() {
				this.$emit('viewNote', this.note)
			},
			createNote() {
				this.$emit('createNote')
			},
			saveNote() {
				this.$emit('saveNote', this.note.id)
			},
			removeNote() {
				this.$emit('removeNote', this.note.id)
			},

			// Работа с задачами
			addTask() {
				this.$emit('addTask', this.note.id)
			},
			removeTask(task) {
				this.$emit('removeTask', task)
			},

			// Функции отмены изменений
			undo() {
				this.$emit('undo', this.canUndo)
			},
			redo() {
				this.$emit('redo', this.canRedo)
			},

			inputChange() {
				this.$emit('inputChange', this.canRedo)
			}
		}
	}
</script>

<style lang="scss" scoped>

    .readOnly input[type=text] {
        border: none;
    }

    input[type=text] {
        transition: all 0.30s ease-in-out;
        outline: none;
        padding: 3px 0px 3px 3px;
        margin: 5px 1px 3px 20px;
        border: none;
        background-color: transparent;
        border-bottom: 1px solid white;
        color: white;

        &:focus {
            padding: 3px 0px 3px 3px;
            border-bottom: 1px solid #006d63;
        }

        &::placeholder {
            color: #d5d5d5;
        }
    }


    .note {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 200px;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
        border-radius: 2px;

        &-title {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            height: 50px;
            background-color: #009688;
            border-radius: 2px 2px 0 0;

            p {
                text-align: left;
                color: white;
                padding-left: 20px;
            }
        }

        &-content {
            flex: 1 0 auto;
            padding: 20px;
        }

        &-footer {
            flex: 0 0 auto;
            border-top: 1px solid #DBDBDB;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            color: #009688;
        }

        &_empty {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .task:last-child {
        margin-bottom: 0;
    }

</style>