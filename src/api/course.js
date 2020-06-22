import ajax from "./ajax";
import config from "@/config"

const url = {
  voiceQuestions: `question/voice-questions`,
};
const { get, post, patch, put, delete: del } = ajax(config.apiUrl)();

class Course {
  getVoiceQuestions({ title, pageIndex, pageSize }) {
    return get(`${url.voiceQuestions}`, { title, pageIndex, pageSize });
  }

  postVoiceQuestions({
    title,
    material_type,
    material_url,
    ori_sound,
    dubbing_type,
    dubbing_content,
    dubbing_answer,
    dubbing_content_tran,
  }) {
    return post(`${url.voiceQuestions}`, {
      title,
      material_type,
      material_url,
      ori_sound,
      dubbing_type,
      dubbing_content,
      dubbing_answer,
      dubbing_content_tran,
    });
  }
  putVoiceQuestions({
    id,
    title,
    material_type,
    material_url,
    ori_sound,
    dubbing_type,
    dubbing_content,
    dubbing_answer,
    dubbing_content_tran,
  }) {
    return put(`${url.voiceQuestions}/${id}`, {
      title,
      material_type,
      material_url,
      ori_sound,
      dubbing_type,
      dubbing_content,
      dubbing_answer,
      dubbing_content_tran,
    });
  }
  delVoiceQuestions(id) {
    return del(`${url.voiceQuestions}/${id}`);
  }
}

export default new Course();
