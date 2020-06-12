import ajax from "./ajax";
const url = {
  voiceQuestions: `question/voice-questions`,
};
const { get, post, patch, put, delete: del } = ajax(process.env.VUE_APP_API)();

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
  }) {
    return get(`${url.voiceQuestions}`, {
      title,
      material_type,
      material_url,
      ori_sound,
      dubbing_type,
      dubbing_content,
      dubbing_answer,
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
  }) {
    return get(`${url.voiceQuestions}/${id}`, {
      title,
      material_type,
      material_url,
      ori_sound,
      dubbing_type,
      dubbing_content,
      dubbing_answer,
    });
  }
  delVoiceQuestions(id) {
    return get(`${url.voiceQuestions}/${id}`);
  }
}

export default new Course();
