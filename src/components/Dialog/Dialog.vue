<template>
    <transition name="fade">
        <div class="dialog" v-if="modalData.modalOpen">
            <div class="wrap">
                <div class="header">
                    <p>
                        {{modalData.data.title}}
                    </p>
                </div>
                <div class="content">
                    {{modalData.data.content}}
                </div>
                <div class="footer">
                    <Button
                            v-for="control in modalData.data.controls"
                            :key="control"
                            :title="control"
                            :onClick="
                        control == 'CANCEL' ? cancel :
                        control == 'REMOVE' ? remove :
                         ok "
                    />

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
	import Button from '@/components/Button/Button';

	export default {

		name: 'Dialog',
		components: { Button },

		computed: {
			modalData() {
				return this.$store.state.modal
			}
		},
		methods: {
			cancel() {
				this.$emit('closeModal')
			},
			ok() {
				if (this.modalData.route)
					this.$router.push(this.modalData.route)

				this.$emit('closeModal')
			},
			remove() {
				this.$emit('remove')
			}
		}
	}
</script>

<style lang="scss" scoped>

    .dialog {
        width: 100%;
        height: 100%;
        background-color: #0000008c;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .wrap {
        background-color: #ffffff;
        width: 500px;
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 50px;
        background-color: #009688;
        flex: 0 0 auto;
        border-radius: 2px 2px 0 0;

        p {
            text-align: left;
            color: white;
            padding-left: 20px;
        }
    }

    .content {
        flex: 1 0 auto;
        padding: 20px;
    }

    .footer {
        flex: 0 0 auto;
        border-top: 1px solid #DBDBDB;
        display: flex;
        justify-content: flex-end;
        color: #009688;
    }

</style>