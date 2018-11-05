import {
  defaultLogo,
  defaultTime,
  defaultType,
  defaultLecture,
  defaultSponsor,
  defaultTitle,
  HOST,
  defaultCity
} from 'api/config'
import { eventCenter } from 'api/native'
import pinyin from '../lib/js/pin-yin'

// 会议对象创建
export class Meeting {
  constructor(item) {
    this.id = item.id
    this.imgUrl = item.logoUrl ? HOST + '/' + item.logoUrl : defaultLogo
    this.title = item.title || defaultTitle
    this.broadcastType = item.broadcastType || defaultType
    this.meetingTime = genMeetingTime(item.startTime, item.endTime)
    this.lecturer = (item.lecturers.length < 1 || !item.lecturers[0].name) ? defaultLecture : item.lecturers[0].name + (item.lecturers[0].title ? '(' + item.lecturers[0].title + ')' : '')
    this.sponsor = (item.sponsors.length < 1 || !item.sponsors[0].name) ? defaultSponsor : item.sponsors[0].name
    this.recommend = item.recommend
    this.pdfId = item.pdfId
    this.audioId = item.audioId
    this.meetingStatus = item.meetingStatus
    this.signupStatus = item.signupStatus
    this.isRestricted = item.isRestricted ? 'restricted' : 'notRestricted'
  }
}

// 会议资讯对象
export class MeetingInfo {
  constructor(item) {
    this.title = item.title || defaultTitle
    this.city = item.city || defaultCity
    this.date = item.date || defaultTime
    this.sponsor = item.sponsor || defaultSponsor
    this.url = item.url
  }
}

// 私人会议对象
export class PrivateMeeting {
  constructor(item) {
    this.id = item.id
    this.meetingCode = item.meetingCode || '会议室密码待定'
    this.title = item.title || defaultTitle
    this.createName = item.createName || 'null'
    this.startTime = genPriMeetingTime(item.startTime, item.endTime)
    this.roomNo = JSON.parse(item.meetingRoom).roomNo || 'null'
  }
}

//会议时间过滤
export const genMeetingTime = (startTime, endTime) => {
  let meetingTime = null
  if (!startTime) {
    meetingTime = defaultTime
  } else {
    let startDate = new Date(Date.parse(startTime.replace(/-/g, '/')))
    meetingTime = startDate.format('yyyy-MM-dd EE HH:mm')
    let meetingStartDay = startDate.format('yyyyMMdd')
    let todayStr = new Date().format('yyyyMMdd')
    let dayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let todayWeekDay = '今天'
    if (meetingStartDay === todayStr) {
      meetingTime = meetingTime.replace(dayArr[startDate.getDay()], todayWeekDay)
    }
    if (endTime) {
      let endDate = new Date(Date.parse(endTime.replace(/-/g, '/')))
      meetingTime += '-' + endDate.format('HH:mm')
    }
  }
  return meetingTime
}

//私人会议时间
export const genPriMeetingTime = (startTime, endTime) => {
  let meetingTime = null
  if (!startTime) {
    meetingTime = defaultTime
  } else {
    let startDate = new Date(Date.parse(startTime.replace(/-/g, '/')))
    let meetingYeay = startDate.getYear()
    let thisYear = new Date().getYear()
    if (meetingYeay === thisYear) {
      meetingTime = startDate.format('MM-dd EE HH:mm')
      let meetingStartDay = startDate.format('yyyyMMdd')
      let todayStr = new Date().format('yyyyMMdd')
      let dayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let todayWeekDay = '今天'
      if (meetingStartDay === todayStr) {
        meetingTime = meetingTime.replace(dayArr[startDate.getDay()], todayWeekDay)
      }
    } else {
      meetingTime = startDate.format('yyyy-MM-dd HH:mm')
    }

    if (endTime) {
      var endDate = new Date(Date.parse(endTime.replace(/-/g, '/')))
      meetingTime += '-' + endDate.format('HH:mm')
    }
  }
  return meetingTime
}

const minute = 60 * 1000 // 1分钟
const hour = 60 * minute // 1小时
const day = 24 * hour // 1天
const month = 31 * day // 1月
const year = 12 * month // 1年
// 返回文字描述的日期
export const getTimeFormatText = (date) => {
  if (date == null) {
    return null
  }
  let diff = new Date().getTime() - date.getTime()
  let r = 0
  if (diff > year) {
    r = parseInt(diff / year)
    return r + '年前'
  }
  if (diff > month) {
    r = parseInt(diff / month)
    return r + '个月前'
  }
  if (diff > day) {
    r = parseInt(diff / day)
    return r + '天前'
  }
  if (diff > hour) {
    r = parseInt(diff / hour)
    return r + '个小时前'
  }
  if (diff > minute) {
    r = parseInt(diff / minute)
    return r + '分钟前'
  }
  return '刚刚'
}

Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  let week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[this.getDay() + ''])
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

//获取最近播放列表
export const getLatestPlayArray = (userCrmId) => {
  let latestPlayArray = []
  // 没有任何相关记录，直接返回空数组
  if (!localStorage.latestPlay) {
    return latestPlayArray
  }
  console.log(localStorage.latestPlay)

  let latestPlayJson = JSON.parse(localStorage.latestPlay)
  // 查找匹配记录
  for (let element of latestPlayJson) {
    console.log(userCrmId)
    if (element.crmId === userCrmId) {
      latestPlayArray = element.latestPlayArray
      break
    }
  }
  return latestPlayArray
}

