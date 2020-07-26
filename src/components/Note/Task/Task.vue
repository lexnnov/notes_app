<template>
    <div :class="[
      type ? 'task readOnly' : 'task',
    ]">
        <div class="checkbox">
            <input @click="shange" class="custom-checkbox" type="checkbox" :id="task.id" name="color-1" value="indigo"
                   v-model="task.state" :disabled="type">
            <label :for="task.id"> <input :disabled="type" :class="{ inactive: complete }" v-model="task.title">
            </label>
        </div>


        <span v-if="!type" @click="remove">X</span>
    </div>
</template>

<script>
	export default {
		name: 'Task',
		props: {
			type: {
				type: Boolean,
			},
			task: {
				type: Object,
			},
			setTask: {
				type: Function
			},
			removeTask: {
				type: Function
			}
		},
		data: function () {
			return {
				complete: this.task.state
			}
		},

		methods: {
			shange() {
				this.complete = !this.complete
				this.setTask(this.task, this.complete)
			},
			remove() {
				this.removeTask(this.task)
			}
		}
	}
</script>

<style scoped>

    .readOnly input {
        border: none;
    }

    .readOnly .custom-checkbox:checked + label::before {
        border-color: #b5b5b5;
    }

    /*.readOnly .custom-checkbox:focus:not(:checked) + label::before {*/
    /*    border-color: #80bdff;*/
    /*}*/


    .custom-checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    /* для элемента label, связанного с .custom-checkbox */
    .custom-checkbox + label {
        display: inline-flex;
        align-items: center;
        user-select: none;
    }

    /* создание в label псевдоэлемента before со следующими стилями */
    .custom-checkbox + label::before {
        content: '';
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #adb5bd;
        border-radius: 0.25em;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
    }

    /* стили при наведении курсора на checkbox */
    .custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
        border-color: #b3d7ff;
    }

    /* стили для активного чекбокса (при нажатии на него) */
    .custom-checkbox:not(:disabled):active + label::before {
        background-color: #b3d7ff;
        border-color: #b3d7ff;
    }

    /* стили для чекбокса, находящегося в фокусе */
    .custom-checkbox:focus + label::before {
    }

    /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
    .custom-checkbox:focus:not(:checked) + label::before {
        border-color: #80bdff;
    }

    /* стили для чекбокса, находящегося в состоянии checked */
    .custom-checkbox:checked + label::before {
        border-color: #009688;
        background-color: #009688;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }

    /* стили для чекбокса, находящегося в состоянии disabled */
    .custom-checkbox:disabled + label::before {
        background-color: #e9ecef;
    }

    body {
        padding: 20px 50px;
    }


    .inactive {
        text-decoration: line-through;
    }

    .content {
        padding: 20px;
    }


    .task {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

</style>