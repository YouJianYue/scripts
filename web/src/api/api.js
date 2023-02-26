import * as API from '.'

export default {
  // 密码登录
  login: params => {
    return API.POST('im/login', params)
  },
  // 获取联系人列表
  getContacts: params => {
    return API.POST('im/get_user_contacts', params)
  },
  // 获取聊天记录
  getMessages: params => {
    return API.POST('im/get_messages', params)
  },
  // 上传头像
  uploadAvatar: (params, config) => {
    return API.POSTIMAGE('im/upload_avatar', params, config)
  },
  // 更新用户信息
  updateUserinfo: params => {
    return API.POST('im/update_userinfo', params)
  },
  // 上传聊天图片
  uploadChatImage: (params, config) => {
    return API.POSTIMAGE('im/upload_chat_image', params, config)
  },
  // 上传聊天视频
  uploadChatVideo: (params, config) => {
    return API.POSTIMAGE('im/upload_chat_video', params, config)
  },
  // 创建群
  createGroup: params => {
    return API.POST('im/create_group', params)
  },
  // 获取群列表
  getGroupContacts: params => {
    return API.POST('im/get_group_contacts', params)
  },
  // 添加群成员
  addGroupMember: params => {
    return API.POST('im/add_group_members', params)
  },
  // 获取群成员
  getGroupMember: params => {
    return API.POST('im/get_group_members', params)
  },
  updateGroup: params => {
    return API.POST('im/upload_group', params)
  },
  // 系统通知
  getAdminMessages: params => {
    return API.POST('im/get_admin_message', params)
  },
  // 获取视频的url
  getVideoUrl: params => {
    return API.POST('im/get_message_info', params);
  },
  // 保存消息记录
  saveMessage: params => {
    return API.POST('im/save_message', params);
  }
}
