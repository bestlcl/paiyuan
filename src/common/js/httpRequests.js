// 取消收藏
import api from '../../api/fetchData'
import {bookMarkMeeting, isCrmRestrictedForMeeting, getRecordUrl, getDocumentUrl, addUserLogOfPlayFailed, getMeetingPlaybackUrl} from '../../api/config'
import ERR_CODE from '../../api/errorCode'
import store from '../../store'
import {MessageBox} from 'mint-ui'

// 原生播放器错误类型
const mediaPlayErrorCallback = {
  'Android': {
    'MEDIA_ERROR_UNKNOWN': 1,
    'MEDIA_ERROR_SERVER_DIED': 100,
    'MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK': 200,
    'MEDIA_ERROR_IO': -1004,
    'MEDIA_ERROR_MALFORMED': -1007,
    'MEDIA_ERROR_UNSUPPORTED': -1010,
    'MEDIA_ERROR_TIMED_OUT': -110,
    'MEDIA_ERROR_FILE_NOUPDATE': 101,
    'MEDIA_ERROR_PLAY_ABNORMAL': 102,
    'MEDIA_ERROR_NETWORK_UNREACHABLE': 103,
    'MEDIA_ERROR_FILE_ERROR': 104
  },
  'iOS': {
    'MEDIA_ERROR_NETWORK_UNREACHABLE': 1,
    'MEDIA_ERROR_FILE_NOTEXIST': 2,
    'MEDIA_ERROR_DOWNLOAD_HTML_FAIL': 3,
    'MEDIA_ERROR_PARSEHTML_FAIL': 4,
    'MEDIA_ERROR_CodeMediaServicesFailed': 1836282486,
    'MEDIA_ERROR_CodeIsBusy': 560030580,
    'MEDIA_ERROR_CodeIncompatibleCategory': 560161140,
    'MEDIA_ERROR_CodeCannotInterruptOthers': 560557684,
    'MEDIA_ERROR_CodeMissingEntitlement': 1701737535,
    'MEDIA_ERROR_CodeSiriIsRecording': 1936290409,
    'MEDIA_ERROR_CodeCannotStartPlaying': 561015905,
    'MEDIA_ERROR_CodeCannotStartRecording': 561145187,
    'MEDIA_ERROR_CodeBadParam': -50,
    'MEDIA_ERROR_InsufficientPriority': 561017449,
    'MEDIA_ERROR_CodeResourceNotAvailable': 561145203,
    'MEDIA_ERROR_CodeUnspecified': 2003329396
  },
  'instruction': {
    'MEDIA_ERROR_UNKNOWN': '未知播放错误',
      'MEDIA_ERROR_SERVER_DIED': '媒体服务器未响应',
      'MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK': '播放器不支持该音频流连续播放',
      'MEDIA_ERROR_IO': '音频流文件错误',
      'MEDIA_ERROR_MALFORMED': '音频流不符合相关的编码标准或文件规范',
      'MEDIA_ERROR_UNSUPPORTED': '播放器不支持该音频流的相关编码标准或规范',
      'MEDIA_ERROR_TIMED_OUT': '播放器长时间未响应',
      'MEDIA_ERROR_FILE_NOUPDATE': '播放器超过8秒未读取到数据',
      'MEDIA_ERROR_PLAY_ABNORMAL': '播放器未知异常',
      'MEDIA_ERROR_NETWORK_UNREACHABLE': '移动设备网络不可用',
      'MEDIA_ERROR_FILE_ERROR': '播放器读取音频文件错误或文件已经损坏',
      'MEDIA_ERROR_FILE_NOTEXIST': '对应的音频文件URL地址为空',
      'MEDIA_ERROR_DOWNLOAD_HTML_FAIL': '下载音频文件出现错误',
      'MEDIA_ERROR_PARSEHTML_FAIL': '解析音频下载地址的HTML失败',
      'MEDIA_ERROR_CodeMediaServicesFailed': '媒体服务器未响应',
      'MEDIA_ERROR_CodeIsBusy': '媒体服务器忙',
      'MEDIA_ERROR_CodeIncompatibleCategory': '播放器不支持该音频流的相关编码标准或规范',
      'MEDIA_ERROR_CodeCannotInterruptOthers': '已经存在其他播放器正在播放,不能覆盖其他播放器',
      'MEDIA_ERROR_CodeMissingEntitlement': '播放器缺少授权，未能启动',
      'MEDIA_ERROR_CodeSiriIsRecording': 'siri正在录音，不能启动播放器',
      'MEDIA_ERROR_CodeCannotStartPlaying': '播放器不能开始播放',
      'MEDIA_ERROR_CodeCannotStartRecording': '播放器不能开始录音',
      'MEDIA_ERROR_CodeBadParam': '音频文件编码错误',
      'MEDIA_ERROR_InsufficientPriority': '播放器优先级不足',
      'MEDIA_ERROR_CodeResourceNotAvailable': '对应的音频文件URL地址为空',
      'MEDIA_ERROR_CodeUnspecified': '未指明的音频文件'
  }
}

