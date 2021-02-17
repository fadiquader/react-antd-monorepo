import { MediaRecordingService } from '../index';
import { paramsForServer } from 'feathers-hooks-common';

export const uploadMediaRecording = async (blob, context = {}) => {
  const extension = blob.type.split('/')[1];
  const formData = new FormData();
  // it's not necessary to add a unique name, a uniqueId gets generated on backend
  // https://github.com/axios/axios/issues/1569#issuecomment-591491042
  const filename = `${new Date().toISOString()}.${extension}`;
  formData.append('file', blob, filename);
  const { file } = await MediaRecordingService.create(formData, paramsForServer({
    headers: { 'Content-Type': 'multipart/form-data' },
    action: context.action,
    parentId: context.parentId,
  }));

  return {
    url: file.filename,
    type: 'audio',
  };
};