//设置最近播放列表
export const setLatestPlayArray = (latestPlayArray, userCrmId) => {
  // 没有任何相关记录，新建一条记录
  if (!localStorage.latestPlay) {
    let latestPlayList = []
    let latestPlayListItem = {}
    latestPlayListItem.crmId = userCrmId
    latestPlayListItem.latestPlayArray = latestPlayArray
    latestPlayList.push(latestPlayListItem)
    localStorage.latestPlay = JSON.stringify(latestPlayList)
    return
  }
  // 包含至少一条记录
  let latestPlayJson = JSON.parse(localStorage.latestPlay)
  let hasCrmId = false
  // 查找匹配记录
  for (let element of latestPlayJson) {
    console.log(userCrmId)
    if (element.crmId === userCrmId) {
      element.latestPlayArray = latestPlayArray
      hasCrmId = true
      break
    }
  }
  // 不包含匹配记录，插入一条记录
  if (!hasCrmId) {
    let latestPlayListItem = {}
    latestPlayListItem.crmId = userCrmId
    latestPlayListItem.latestPlayArray = latestPlayArray
    latestPlayJson.push(latestPlayListItem)
    localStorage.latestPlay = JSON.stringify(latestPlayJson)
    return
  }
  localStorage.latestPlay = JSON.stringify(latestPlayJson)
}

//最近播放去重
export const addToLatestPlay = (latestPlayArray, item, userCrmId) => {
  for (let index in latestPlayArray) {
    if (latestPlayArray[index].id === item.id) {
      latestPlayArray.splice(index, 1)
      break
    }
    if (latestPlayArray.length >= 20) {
      latestPlayArray.pop()
    }
  }
  latestPlayArray.unshift(item)
  setLatestPlayArray(latestPlayArray, userCrmId)
  return latestPlayArray
}

// 会议详情对象
export class MeetingDetail {
  constructor (item) {
    this.id = item.id
    this.title = item.title ? item.title : defaultTitle
    this.broadcastType = item.broadcastType ? item.broadcastType : defaultType
    this.description = item.description
    this.agenda = item.agenda
    this.meetingTime = genMeetingTime(item.startTime, item.endTime)
    this.lecturers = []
    for (let lecture of item.lecturers) {
      this.lecturers.push({
        name: lecture.name,
        intro: lecture.name + (lecture.title ? '(' + lecture.title + ')' : ''),
        description: lecture.description
      })
    }
    if (this.lecturers.length < 1) this.lecturers.push({ name: '', intro: defaultLecture, description: '' })
    this.sponsors = []
    for (let sponsor of item.sponsors) {
      this.sponsors.push({ name: sponsor.name })
    }
    if (this.sponsors.length < 1) this.sponsors.push({ name: defaultSponsor })
    this.meetingStatus = item.meetingStatus
    this.bookmarkStatus = item.bookmarkStatus
    this.signupStatus = item.signupStatus
    this.audioId = item.audioId
    this.meetingRoom = item.meetingRoom
    //附件和速记？ attachments,pdfId, pptId, audioId
  }
}

//评论对象
export const genCommentItem = item => {
  let comment = {}
  const adminList = [1226872, 1403545, 1211961, 2670541, 2506835, 1226861] //运营crmId
  comment.authorName = adminList.includes(item.author.crmId) ? '3C小秘书' : item.author.name
  comment.commentTime = item.commentTime ? getTimeFormatText(new Date(item.commentTime)) : ''
  comment.content = item.content

  return comment
}

//手机联系人列表
export const getPhoneContacts = async () => {
  console.log('call native getContacts', genPhoneContactList.name)
  let phoneContacts = await eventCenter().getContacts(genPhoneContactList)
  console.log('handled phone contacts:', phoneContacts)
  return phoneContacts
}

export const genPhoneContactList = (content) => {
  let contacts = JSON.parse(content)
  console.log(contacts)
  let phoneContacts = getGroupContacts(contacts)
  console.log(phoneContacts)
  return phoneContacts
}

export const getGroupContacts = (contactInfos) => {
  let contactMap = new Map()
  for (let contactInfo of contactInfos) {
    let newContactInfo = {}
    newContactInfo.name = contactInfo.FamilyName
    newContactInfo.phoneNum = contactInfo.Phone && contactInfo.Phone.length > 0 ? contactInfo.Phone[0] : ''
    if (newContactInfo.name) {
      let key = pinyin.getCamelChar(newContactInfo.name)
      key = key < 'A' || key > 'Z' ? '#' : key
      let contactList = contactMap.get(key)
      if (contactList === null || typeof (contactList) === 'undefined') {
        contactList = []
        contactMap.set(key, contactList)
      }
      contactList.push(newContactInfo)
    }
  }
  let groupContacts = []
  for (let [key, value] of contactMap) {
    let groupContactInfo = {}
    groupContactInfo.key = key
    console.log(key)
    groupContactInfo.userList = value
    groupContactInfo.userList.sort((a, b) => {
      return pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name) ? 1 : -1
    })
    groupContacts.push(groupContactInfo)
  }
  groupContacts.sort((a, b) => {
    if (a.key === '#') {
      return 1
    } else if (b.key === '#') {
      return -1
    }
    return a.key > b.key ? 1 : -1
  })
  return groupContacts
}

//iWand联系人列表
export const genIWindContactList = (userListGroup) => {
  for (let users of userListGroup) {
    let arr = []
    for (let user of users.userList) {
      let u = {}
      u.name = user.userName
      u.phoneNum = user.mobilePhone
      u.imId = user.iMID
      u.company = user.company
      u.avatar = ''
      arr.push(u)
    }
    users.userList = arr
  }
  return userListGroup
}

//判断中文开始
export const isStartWithChinese = (str) => {
  const regex = /^[\u4e00-\u9fa5]+.*?$/
  return regex.test(str)
}

//判断英文开始
export const isStartWithEnglish = (str) => {
  const regex = /^[a-zA-Z0-9_]+.*?$/
  return regex.test(str)
}

//生成数组序列
export const genNumSeq = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