export const bookmarkMeeting = (meetingId, bookmarked) => {
  let url = bookMarkMeeting
  let params = {
    meetingId: meetingId,
    bookmarked: bookmarked
  }
  return api.getData(url, 'get', {params: params})
}

//行业鉴权
export const detailAuthentication = (id, isRestricted, fnObj) => {
  if (isRestricted === 'restricted') {
    let restrictedMeetingList = fnObj.getRestrictedMeeting()
    let isExist = false
    for (let meeting of restrictedMeetingList) {
      if (meeting.meetingId === id) {
        isExist = true
        if (meeting.restrictedMsg === 'NON_RESTRICTED') {
          fnObj.routeToDetail()
          break
        } else {
          MessageBox.alert(meeting.restrictedMsg)
          break
        }
      }
    }
    if (!isExist) {
      let restrictedMeeting = {}
      restrictedMeeting.meetingId = id
      let url = isCrmRestrictedForMeeting
      let params = {
        meetingId: id
      }
      return api.getData(url, 'get', {params: params})
        .then((res) => {
          restrictedMeeting.restrictedMsg = res
          fnObj.setRestrictedMeeting(restrictedMeeting)
          if (res === 'INDUSTRY_RESTRICTED') {
            MessageBox.alert(ERR_CODE.SIGNUP_INDUSTRY_RESTRICTED.MSG)
          } else if (res === 'WHITE_LIST_RESTRICTED') {
            MessageBox.alert(ERR_CODE.SIGNUP_WHITE_LIST_RESTRICTED.MSG)
          } else if (res === 'NON_RESTRICTED') {
            fnObj.routeToDetail()
          }
        }).catch((e) => {
          console.log(e)
        })
    }
  } else {
    fnObj.routeToDetail()
  }
}

// 直播错误回调
export const registerMediaPlayerErrorCodeCallBack = (content) => {
  console.log('errorCodeCallBack content =' + content)
  let errorCodeCallBack = JSON.parse(content)
  let playErrContent = {}
  for (let deviceType in mediaPlayErrorCallback) {
    if (deviceType === errorCodeCallBack.deviceType) {
      for (let errorCode in mediaPlayErrorCallback[deviceType]) {
        if (mediaPlayErrorCallback[deviceType][errorCode] === errorCodeCallBack.errorCode) {
          playErrContent.userErrorMessage = errorCode
          playErrContent.userErrorInstruction = mediaPlayErrorCallback.instruction[errorCode]
          break
        } else {
          playErrContent.userErrorMessage = 'MEDIA_ERROR_UNKNOWN'
          playErrContent.userErrorInstruction = mediaPlayErrorCallback.instruction.MEDIA_ERROR_UNKNOWN
        }
      }
    }
  }
  let currentPlayMeeting = store.getters.currentPlayMeeting
  playErrContent.meetingId = currentPlayMeeting.id
  playErrContent.userErrorType = currentPlayMeeting.meetingStatus === 'STARTED' ? 'PLAY_LIVE_AUDIO' : 'PLAY_HISTORY_AUDIO'
  playErrContent.userDeviceType = errorCodeCallBack.deviceType === 'iOS' ? 'IOS' : 'ANDROID'
  playErrContent.userErrorCode = errorCodeCallBack.errorCode
  addMediaPlayErrorToLog(playErrContent)
}

// 播放错误回调UserLog
export const addMediaPlayErrorToLog = (playErrContent) => {
  let log = {
    meetingId: playErrContent.meetingId,
    userDeviceType: playErrContent.userDeviceType,
    userDeviceInfo: navigator.userAgent || '',
    userErrorType: playErrContent.userErrorType,
    userErrorCode: playErrContent.userErrorCode,
    userErrorMessage: playErrContent.userErrorMessage,
    userErrorInstruction: playErrContent.userErrorInstruction
  }
  let url = addUserLogOfPlayFailed
  return api.getData(url, 'post', JSON.stringify(log))
    .then((res) => {
      // TODO mutation state
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })
}

//pdf
export const getDocument = (documentId, documentType, meetingId) => {
  let url = ''
  let params = {}
  if (documentType === 'AUDIO') {
    url = getRecordUrl
    params = {
      audioId: documentId,
      meetingId: meetingId
    }
  } else {
    url = getDocumentUrl
    params = {
      documentId: documentId,
      documentType: documentType
    }
  }
  return api.getData(url, 'get', { params: params, responseType: 'text' })
}

//获取视频回放
export const getMeetingPlayback = (id) => {
  const url = getMeetingPlaybackUrl
  let params = {
    meetingId: id
  }
  return api.getData(url, 'get', { params: params })
}
