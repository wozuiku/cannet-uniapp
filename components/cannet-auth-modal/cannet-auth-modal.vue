<template>
	<view class="cu-modal bottom-modal" :class="{show: showAuth}" @tap="closeAuthModal">
		<view class="auth-wrap cu-dialog form-wrap" form-wrap @tap.stop style="border-radius: 20rpx 20rpx 0 0;">
			<!-- 注册 -->
			<view v-if="authType === 'register'" class="register-box">
				<u-form>
					<u-form-item prop="accountName">
						<u-input v-model="form['register'].data.accountName" placeholder="用户名" />
					</u-form-item>
					<u-form-item prop="passWord">
						<u-input v-model="form['register'].data.passWord" placeholder="密码" type="password" />
					</u-form-item>

					<u-form-item prop="confirmPassWord">
						<u-input v-model="form['register'].data.confirmPassWord" placeholder="确认密码" type="password" />
					</u-form-item>

					<u-form-item prop="fullName">
						<u-input v-model="form['register'].data.fullName" placeholder="全名" />
					</u-form-item>

					<u-form-item prop="phoneNumber">
						<u-input v-model="form['register'].data.phoneNumber" placeholder="手机号" />
					</u-form-item>

					<!-- <u-form-item prop="verificationCode" class="register-verificationCode">
						<u-input v-model="form['register'].data.verificationCode" placeholder="验证码" />
						<button class="u-reset-button register-smscode-btn" :disabled="disabledCode"
							@tap="getSmsCode('1')">{{codeText}}</button>
					</u-form-item> -->
					
					<view class="register-smscode solid-bottom">
						<view class="register-smscode-left">
							<u-form-item prop="verificationCode" class="register-verificationCode" :borderBottom="false">
								<u-input v-model="form['register'].data.verificationCode" placeholder="验证码" />
							</u-form-item>
						</view>
						
						<view class="register-smscode-right">
							<button class="u-reset-button register-smscode-btn" :disabled="disabledCode"
								@tap="getSmsCode('1')">{{codeText}}</button>
						</view>
					</view>

					<u-form-item prop="protocol" :borderBottom="false">
						<u-checkbox v-model="protocol" shape="circle">
							<view class="u-flex register-agreement-text">
								我已阅读并同意
								<view class="register-protocol-text"
									@tap="$Router.push({ path: '/pages/public/richtext'})">
									《用户服务协议》、</view>
								<view class="register-protocol-text"
									@tap="$Router.push({ path: '/pages/public/richtext'})">
									《隐私声明》</view>
							</view>
						</u-checkbox>
					</u-form-item>
				</u-form>

				<view class="register-btn-box">
					<button class="bg-gradual-blue register-submit-btn" @click="registerSubmit">注册</button>
				</view>

				<view class="flex justify-between register-login-question-box">
					<view>
						<button v-if="!isLogin" class="u-reset-button register-login-text"
							@tap="showAuthModal('accountLogin')">已有账号，马上登录</button>
					</view>
					<view class="register-login-question" @tap="$Router.push({ path: '/pages/public/richtext'})">遇到问题？
					</view>
				</view>
			</view>

			<!-- 登录 -->
			<view v-if="authType === 'accountLogin'" class="account-login-box">

				<u-form>
					<view class="solid-bottom">
						<u-form-item prop="loginName" :borderBottom="false">
							<u-input v-model="form['accountLogin'].data.loginName" placeholder="用户名/手机号" />
						</u-form-item>
					</view>
					<!-- <u-form-item prop="passWord">
						<u-input v-model="form['accountLogin'].data.passWord" placeholder="密码" type="password" />
						<button class="u-reset-button login-forgot-btn" @tap="showAuthModal('forgotPwd')">忘记密码</button>
					</u-form-item> -->

					<view class="account-login-password solid-bottom">
						<view class="account-login-password-left">
							<u-form-item prop="passWord" :borderBottom="false">
								<u-input v-model="form['accountLogin'].data.passWord" placeholder="密码"
									type="password" />
							</u-form-item>
						</view>

						<view class="account-login-password-right">
							<button class="u-reset-button login-forgot-btn"
								@tap="showAuthModal('forgotPwd')">忘记密码</button>
						</view>


					</view>

					<u-form-item prop="protocol" :borderBottom="false">
						<u-checkbox v-model="protocol" shape="circle">
							<view class="u-flex login-agreement-text">
								我已阅读并同意
								<view class="login-protocol-text"
									@tap="$Router.push({ path: '/pages/public/richtext'})">
									《用户服务协议》、</view>
								<view class="login-protocol-text"
									@tap="$Router.push({ path: '/pages/public/richtext'})">
									《隐私声明》</view>
							</view>
						</u-checkbox>
					</u-form-item>
				</u-form>
				<view class="login-submit-btn-box">
					<button class="bg-gradual-blue login-submit-btn" @click="accountLoginSubmit">登录</button>
				</view>
				<view class="flex justify-end login-question-register">
					<view class="login-question" @tap="$Router.push({ path: '/pages/public/richtext'})">遇到问题？</view>
					<view class="">
						<button class="u-reset-button login-register-btn" @tap="showAuthModal('register')">立即注册</button>
					</view>
				</view>
			</view>

			<!-- 忘记密码 -->
			<view v-if="authType === 'forgotPwd'" class="forgotpwd-box">
				<u-form>
					<u-form-item prop="phoneNumber">
						<u-input v-model="form['forgotPwd'].data.phoneNumber" placeholder="手机号" />
					</u-form-item>
					<!-- <u-form-item prop="verificationCode">
						<u-input v-model="form['forgotPwd'].data.verificationCode" placeholder="验证码" />
						<button class="u-reset-button forgotpwd-smscode-btn" :disabled="disabledCode"
							@tap="getSmsCode('3')">{{codeText}}</button>
					</u-form-item> -->
					
					<view class="forgotpwd-smscode solid-bottom">
						<view class="forgotpwd-smscode-left">
							<u-form-item prop="verificationCode" :borderBottom="false">
								<u-input v-model="form['forgotPwd'].data.verificationCode" placeholder="验证码" />
							</u-form-item>
						</view>
						
						<view class="forgotpwd-smscode-right">
							<button class="u-reset-button forgotpwd-smscode-btn" :disabled="disabledCode"
								@tap="getSmsCode('3')">{{codeText}}</button>
						</view>
						
					</view>
					
					<u-form-item prop="passWord">
						<u-input v-model="form['forgotPwd'].data.passWord" placeholder="密码" type="password" />
					</u-form-item>
					<u-form-item prop="confirmPassWord">
						<u-input v-model="form['forgotPwd'].data.confirmPassWord" placeholder="确认密码" type="password" />
					</u-form-item>
				</u-form>

				<view class="forgotpwd-submit-btn-box">
					<button class="bg-gradual-blue forgotpwd-submit-btn" @tap="forgotPwdSubmit">提交</button>
				</view>
				<button v-if="!isLogin" class="u-reset-button forgotpwd-login-btn"
					@tap="showAuthModal('accountLogin')">返回登录</button>
			</view>

			<!-- 修改密码 -->
			<view v-if="authType === 'changePwd'" class="changepwd-box">
				<u-form>
					<u-form-item prop="oldPassWord">
						<u-input v-model="form['changePwd'].data.oldPassWord" type="password" placeholder="请输入旧密码" />
					</u-form-item>
					<u-form-item prop="newPassword">
						<u-input v-model="form['changePwd'].data.passWord" type="password" placeholder="请输入新密码" />
					</u-form-item>
					<u-form-item prop="reNewPassword">
						<u-input v-model="form['changePwd'].data.confirmPassWord" type="password"
							placeholder="请输入确认密码" />
					</u-form-item>
				</u-form>
				<view class="changepwd-submit-btn-box">
					<button class="bg-gradual-blue changepwd-submit-btn" @tap="changePwdSubmit">保存</button>
				</view>

			</view>


			<view v-if="authType === 'smsLogin'">
				短信登录
				<button v-if="!isLogin" class="u-reset-button" @tap="showAuthModal('accountLogin')">返回登录</button>
			</view>





		</view>
	</view>
	<!-- <view class="wrap">
		
		<view class="top"></view>
		<view class="content">
			<u-form-item>
				<u-input v-model="userName" placeholder="请输入用户名" />
			</u-form-item>
			<u-form-item>
				<u-input type="password" v-model="password" placeholder="请输入密码" />
			</u-form-item>
		</view>
	
	</view> -->
</template>

<script>
	import Main from "./main";
	export default Main;
</script>

<style lang="scss" scoped>
	@import './main.scss'
</style>
