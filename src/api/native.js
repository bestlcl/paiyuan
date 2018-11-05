import {MessageBox} from 'mint-ui'
import {moduleName} from './config'

// for native methods
const ShareTypeEnum = {
  ShareTypeEnum_IWind: 0, //分享到IWind
  ShareTypeEnum_Mail: 1, //通过邮件分享
  ShareTypeEnum_Message: 2, //通过短信分享
  ShareTypeEnum_Sian: 3, //分享到新浪微博
  ShareTypeEnum_WeChat: 4, //分享到微信
  ShareTypeEnum_WeChatDiscover: 5, //分享到微信朋友圈
  ShareTypeEnum_Safari: 6 //在Safari中打开
}
const ChooseFriendType = {}
ChooseFriendType.E_SHARE_NEWS = 0 // 分享新闻
ChooseFriendType.E_SHARE_FRIEND = 1 // 分享好友
ChooseFriendType.E_SHARE_STOCK = 2 // 分享股票
ChooseFriendType.E_TRANSMIT = 3 // 转发
ChooseFriendType.E_SHARE_MEETING = 4 // 分享会议
ChooseFriendType.E_SHARE_REPORT = 5 // 分享研究报告
ChooseFriendType.E_SHARE_BRIEF_REPORT = 9
ChooseFriendType.E_SHARE_IPO = 10 //分享新股
ChooseFriendType.E_SHARE_MSG = 11 //分享字符消息
ChooseFriendType.E_SHARE_IMAGE = 12 //分享图片

// // 定义手机联系人测试数据
const CONTACTS = [{
  'FamilyName': '齐天大圣',
  'Phone': ['13912340005']
},
  {
    'FamilyName': '13912340020',
    'Phone': ['13912340020']
  },
  {
    'FamilyName': '阿宝',
    'Phone': ['13912340001'],
    'Email': ['13912340001@wind.com.cn']
  },
  {
    'FamilyName': '安娜卡列尼娜',
    'Phone': ['13912340002']
  },
  {
    'FamilyName': '鸠摩智',
    'Phone': ['13912340003']
  },
  {
    'FamilyName': '李白',
    'Phone': ['13912340004']
  },
  {
    'FamilyName': '赵云',
    'Phone': ['13912340006']
  },
  {
    'FamilyName': '自由人',
    'Phone': ['13912340007']
  },
  {
    'FamilyName': 'Kafka',
    'Phone': ['13912340007']
  }
]

//定义播放回调错误
const mediaPlayErrorCode = {
  'deviceType': 'iOS',
  'errorCode': 1
}

/*
 * 闭包处理原生异步回调
 */
export const eventCenter = () => {
  let center = {}
  let uniqueID = 0
  return {
    /////////////////////////////// 通讯录 //////////////////////////////////
    getContacts: function (func) {
      let id = ++uniqueID
      center[id + ''] = func
      if (top.wdobject) {
        top.wdobject.getContacts(id)
      } else {
        let content = JSON.stringify(CONTACTS)
        return func(content)
      }
    },
    getContactsCallback: function (id, content) {
      window.setTimeout(function () {
        return center[id](content)
      }, 0)
    },
    /////////////////////////////// 分享 //////////////////////////////////
    share: function (type, data, func) {
      let hint
      let id = ++uniqueID
      center[id + ''] = func
      if (top.wdobject) {
        top.wdobject.shareContent(id, moduleName, type, data)
      } else {
        switch (type) {
          case ShareTypeEnum.ShareTypeEnum_IWind:
            hint = 'IWind'
            break
          case ShareTypeEnum.ShareTypeEnum_WeChatDiscover:
            hint = '微信朋友圈'
            break
          case ShareTypeEnum.ShareTypeEnum_WeChat:
          default:
            hint = '微信'
            break
        }
        MessageBox({
          title: '提示',
          message: '分享到' + hint + '调用原生分享界面',
          showCancelButton: false
        })
      }
    },
    shareCallback: function (id, content) {
      window.setTimeout(function () {
        center[id](content)
      }, 0)
    }
  }
}

/**
 * 获取联系人
 *
 */
export const getContacts = (callback) => {
  console.log('call native getContacts', callback.name)
  eventCenter().getContacts(callback)
}

/**
 * 是否已经联网
 *
 * @return 0否 1是
 */
// function isNetworkAvailable() {
//   console.log('call native isNetworkAvailable')
//   if (top.wdobject) {
//     return top.wdobject.isNetworkAvailable()
//   } else {
//     return 1
//   }
// }

/**
 * Wifi是否连接
 *
 * @return 0否 1是
 */
// function isWifiAvailable() {
//   console.log('call native isWifiAvailable')
//   if (top.wdobject) {
//     return top.wdobject.isWifiAvailable()
//   } else {
//     return 1
//   }
// }

/**
 * 添加会议到日历
 *
 */

