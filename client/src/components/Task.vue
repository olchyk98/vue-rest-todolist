<template>
	<div :class="`item${ (!isDone) ? '' : ' done' }`">
		<p class="item-title" ref="titleRef" contenteditable="true" @blur="({ target: { textContent } }) => changeContent(textContent)">{{ content }}</p>
		<div class="item-control">
			<button class="item-control-btn do" @click="changeStatus">{{ `${ (!isDone) ? "Do" : "Undone" }` }}</button>
			<button class="item-control-btn remove" @click="deleteT">Remove</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Task",
		props: {
			content: {
				type: String,
				default: "New Task"
			},
			isDone: {
				type: Boolean,
				default: false
			},
			updateTask: {
				type: Function,
				default: () => null
			},
			deleteTask: {
				type: Function,
				default: () => null
			},
			_id: {
				type: String,
				default: () => {
					throw new Error("Something went wrong during a Task component render");
					return null;
				}
			}
		},
		methods: {
			changeContent(a) {
				if(!a.replace(/ /g, "").length) {
					return this.$refs.titleRef.textContent = this.content || "New Task";
				}

				this.updateTask({
					_id: this._id,
					content: a,
					isDone: this.isDone
				});
			},
			changeStatus() {
				let a = !this.isDone;

				this.updateTask({
					_id: this._id,
					content: this.content,
					isDone: a
				});
			},
			deleteT() {
				this.deleteTask(this._id);
			}
		}
	}
</script>

<style>
	/*@import './styles/Task.css';*/
</style>