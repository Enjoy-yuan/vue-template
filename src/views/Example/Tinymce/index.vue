<template>
  <div>
    <editor :init="tinyConfig" api-key="hpau92an9lkt06esdzb6voapyi4doon1b44hou31adx7ozim" v-model="content"> </editor>
    {{ content }}
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'tinymce',
  components: {
    editor: Editor
  },
  data() {
    return {
      content: '',
      tinyConfig: ''
    }
  },
  created() {
    const _this = this
    this.tinyConfig = {
      height: 500,
      menubar: true,
      branding: false, // 去水印
      paste_data_images: true, // 允许粘贴图像
      language: 'zh_CN',
      nonbreaking_force_tab: true,
      font_formats:
        '宋体=SimSun;微软雅黑=Microsoft YaHei;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;',
      language_url: '/tinymce/langs/zh_CN.js',
      images_upload_handler: function(blobInfo, success, failure) {
        const formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())
        _this.$api.ImageUpload(formData, 3).then((res) => {
          success(res.data)
        })
      },
      // formatpainter 格式化插件需要收费
      plugins: [
        'advlist autolink lists link image charmap',
        'searchreplace visualblocks code fullscreen',
        'print preview anchor insertdatetime media',
        'paste code help wordcount table nonbreaking'
      ],
      toolbar: ` undo redo | formatselect | fontsizeselect
      | bold italic forecolor removeformat | image link
      | aligncenter numlist bullist | fontselect | preview`
    }
  },
  methods: {}
}
</script>
