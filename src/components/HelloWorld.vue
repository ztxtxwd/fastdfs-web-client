<template>
  <div class="hello">
    <a-menu v-model="current" mode="horizontal">

      <a-menu-item key="mail"> <a-icon type="upload" />上传文件</a-menu-item>

    </a-menu>
    <a-row type="flex" justify="center" style="margin-top: 200px;">
      <a-col :span="8">
        <a-upload
                name="file"
                :multiple="true"
                action="http://localhost:3000/fileUpload"
                :headers="headers"
                @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> Click to Upload </a-button>
        </a-upload>
      </a-col>

    </a-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['mail'],
      headers: {
      },
    };
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
