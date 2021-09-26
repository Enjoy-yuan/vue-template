<template>
  <div class="header flex">
    <div class="header-left flex">
      <span class="iconfont el-icon-s-fold" :class="{ rotate: isCollapse }" @click="changeSlidebarState"></span>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header-right flex">
      <div class="music" @click="dialogVisible = !dialogVisible">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconMusicfiles"></use>
        </svg>
      </div>
      <div class="language">
        <el-dropdown @command="changeLanguage">
          <span class="el-dropdown-link" style="font-size: 20px;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconzhongyingwen1"></use>
            </svg>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh" :disabled="language === '中文'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="language === 'English'">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="person flex">
        <el-dropdown class="drop-title">
          <span class="el-dropdown-link ">
            <img class="img" src="@img/avatar.gif" alt="头像" />
          </span>
          <el-dropdown-menu slot="dropdown" style="margin-top:-10px;width: 160px;text-align:center;">
            <a href="https://github.com/Enjoy-yuan/vue-template"
              ><el-dropdown-item> <i class="el-icon-s-custom"></i>仓库地址</el-dropdown-item>
            </a>
            <a href="https://vue2.yuanchengjs.cn/"
              ><el-dropdown-item> <i class="el-icon-s-platform"></i>微前端vue2项目</el-dropdown-item>
            </a>
            <a href="https://vue3.yuanchengjs.cn/"
              ><el-dropdown-item> <i class="el-icon-s-platform"></i>微前端vue3项目</el-dropdown-item>
            </a>
            <a href="https://react.yuanchengjs.cn/"
              ><el-dropdown-item> <i class="el-icon-s-platform"></i>react项目</el-dropdown-item>
            </a>
            <el-dropdown-item>
              <span @click="loginOut">
                <i class="el-icon-switch-button"></i>
                退出登录
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="歌曲播放" width="60%" center :visible.sync="dialogVisible">
      <Music></Music>
    </el-dialog>
  </div>
</template>

<script>
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'
import Breadcrumb from './Breadcrumb/index'
import elDragDialog from '@/directive/el-drag-dialog'
import Music from './Music'
export default {
  name: 'HeaderCom',
  directives: { elDragDialog },
  components: { Breadcrumb, Music },
  data() {
    return {
      language: '中文',
      isCollapse: false,
      dialogVisible: false
    }
  },
  created() {
    if (getCookie('language') === undefined) {
      this.$i18n.locale = 'zh'
      this.language = '中文'
    } else {
      this.language = getCookie('language') === 'zh' ? '中文' : 'English'
    }
  },
  methods: {
    openMusic() {},
    changeLanguage(language) {
      if (language === 'zh') {
        this.$i18n.locale = 'zh'
        setCookie('language', 'zh')
        this.language = '中文'
      } else if (language === 'en') {
        this.$i18n.locale = 'en'
        setCookie('language', 'en')
        this.language = 'English'
      }
    },
    // 控制菜单折叠
    changeSlidebarState() {
      if (this.isCollapse) {
        this.isCollapse = false
      } else {
        this.isCollapse = true
      }
      this.$emit('changeSlidebarState', this.isCollapse)
    },
    loginOut() {
      removeCookie('token')
      removeCookie('tags')
      removeCookie('username')
      // sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  background-color: #2d3a4b;
  padding-left: 20px;
  font-size: 20px;
  .header-left {
    align-items: center;
  }
  .header-right {
    align-items: center;
    .color-picker {
      display: flex;
      margin-right: 30px;
    }
    .language {
      margin-left: 30px;
      ::v-deep {
        .el-dropdown-link {
          cursor: pointer;
          color: #fff;
        }
      }
    }
    .person {
      margin-left: 30px;
      margin-right: 40px;
      ::v-deep {
        .el-dropdown {
          font-size: 0;
        }
      }
      .drop-title {
        .img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
// 旋转动画
.iconfont {
  font-size: 18px;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.2s linear;
  margin-right: 20px;
  &:hover {
    color: #67c23a;
  }
}
.rotate {
  transform: rotate(180deg);
  transition: all 0.2s linear;
}
</style>
