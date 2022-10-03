<template>
  <uploader
    ref="uploaderRef"
    :auto-start="false"
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    @file-added="onFileAdded"
    @file-complete="fileComplete"
    @file-success="onFileSuccess"
    @complete="complete"></uploader>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue';
import type {
  MultipartUploadCreateResponse,
  SimpleUploader,
  SimpleUploaderFile,
  SimpleUploaderChunk
} from '/@/lib/declarations';
import { api } from '/@/lib/utils';

export default defineComponent({
  name: 'OssBucket',

  setup(props) {
    const uploaderRef = ref(null) as Ref<SimpleUploader>;
    const uploadId = ref('');

    const options = {
      // 目标上传 URL，可以是字符串也可以是函数，如果是函数的话，则会传入 Uploader.File 实例、
      // 当前块 Uploader.Chunk 以及是否是测试模式，默认值为 '/'
      target: (file: SimpleUploaderFile, chunk: SimpleUploaderChunk, mode: any) => {
        // 分块上传前每次都会进入到该方法
        console.log('进入到target');
        console.log('文件名：' + file.name);
        console.log('当前分块序号' + chunk.offset);
        console.log('获取到分块上传URL：');
        console.log(file.chunkUrlData);
        const key = chunk.offset; // 键值 用于获取分块链接URL
        return file.chunkUrlData[key];
      },
      // 为每个块向服务器发出 GET 请求，以查看它是否已经存在。如果在服务器端实现，
      // 这将允许在浏览器崩溃甚至计算机重新启动后继续上传。(默认: true)
      testChunks: false,
      // 分块时按照该值来分。最后一个上传块的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小，
      // 可见这个 Issue #51，默认 1*1024*1024。
      chunkSize: 5 * 1024 * 1024,
      // 强制所有块小于或等于 chunkSize。否则，最后一个块将大于或等于chunkSize。(默认: false)
      forceChunkSize: true,
      // 包含在带有数据的多部分 POST 中的额外参数。这可以是一个对象或一个函数。如果是一个函数，
      // 它将被传递一个 Uploader.File、一个 Uploader.Chunk 对象和一个 isTest 布尔值（默认值{}：）
      query: (file: SimpleUploaderFile, chunk: SimpleUploaderChunk, mode: any) => {
        const data = { partNumber: chunk.offset + 1 };
        return data;
      },
      uploadMethod: 'PUT',
      //  当上传的时候所使用的是方式，可选 multipart、octet，默认 multipart，参考 multipart vs octet。
      // MiniO 的分片不能使用表单
      method: 'octet',
      //  处理请求参数，默认 function (params) {return params}，一般用于修改参数名字或者删除参数。0.5.2版本后，
      processParams: (params: any) => {
        return {};
      }
      // headers: {
      //  'Content-Type': 'binary/octet-stream'
      // }
    };
    const attrs = {
      accept: 'image/*'
    };
    const statusText = {
      success: 'success',
      error: 'error',
      uploading: 'uploading',
      paused: 'paused',
      waiting: 'waiting'
    };

    onMounted(() => {
      nextTick(() => {
        window.uploader = uploaderRef.value.uploader;
      });
    });

    const getChunkUploadUrl = async (file: SimpleUploaderFile) => {
      // 向具有指定ID的用户发出请求
      console.log(file);
      console.log('获取分块上传链接');
      const fileName = file.name; // 文件名
      const chunkSize = file.chunks.length; // 分片数
      // 请求后台返回每个分块的上传链接

      const result = await api.minioMultipart().createMultipartUpload({
        bucketName: 'minio-demo',
        objectName: fileName,
        size: chunkSize
      });

      const data = result.data as MultipartUploadCreateResponse;
      file.chunkUrlData = data.chunkUploadUrls;
      uploadId.value = data.uploadId;
    };

    // 单个文件上传成功
    const onFileSuccess = (rootFile: SimpleUploaderFile, file: SimpleUploaderFile, message: string) => {
      console.log('单个文件上传成功', arguments);
      // 调用后台合并文件
      const fileName = file.name; // 文件名

      api
        .minioMultipart()
        .completeMultipartUpload({ bucketName: 'minio-demo', objectName: fileName, uploadId: uploadId.value })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log('合并完成');
    };

    const onFileAdded = (file: SimpleUploaderFile) => {
      console.log('文件被添加：' + file.name);
      // 计算MD5
      // this.computeMD5(file, this.options.chunkSize);
      // 获取分块上传链接
      // eslint-disable-next-line no-unused-vars
      var res = getChunkUploadUrl(file);
      console.log('文件被添加查看是否获取到分块URL');
      console.log(file.chunkUrlData);
    };

    // 上传完毕
    const complete = () => {
      console.log('complete', arguments);
    };

    // 根下的单个文件（文件夹）上传完成
    const fileComplete = (rootFile: SimpleUploaderFile) => {
      console.log('根下的单个文件（文件夹）上传完成', arguments);
    };

    return {
      uploaderRef,
      options,
      attrs,
      statusText,
      onFileAdded,
      onFileSuccess,
      complete,
      fileComplete
    };
  }
});
</script>

<style lang="scss">
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