/*addToCalendar(title,desc,startTimes,endTimes,repeatType,preAlert,url, callback)
title： 标题
desc： 内容描述，备注
startTs:格式如2010-10-11 09:30 “yyyy-MM-dd HH:mm”
endTs:格式如2010-10-11 09:30 “yyyy-MM-dd HH:mm”R
repeatType:如0：无，1，每天，2，每周，3，每月
preAlert:以五分钟为单位，如3，表示15分钟 0表示不设置提前提醒,-1表示不提醒
url:网址,保留，支持跳转，暂不实现
callback：回调函数 retCode  -1：无权限，0：成功 1：失败  calenderID：日历事件ID*/

// function addToCalendar(title, desc, startTimes, endTimes, repeatType, preAlert, url, func) {
//   console.log('call native addToCalendar')
//   if (top.wdobject) {
//     top.wdobject.addToCalendar(title, desc, startTimes, endTimes, repeatType, preAlert, url, func)
//   } else {
//     // var content = JSON.stringify(CALENDARBACKRESULT)
//     MessageBox('提示', 'call native addtocalendar')
//   }
// }

/**
 * moduleName当前的模块名称 resouceUrl 该资源的key  获取文件下载状态  0 未找到该文件  1 未下载完成  2
 * 已下载完成
 */
// function getFileDownloadState(resouceUrl) {
//   console.log('call native getFileDownloadState')
//   if (top.wdobject) {
//     return top.wdobject.getFileDownloadState(ModuleName, resouceUrl)
//   } else {
//     return 0
//   }
// }

/**
 *   获取下载项数（含已完成和未完成）
 */
export const getDownloadItemCount = () => {
  console.log('call native getDownloadItemCount')
  if (top.wdobject) {
    return top.wdobject.getDownloadItemCount(moduleName)
  } else {
    return 0
  }
}

/**
 *   打开下载管理页面
 */
export const openDownloadPage = () => {
  console.log('call native openDownloadList')
  if (top.wdobject) {
    return top.wdobject.openDownloadList()
  } else {
    MessageBox('提示', '调用原生下载界面')
  }
}

/**
 *   添加下载项到下载队列
 */
export const addDownloadItem = (itemTitle, itemUrl, detailPageUrl) => {
  console.log('call native addDownloadItemUrlWithDetail', itemTitle, itemUrl, detailPageUrl)
  if (top.wdobject) {
    return top.wdobject.addDownloadItemUrlWithDetail(itemTitle, itemUrl, detailPageUrl)
  } else {
    MessageBox('提示', '调用原生下载')
  }
}

/**
 * 拨打电话
 *
 * @param number     号码
 * @param remind_msg 确认拨打前提示语
 */
// function tel(number, remindMsg) {
//   console.log('call native tel', number, remindMsg)
//   if (top.wdobject) {
//     top.wdobject.tel(number, remindMsg)
//   } else {
//     MessageBox(remindMsg + number, '调用原生拨号界面')
//   }
// }

/**
 * 播放音频
 *
 * @param titleName     音频名称
 * @param mediaUrl      音频Url
 * @param detailPageUrl 详情页Url
 * @param type      1 悬浮 2 历史会议播放 3 直播会议
 */
export const playMedia = (titleName, mediaUrl, detailPageUrl, type) => {
  console.log('call native playMedia', titleName, mediaUrl, detailPageUrl, type)
  if (top.wdobject) {
    top.wdobject.playMedia(moduleName, titleName, mediaUrl, detailPageUrl, type)
  } else {
    MessageBox('提示', mediaUrl + titleName)
  }
}

// 播放器错误回调
export const registerMediaPlayerErrorCode = (callback) => {
  console.log('call native registerMediaPlayerErrorCode')
  if (top.wdobject) {
    top.wdobject.registerMediaPlayerErrorCode(callback)
  } else {
    var content = JSON.stringify(mediaPlayErrorCode)
    MessageBox('播放错误回调', content)
  }
}

/**
 * 更新播放器的view的模式
 * @param type      1 悬浮 2 历史会议播放 3 直播会议
 */
// function updateMediaType(type) {
//   console.log('call native updateMediaType', type)
//   if (top.wdobject) {
//     top.wdobject.updateMediaType(ModuleName, type)
//   }
// }

/**
 * 音频播放器可调试（大小/位置）
 */
// function setMediaUIPos(posX, posY) {
//   console.log('call native setMediaUIPos', posX, posY)
//   if (top.wdobject) {
//     top.wdobject.setMediaUIPos(posX, posY)
//   }
// }
//
// function setMediaUISize(width, height) {
//   console.log('call native setMediaUISize', width, height)
//   if (top.wdobject) {
//     top.wdobject.setMediaUISize(width, height)
//   }
// }

// function setMediaUIVisible(isVisible) {
//   console.log('call native setMediaUIVisible', isVisible)
//   if (top.wdobject) {
//     top.wdobject.setMediaUIVisible(isVisible)
//   }
// }

/**
 *  停止播放音频
 *  有些页面退出需要停止音频
 */
export const stopMedia = () => {
  console.log('call native stopMedia')
  if (top.wdobject) {
    top.wdobject.stopMedia(moduleName)
  }
}

