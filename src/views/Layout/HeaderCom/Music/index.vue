<template>
  <div >
    <div style="margin-bottom:20px;text-align:center;">
      <el-input style="width:80%;" v-model="inputSearch" placeholder="搜索歌曲/歌手" @keyup.enter.native="getSearch" @input="getSearch"></el-input>
    </div>
    <div style="margin-left:10%;width:80%;">
      <ul>
        <li class="hover-color" style="padding:10px;" v-for="(item, index) in inputSearchData" :key="index">
          <template v-if="index + 1 + (currentPage - 1) * 20 < 10">0{{ index + 1 + (currentPage - 1) * 20 }}.</template>
          <template v-else>{{ index + 1 + (currentPage - 1) * 20 }}.</template>
          <span>{{ item.name }}</span>
          <i class="el-icon-video-play" style="color:#F56C6C" @click="mp3Play(index)"></i>
          <span style="float:right;">{{ item.artists[0].name }}</span>
        </li>
      </ul>
      <div style="text-align:center;margin-top:10px;">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="20" layout="total, pager" :total="100"></el-pagination>
      </div>
    </div>
    <div style="text-align:center;">
      <el-button type="success" style="margin-top:20px;" @click="toggleLrc">显示/隐藏歌词</el-button>
    </div>
    <div v-show="showLrc">
      <div style="text-align:center;margin:30px auto;">
        <div style="color:#67c23a;font-size:20px;height:30px;" id="lyricContainer"></div>
      </div>
      <div style="text-align:center;">
        <audio id="myAudio" style="width:80%;outline: none;" :src="mp3Url" autoplay loop="loop" controls="controls"></audio>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      inputSearch: '邓紫棋',
      inputSearchData: '',
      showLrc: false,
      mp3Lrc: [],
      mp3Url: '',
      mp3Id: [],
      currentPage: 1
    }
  },
  created() {
    this.getSearch()
  },
  methods: {
    toggleLrc() {
      this.showLrc = !this.showLrc
    },
    handleCurrentChange() {
      this.getSearch()
    },
    parseLyric() {
      let lyrics = this.mp3Lrc.split('\n')
      let a = []
      let b = []
      for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i])
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        let timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        let clause = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          let t = timeRegExpArr[k]
          let min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1))
          let time = min * 60 + sec
          a.push(time)
          b.push(clause)
        }
      }
      let audio = document.getElementById('myAudio')
      let lyricContainer = document.getElementById('lyricContainer')
      audio.ontimeupdate = function(e) {
        for (let i = 0, l = a.length; i < l; i++) {
          if (this.currentTime > a[i]) {
            lyricContainer.innerText = b.slice(i, i + 1)
          }
        }
      }
    },
    mp3Play(index) {
      this.mp3Url = `http://music.163.com/song/media/outer/url?id=${this.mp3Id[index]}.mp3`
      axios.post(`/api/song/lyric?os=pc&id=${this.mp3Id[index]}&lv=-1&kv=-1&tv=-1`).then((res) => {
        this.mp3Lrc = res.data.lrc.lyric
        this.parseLyric()
        this.showLrc = true
      })
    },
    getSearch() {
      if (this.inputSearch === '') {
        // this.inputSearch === "邓紫棋"
      } else {
        axios.post(`/api/search/pc?type=1&offset=${(this.currentPage - 1) * 20}&limit=20&s=${this.inputSearch}`).then((res) => {
          this.mp3Id = []
          this.inputSearchData = res.data.result.songs
          res.data.result.songs.map((n) => {
            this.mp3Id.push(n.id)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hover-color:hover {
  background-color: #67c23a;
}
</style>
