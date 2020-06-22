<template>
  <el-dialog
    class="score-dialog"
    top="5vh"
    :title="title"
    :visible.sync="dialogData.show"
    :close-on-click-modal="false"
    append-to-body
  >
    <div>
      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="评分标准名">
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="评分区间">
          <div class="score-item">
            <score-star star="1"></score-star>
            <cc-number-range
              v-model="form.rule[0]"
              min="0"
              max="100"
              maxlength="3"
            ></cc-number-range>
          </div>

          <div class="score-item">
            <score-star star="2"></score-star>
            <cc-number-range
              v-model="form.rule[1]"
              min="0"
              max="100"
              maxlength="3"
            ></cc-number-range>
          </div>

          <div class="score-item">
            <score-star star="3"></score-star>
            <cc-number-range
              v-model="form.rule[2]"
              min="0"
              max="100"
              maxlength="3"
            ></cc-number-range>
          </div>
        </el-form-item>

        <el-form-item label="评价语音">
          <div v-for="(item, index) in form.evaluate_voice" class="score-item">
            <score-star :star="index + 1"></score-star>

            <div class="audio-item">
              <el-upload
                :show-file-list="false"
                class="upload-item"
                action="/api/public/upload"
                list-type="text"
                :http-request="
                  (file) => {
                    return uploadFile(file, 'evaluate_voice', index);
                  }
                "
              >
                <el-button
                ><i class="iconfont icon-cloud-upload"></i>
                  上传音频
                </el-button
                >
              </el-upload>
              <el-button
                v-if="form.evaluate_voice[index]"
                @click="openMedia(form.evaluate_voice[index])"
                type="primary"
                plain
              >
                <i class="iconfont icon-play-circle"></i> 播放音频
              </el-button>
            </div>
          </div>
        </el-form-item>

        <!--<el-form-item label="过关标准">
          <el-radio-group v-model="form.standard_stars" class="radio-group-star">
            <el-radio :label="1" border>
              <score-star star="1" width="18px"></score-star>
            </el-radio>
            <el-radio :label="2" border>
              <score-star star="2" width="42px"></score-star>
            </el-radio>
            <el-radio :label="3" border>
              <score-star star="3" width="64px"></score-star>
            </el-radio>
          </el-radio-group>
        </el-form-item>-->

        <el-form-item label="重试录音">
          <div class="audio-item">
            <el-upload
              class="upload-item"
              action="/api/public/upload"
              accept="audio/mp3"
              :show-file-list="false"
              list-type="text"
              :http-request="
                (file) => {
                  return uploadFile(file, 'retry_voice');
                }
              "
            >
              <el-button
              ><i class="iconfont icon-cloud-upload"></i> 上传音频
              </el-button
              >
            </el-upload>
            <el-button
              v-if="form.retry_voice"
              :disabled="!form.retry_voice"
              @click="openMedia(form.retry_voice)"
            >
              <i class="iconfont icon-play-circle"></i> 播放音频
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogToggle">取 消</el-button>
      <el-button type="primary" @click="dialogSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import commonMessage from "@/views/common/commonMessage";
  import menuRole from "@/views/common/menuRole";
  import ScoreStar from "@/views/basic/score/ScoreStar";
  import {upload} from "@api/upload";
  import {getStorage, setStorage} from "@util/storage";

  const FORM_DEFAULT = {
    title: "",
    rule: [
      [0, 30],
      [31, 80],
      [80, 100],
    ],
    evaluate_voice: [0, 0, 0],
    retry_voice: "",
  };

  export default {
    name: "ScoreDialog",

    mixins: [commonMessage, menuRole],

    components: {ScoreStar},

    props: {
      dialogData: {
        type: Object,
        default: {
          show: false,
          param: {
            id: 0,
          },
        },
      },
    },

    data() {
      return {
        title: "",

        form: JSON.parse(JSON.stringify(FORM_DEFAULT)),
      };
    },

    watch: {
      "dialogData.show"(val) {
        if (val) this.init();
      },
    },

    methods: {
      init() {
        if (!this.dialogData.param.id) {
          this.title = "新增";
          this.form = JSON.parse(JSON.stringify(FORM_DEFAULT));
        } else {
          this.title = "编辑";
          this.form = this.dialogData.param;
        }
      },

      async uploadFile(e, type, index) {
        let res = await upload(e.file);
        if (type == "retry_voice") {
          this.form.retry_voice = res.url;
        } else if (type == "evaluate_voice") {
          this.form.evaluate_voice.splice(index, 1, res.url);
        }
      },

      openMedia(url) {
        window.open(url, "_blank");
      },

      dialogToggle() {
        this.dialogData.show = !this.dialogData.show;
      },

      dialogSave() {
        // 校验
        /*if () {

          }*/

        let api,
          json = {
            title: this.form.title,
            rule: JSON.stringify(this.form.rule),
            evaluate_voice: JSON.stringify(this.form.evaluate_voice),
            retry_voice: this.form.retry_voice,
          };

        // this.ApiBasic.postScore(json).then((res) => {
        //   this.$message.success("保存成功");
        //   this.dialogToggle();
        //   this.$parent.getData();
        // });

        if (this.dialogData.param.id) {
          json.id = this.dialogData.param.id;
          api = this.ApiBasic.putScore;
        } else {
          api = this.ApiBasic.postScore;
        }

        api(json).then((res) => {
          this.$message({type: "success", message: "保存成功",});
          this.dialogToggle();
          this.$parent.getData();
        });
      },
    },
  };
</script>

<style lang="scss">
  .score-dialog {
    .score-item {
      display: flex;
      align-items: center;

      & + .score-item {
        margin-top: 12px;
      }

      .el-rate {
        margin-right: 8px;
      }

      .cc-number-range {
        width: 172px;
      }
    }

    .audio-item {
      display: flex;
      .upload-item {
        display: flex;
        margin-right: 12px;
      }
    }

    .radio-group-star {
      display: flex;
      align-items: center;
      height: 32px;

      .el-radio {
        display: flex;
        align-items: center;
        margin-right: 0;
        margin-left: 0;
        padding-top: 0;

        .el-radio__label {
          /*display: flex;
            align-items: center;*/
          .el-rate {
            .el-rate__item {
              cursor: pointer !important;
            }
          }
        }
      }
    }
  }
</style>
