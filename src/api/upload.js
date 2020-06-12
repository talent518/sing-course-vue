import axios from "axios";
import * as qiniu from 'qiniu-js'

const MAX_FILESIZE = 1024 * 1024 * 10;

/**
 * 封装upload方法
 * @param url
 * @param json
 * @returns {Promise}
 */
export function upload(url, json) {
  return new Promise((resolve, reject) => {
    if (json.type === 'local') {
      axios.get('http://admin.test.changchangenglish.com/api/public/qiniu/token', {
        params: {
          file_name: json.file.name
        }
      })
        .then(res => {
            let putExtra = {
              fname: json.file.name,
              mimeType: json.mimeType || null
            };
            let congif = {};
            let observable = qiniu.upload(json.file, res.data.data.new_name, res.data.data.token, putExtra, congif);
            let observer = {
              next(res) {
                let progress = Number(res.total.percent.toFixed(0));
                if (json.obj) {
                  json.obj.file.percent = progress;
                  json.obj.onProgress(json.obj.file);
                }
                if (store.state.progressList.find(i => {
                  return i.id === json.file.uid
                })) {
                  store.dispatch('setProgress', {type: 'change', id: json.file.uid, num: progress});
                }
              },
              error(err) {
                if (document.getElementsByClassName('el-message').length > 0) {

                } else {
                  reject(err);
                  this.$message({
                    type: 'error',
                    message: '请求失败！请检查网络',
                  });
                }
              },
              complete(res) {
                res.url = res.key;
                res.name = json.file.name;
                resolve(res);
              }
            };
            let subscription = observable.subscribe(observer)
          }
        );
    } else {
      // 开启分片
      let size = parseInt(Number(json.file.size) / Number(MAX_FILESIZE) + 1);
      let y = 0;
      let fun = function () {
        let formData = new FormData();
        let file = json.file.slice(y * MAX_FILESIZE, (y + 1) * MAX_FILESIZE);
        formData.append('chunk', y);
        formData.append('file_name', json.file.name);
        formData.append('count', size);
        formData.append('type', json.type);
        formData.append('file', file);
        axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }, timeout: 10000000,
          onUploadProgress: progressEvent => {
            if (store.state.progressList.find(i => {
              return i.id === json.file.uid
            })) {
              let progress = ((Number(progressEvent.loaded) + Number(y * MAX_FILESIZE)) / Number(json.file.size) * 100 | 0);
              store.dispatch('setProgress', {type: 'change', id: json.file.uid, num: progress});
            }
          },
        })
          .then(response => {
            if (response.data.code === 200) {
              if (y + 1 < size) {
                y++;
                fun()
              } else {
                y = 0;
                resolve(response.data.data);
              }
            } else {
              Vue.prototype.$message.error(response.data.msg)
            }
          })
          .catch(err => {
            if (document.getElementsByClassName('el-message').length > 0) {

            } else {
              reject(err);
              this.$message({
                type: 'error',
                message: '请求失败！请检查网络',
              });
            }
          })
      };
      fun()
    }

  })
}