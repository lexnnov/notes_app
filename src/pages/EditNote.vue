<template>
    <div class="container">
        <div class="note">
        <div class="title">
            <input v-model="title" type="text">
        </div>

        <div class="content">
            <Button :onClick="addTask" title="add task" />
            <task v-for="task in tasks" :key="task.id"/>

        </div>

        <div class="footer">
            <Button :onClick="createNote" title="CREATE" />
        </div>

    </div>
    </div>

</template>

<script>
	import Button from '@/components/Button/Button';
		import Task from '@/components/Task/Task';

    export default {
    name: 'CreateNote',
    components: { Task, Button },
    data: function(){
        return {
            title: '',
            tasks: [],
        }
    },
    methods: {
        ID() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },
        createNote() {
          if(localStorage.notes)
            localStorage.notes = JSON.stringify([...JSON.parse(localStorage.notes), {id:this.ID(), title: this.title, tasks: this.tasks} ])
          else
            localStorage.notes = JSON.stringify([{id:this.ID(), title: this.title, tasks: this.tasks} ])

          this.$router.push('/')
        },
        addTask() {
            this.tasks = [...this.tasks, { title: '', id: this.ID() }]
            console.log('Button clicked')
        },

    }

    }
</script>

<style scoped>

    .container {
        width: 80%;
        max-width: 640px;
        margin: 0 auto;
    }

    input[type=text], textarea {
        -webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        -o-transition: all 0.30s ease-in-out;
        outline: none;
        padding: 3px 0px 3px 3px;
        margin: 5px 1px 3px 0px;
        border: 1px solid white;
        background-color: transparent;
        border-bottom: 1px solid white;
        color: white;
        margin-left: 20px;

    }

    input[type=text]:focus, textarea:focus {
        box-shadow: 0 0 5px rgba(81, 203, 238, 1);
        padding: 3px 0px 3px 3px;
        /*margin: 5px 1px 3px 0px;*/
        border: 1px solid rgba(81, 203, 238, 1);
    }

    .note {
        width: 100%;
        /*height: 200px;*/
        background-color: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        display: flex;
        flex-direction: column;
        border-radius: 2px;
    }

    .title {
        height: 50px;
        background-color: #009688;
        flex: 0 0 auto;
        border-radius: 2px 2px 0 0;
        display: flex;
        align-items: center;

    }

    .title p {
        text-align: left;
        color: white;
        padding-left: 20px;
    }

    .content{
        /* 1 flex-grow, 0 flex-shrink, auto flex-basis */
        flex: 1 0 auto;
    }

    .footer {
        flex: 0 0 auto;
        border-top: 1px solid #DBDBDB;
        /*background-color: red;*/
        height: 50px;
        display: flex;
        justify-content: flex-end;
        color: #009688;
    }

</style>