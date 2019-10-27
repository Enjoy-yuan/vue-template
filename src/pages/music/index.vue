<template>
  <div>
    <div class="header">
      <div class="header-content">
        <div class="header-title">
          音乐搜索
          <el-input v-model="inputSearch" placeholder="音乐/视频/电台/用户" class="input-search" @keyup.enter.native="getSearch"></el-input>
          <el-button @click="getSearch" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
    </div>

<audio id="myAudio" :src="mp3Url" autoplay loop="loop" controls="controls" ></audio>
    <div class="content">
      <ul>
        <audio id="myAudio" :src="mp3Url" autoplay loop="loop"></audio>
        <li v-for="(item,index) in inputSearchData" :key="index" @click="mp3Play(index)">
          <template v-if="index<9">
            0{{index+1}}.
          </template>
          <template v-else>
            {{index+1}}.
          </template>
          <span class="music-name">{{item.name}}</span>
          <span class="actor-name">{{item.artists[0].name}}</span>
        </li>
      </ul>
      
      <div id="lyricContainer" v-show="showLrc"></div>
      <div class="button" style="margin-top: 220px;margin-left: 800px;position: absolute;height: 30px;">
        <el-button type="success" plain @click="closePlay">停止播放</el-button>
        <el-button type="success" plain @click="showMp3Lrc">显示/隐藏歌词</el-button>
      </div>     
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputSearch: '',
      inputSearchData:'',
      showLrc: false,
      mp3Lrc: [],
      mp3Url: '',
      mp3Id: [],
    }
  },
  created () {
    this.axios.post(`/api/search/pc?type=1&offset=0&limit=40&s='邓紫棋'`)
      .then((res)=>{
        this.inputSearchData=res.data.result.songs;    
        res.data.result.songs.map(n =>{
          this.mp3Id.push(n.id)
        })
      })
  },
  methods: {
    showMp3Lrc() {
      this.showLrc=!this.showLrc
      // this.parseLyric()
    },
    parseLyric() {
        var lyrics = this.mp3Lrc.split("\n");
        var a=[];
        var b=[];
        for(var i=0;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;
            var clause = lyric.replace(timeReg,'');
            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                a.push(time)
                b.push(clause)
            }
        }
        var audio = document.getElementById("myAudio")
        var lyricContainer = document.getElementById('lyricContainer')
        audio.ontimeupdate = function(e) {
            for (var i = 0, l = a.length; i < l; i++) {
                if (this.currentTime > a[i]) {
                    lyricContainer.innerText = b.slice(i,i+1)
                }
            }
        }
    },
    mp3Play(index) {
      this.mp3Url=`http://music.163.com/song/media/outer/url?id=${this.mp3Id[index]}.mp3`
      this.axios.post(`/api/song/lyric?os=pc&id=${this.mp3Id[index]}&lv=-1&kv=-1&tv=-1`)
      .then((res)=>{
        this.mp3Lrc=res.data.lrc.lyric
        this.parseLyric()
      }) 
    },
    closePlay(){
      this.mp3Url='';
      document.getElementById('lyricContainer').innerText='';
      this.showLrc=false;
    },
    getSearch() {
      if(this.inputSearch===''){
        this.$message({
          showClose: true,
          message: '搜素内容不能为空！',
          type: 'warning',
          duration: 2*1000,
          center: true
        });
      }else {
        this.axios.post(`/api/search/pc?type=1&offset=0&limit=40&s=${this.inputSearch}`)
        .then((res)=>{
          this.mp3Id=[]
          this.inputSearch=''
          this.inputSearchData=res.data.result.songs
          res.data.result.songs.map(n =>{
            this.mp3Id.push(n.id)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  .header-content{
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    .header-title{
      box-sizing: border-box;
      padding-left: 20px;
      line-height: 80px;
      width: 100%;
      font-size: 30px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      .input-search{
        width: 400px;
        margin-left: 50px;
      }
    }
    .header-tab{
      height: 70px;
      line-height: 70px;
      font-weight: 600;
      width: 100%;
    }
  }
}
.content{
  width: 1200px;
  min-height: 500px;
  margin: 0px auto;
  display: flex;
  ul{
    width: 500px;
    li{
      line-height: 30px;
      width: 500px;
      padding-left: 10px;
      display: flex;
      &:hover{
        background-color: #67c23a;;
      }
      .music-name{
        width: 340px;
        height: 30px;
        margin-right: 30px;
        overflow:hidden;
      }
      .actor-name{
        width: 100px;
        height: 30px;
        overflow:hidden;
      }
    }
  }
  #lyricContainer{
    margin-left: 150px;
    margin-top: 120px;
    text-align: center;
    width: 400px;
    height: 30px;
    border: dashed 0.5px #e0eeba;
    line-height: 30px;
    overflow: hidden;
    color: #67c23a;
    // background-color: red;
  }
}
</style>