<template>
  <div class="tags" v-show="this.tags.length > 0">
    <el-scrollbar>
      <div style="display: flex;">
        <el-tag
          style="margin-right: 6px"
          v-for="tag in tags"
          :key="tag.name"
          closable
          :type="tag.type"
          @close="handleClose(tag)"
          @click="handleClick(tag)"
        >
          <router-link :to="tag.url">{{ $t(tag.name) }}</router-link>
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { setCookie, getCookie } from '@/utils/cookie'
export default {
  data() {
    return {
      tags: []
    }
  },
  // 监听面包屑的点击
  watch: {
    '$route.path': {
      immediate: true,
      handler: function(newUrl) {
        if (getCookie('tags')) {
          this.tags = JSON.parse(getCookie('tags'))
        }
        if (this.tags.length > 0) {
          let nowIndex = 0
          this.tags.map((item, index) => {
            item.type = 'info'
            if (item.url === newUrl) {
              nowIndex = index
            }
          })
          this.tags[nowIndex].type = 'success'
          if (this.$route.path !== this.tags[nowIndex].url) {
            this.$router.push(this.tags[nowIndex].url)
          }
        }
      }
    }
  },
  methods: {
    // 关闭标签
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      if (this.tags.length > 0 && this.$route.path === tag.url) {
        this.tags.map((item) => {
          item.type = 'info'
        })
        this.tags[0].type = 'success'
        if (this.$route.path !== this.tags[0].url) {
          this.$router.push(this.tags[0].url)
        }
      } else {
        if (this.$route.path !== '/home') {
          this.$router.push('/home')
        }
      }
      setCookie('tags', JSON.stringify(this.tags))
    },
    // 点击标签
    handleClick(tag) {
      this.tags.map((item) => {
        item.type = 'info'
      })
      this.tags[this.tags.indexOf(tag)].type = 'success'
      if (this.$route.path !== this.tags[this.tags.indexOf(tag)].url) {
        this.$router.push(this.tags[this.tags.indexOf(tag)].url)
      }
    },
    // 点击菜单
    clickMenu(key) {
      let includeFlag = false
      let includeIndex = 0
      this.tags.map((item, index) => {
        if (item.url === key) {
          includeFlag = true
          includeIndex = index
        }
      })
      if (!includeFlag) {
        this.tags.map((item) => {
          item.type = 'info'
        })
        // if (!key.includes('/three/')) {
        this.tags.push({
          name: key.split('/').pop(),
          type: 'success',
          url: key
        })
        // }
      } else {
        this.tags.map((item) => {
          item.type = 'info'
        })
        this.tags[includeIndex].type = 'success'
      }
      setCookie('tags', JSON.stringify(this.tags))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-tag {
    border-radius: 0px;
  }
}
.tags {
  border-bottom: 1px solid #dadada;
  padding: 6px 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>
