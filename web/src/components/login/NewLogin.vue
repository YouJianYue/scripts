<template>
  <section>
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="login-container">
      <div class="circle" style="--x: 0"></div>
      <div class="circle" style="--x: 1"></div>
      <div class="circle" style="--x: 2"></div>
      <div class="circle" style="--x: 3"></div>
      <div class="circle" style="--x: 4"></div>
      <el-form
        status-icon
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h3 class="title">聊天登录</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="userName"
            auto-complete="off"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%"
            @click="login"
            :loading="isBtnLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import API from "../../api/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      userName: "",
      password: "",
      isBtnLoading: false,
    };
  },
  created() {
    if (
      JSON.parse(localStorage.getItem("access-user")) &&
      JSON.parse(localStorage.getItem("access-user")).displayName
    ) {
      this.userName = JSON.parse(
        localStorage.getItem("access-user")
      ).displayName;
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return "登录中...";
      return "登录";
    },
  },
  methods: {
    login() {
      if (!this.userName) {
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.password) {
        this.$message.error("请输入密码");
        return;
      }
      this.isBtnLoading = true;
      let params = {
        username: this.userName,
        password: md5(this.password),
      };
      let that = this;
      API.login(params)
        .then(function (res) {
          if (res.code === 0) {
            that.isBtnLoading = false;
            let userInfo = {
              id: res.data.id,
              displayName: res.data.username,
              avatar: res.data.avatar,
              token: res.data.token,
              timestamp: new Date().getTime(),
            };
            localStorage.setItem("access-user", JSON.stringify(userInfo)); // 将用户信息存到localStorage中
            that.$router.replace({ path: "/im" }); // 登录成功跳转
          } else {
            that.isBtnLoading = false;
            that.$message.error(res.msg); // elementUI消息提示
          }
        })
        .catch(function (error) {
          that.isBtnLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
/* 使用flex布局，让内容垂直和水平居中 */
section {
  /* 相对定位 */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片 */
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

/* 背景颜色 */
section .color {
  /* 绝对定位 */
  position: absolute;
  /* 使用filter(滤镜) 属性，给图像设置高斯模糊 */
  filter: blur(200px);
}

/* :nth-child(n) 选择器匹配父元素中的第 n 个子元素 */
section .color:nth-child(1) {
  top: -350px;
  width: 600px;
  height: 600px;
  background: #ff359b;
}

section .color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 500px;
  height: 500px;
  background: #fffd87;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 500px;
  height: 500px;
  background: #00d2ff;
}

/* 背景圆样式 */
.login-container .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  /* 使用filter(滤镜) 属性，改变颜色。
  hue-rotate(deg)  给图像应用色相旋转 
  calc() 函数用于动态计算长度值 
  var() 函数调用自定义的CSS属性值x */
  filter: hue-rotate(calc(var(--x) * 70deg));
  /* 调用动画animate，需要10s完成动画，
  linear表示动画从头到尾的速度是相同的，
  infinite指定动画应该循环播放无限次 */
  animation: animate 10s linear infinite;
  /* 动态计算动画延迟几秒播放 */
  animation-delay: calc(var(--x) * -1s);
}

/* 背景圆动画 */
@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(50px);
  }
}

.login-container .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.login-container .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.login-container .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.login-container .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 60px;
  height: 60px;
}

.login-container .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}
</style>