/**
 * 分享（待扩展，以前分享只有弹出浮层，没有具体指定到哪个三方平台）
 *
 * @param type         0：iwind? 1：微信朋友圈 2：微信好友 3：微博 4：QQ 5：QQ朋友圈
 * @param data         分享的数据格式定义
 * @param callBackName 回调函数的名称，如果客户端分享成功需要调用callBackName这个函数告知网页。
 */
// function share(type, data, callBackName) {
//   /*
//    * data 数据格式 { 'title': '我是标题', 'logourl': '我是图片地址', 'description':
//    * '我是描述信息', 'url': '我是站点链接' }
//    */
//   console.log('call native share', type, JSON.stringify(data), callBackName)
//   eventCenter.share(type, JSON.stringify(data), callBackName)
// }

/**
 * 更加key保存value
 *
 * @param key   保存的键
 * @param value 保存的值
 * @return 是否保存成功 0否1是
 */
// function saveData(key, value) {
//   console.log('call native saveData')
//   if (top.wdobject) {
//     return top.wdobject.saveData(ModuleName, key, value)
//   } else {
//     if (key === 'localStorage.latestPlay') {
//       localStorage.latestPlay = value
//     }
//   }
// }

/**
 * 根据键返回保存的值
 *
 * @param key 键名
 * @return 返回键关联的值
 */
// function getData(key) {
//   console.log('call native getData')
//   if (top.wdobject) {
//     return top.wdobject.getData(ModuleName, key)
//   } else {
//     if (key === 'localStorage.latestPlay') {
//       return localStorage.latestPlay
//     } else {
//       return false
//     }
//   }
// }

/**
 * PDF阅读器
 */
export const pdfReader = (title, url) => {
  console.log('call native pdfReader', title, url)
  if (top.wdobject) {
    top.window.wdobject.pdfReader(title, url)
  } else {
    MessageBox('提示', title + url)
  }
}

/**
 * 获取SessionId
 *
 * 调用现有接口
 * params = {'operate':'getsessionid'}
 * shell_Req(params)
 */
export const getSessionId = () => {
  console.log('call native getSessionId')
  if (top.wdobject) {
    var params = {
      'operate': 'getsessionid'
    }
    return top.wdobject.shell_Req(JSON.stringify(params))
  } else {
    return null
  }
}

/**
 * 功能点
 *
 * 调用现有接口
 * shell_Req(params)
 */
// function userAction(actionId, paramName, paramValue) {
//   console.log('call native userAction', actionId, paramName, paramValue)
//   if (top.wdobject) {
// /**
//  * 接口名称调用形式
//  * 接口名称useraction
//  * 请求参数{'operate':'useraction','data':{'actionid':'功能点编号','params':[{'paramname':'附加参数名称','paramvalue':'附加参数值'}]}}
//  * 响应参数{'result':true,'data':'错误提示'}
//  * 说明：成功result返回true,否则返回false
//  * 调用方式window.wdobject.shell_Req(data)
//  * 说明记录功能点接口
//  */
//     if (paramName && paramValue) {
//       var params = {
//         'operate': 'useraction',
//         'data': {
//           'actionid': actionId,
//           'params': [{
//             'paramname': paramName,
//             'paramvalue': paramValue
//           }]
//         }
//       }
//     } else {
//        params = {
//         'operate': 'useraction',
//         'data': {
//           'actionid': actionId
//         }
//       }
//     }
//     return top.wdobject.shell_Req(JSON.stringify(params))
//   } else {
//     return true
//   }
// }

/**
 * 设置主题色
 */
// var themeColor = '#FE7F19'
// setW3cThemeRGBColor(themeColor)
// function setW3cThemeRGBColor(rgbColor) {
//     console.log('call native setW3cThemeRGBColor', rgbColor)
//     if(top.wdobject) {
//         top.window.wdobject.setW3cThemeRGBColor(rgbColor)
//     } else {
//
//     }
// }
export const openWebView = (isBackTitle, title, url, useNative) => {
  console.log('call native openWebView', isBackTitle, title, url, useNative)
  if (top.wdobject && useNative) {
    var params = {
      'operate': 'openurl', //原生操作函数名称
      'data': {
        'title': title,
        'url': url,
        'isembed': true,
        'isstatusbar': 0,
        'hastitlebar': isBackTitle
      },
      'hassearchbtn': false
    }
    console.log(JSON.stringify(params))
    top.wdobject.shell_Req(JSON.stringify(params))
  } else {
    MessageBox('提示', title + url)
  }
}

/**
 * 关闭当前WebView
 *
 * 调用现有接口
 * params = {"operate":"back",}
 * shell_Req(params)
 */
export const closeWebView = (back) => {
  console.log('call native closeWebView')
  if (top.wdobject) {
    var params = {
      'operate': 'back'
    }
    top.wdobject.shell_Req(JSON.stringify(params))
  } else if (back) {
    history.go(-1)
  }
}
