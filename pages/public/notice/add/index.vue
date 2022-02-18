<template>
	<view>
		<view class="editor_toolbox">
			<i class="iconfont icon-undo" data-method="undo" @tap="edit" />
			<i class="iconfont icon-redo" data-method="redo" @tap="edit" />
			<i class="iconfont icon-img" data-method="insertImg" @tap="edit" />
			<i class="iconfont icon-video" data-method="insertVideo" @tap="edit" />
			<i class="iconfont icon-link" data-method="insertLink" @tap="edit" />
			<i class="iconfont icon-text" data-method="insertText" @tap="edit" />
			<i class="iconfont icon-clear" @tap="clear" />
			<i class="iconfont icon-save" @tap="save" />
		</view>
		<view style="padding-bottom: 50px;">
			<mp-html ref="article" container-style="padding:20px" :content="content"
				domain="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo" :editable="editable" @remove="remove" />
		</view>
		<block v-if="modal">
			<view class="mask" />
			<view class="modal">
				<view class="modal_title">{{modal.title}}</view>
				<input class="modal_input" :value="modal.value" maxlength="-1" auto-focus @input="modalInput" />
				<view class="modal_foot">
					<view class="modal_button" @tap="modalCancel">取消</view>
					<view class="modal_button" style="color:#576b95;border-left:1px solid rgba(0,0,0,.1)"
						@tap="modalConfirm">确定</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import Main from './main.js'
	export default Main
</script>

<style scoped>
	@import "./main.scss"
</style>
