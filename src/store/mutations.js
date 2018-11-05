import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_HEADER_SEARCH_STR](state, searchStr) {
    state.headerSearchStr = searchStr
  },
  [types.SET_NEWEST_MEETING_LIST](state, newestMeetingList) {
    state.newestMeetingList = newestMeetingList
  },
  [types.SET_MY_COLLLECTION_LIST](state, myCollectionMeetingList) {
    state.myCollectionMeetingList = myCollectionMeetingList
  },
  //取消收藏
  [types.BOOK_MARK_MY_COLLOCTION](state, meetingId) {
    let myCollectionList = state.myCollectionMeetingList
    for (let index in myCollectionList) {
      if (myCollectionList[index].id === meetingId) {
        console.log(index)
        myCollectionList.splice(index, 1)
        break
      }
    }
    state.myCollectionMeetingList = myCollectionList
    console.log(myCollectionList)
    console.log(state.myCollectionMeetingList)
    state.personalCenterNum.myCollectionCount--
  },
  //历史会议
  [types.SET_HISTORY_MEETING_LIST](state, historyMeetingList) {
    state.historyMeetingList = historyMeetingList
  },
  //公开会议
  [types.SET_PUBLISHED_MEETING_LIST](state, publishedMeetingList) {
    state.publishedMeetingList = publishedMeetingList
  },
  //最近播放
  [types.SET_LATESTPLAY_MEETING_LIST](state, latestPlayMeetingList) {
    state.latestPlayMeetingList = latestPlayMeetingList
  },
  [types.SET_HEADER_MORE_POPUP](state, morePopup) {
    state.headerMorePopup = morePopup
  },
  [types.TOGGLE_HEADER_MORE_POPUP](state) {
    state.headerMorePopup = !state.headerMorePopup
  },
  [types.SET_MEETING_DETAIL](state, meetingDetail) {
    state.meetingDetail = meetingDetail
  },
  [types.SET_COMMENT_LIST](state, commentList) {
    state.commentList = commentList
  },
  //清空整个attendanceList
  [types.CLEAR_ATTENDANCE_LIST](state) {
    state.attendanceList = []
  },
  //添加一个参会人到attendanceList
  [types.ADD_ATTENDANCE_TO_LIST](state, payload) {
    state.attendanceList.push(payload.attendance)
  },
  //从attendanceList移除一个参会人
  [types.REMOVE_ATTENDANCE_FROM_LIST](state, payload) {
    let arr = []
    for (let item of state.attendanceList) {
      //区分临时联系人与iWand联系人
      if (item.phoneNum !== payload.attendance.phoneNum || item.imId !== payload.attendance.imId) {
        arr.push(item)
      }
    }
    state.attendanceList = arr
  },
  [types.SET_IWIND_CONTACT_LIST](state, iWindContactList) {
    state.iWindContactList = iWindContactList
  },
  [types.MERGE_IWIND_CONTACT_LIST] (state, userAvatarList) {
    let index = 0
    for (let users of state.iWindContactList) {
      for (let user of users.userList) {
        user.avatar = userAvatarList[index++].iconData
      }
    }
  },
  [types.SET_PHONE_CONTACT_LIST](state, phoneContactList) {
    state.phoneContactList = phoneContactList
  },
  [types.SET_MEETINGINFO_LIST](state, meetingInfoList) {
    state.meetingInfoList = meetingInfoList
  },
  [types.SET_PRIVATE_MEETING_LIST](state, privateMeetingList) {
    state.privateMeetingList = privateMeetingList
  },
  [types.SET_SERVERINFO](state, serverInfo) {
    state.serverInfo = serverInfo
  },
  //设置当前播放会议
  [types.SET_CURRENT_PLAY_MEETING](state, item) {
    state.currentPlayMeeting = item
  },
  //设置个人中心个数
  [types.SET_PERSONAL_CENTER_COUNT](state, personalNum) {
    switch (personalNum.type) {
      case 'publishedMeeting':
        state.personalCenterNum.publishedMeetingCount = personalNum.num
        break
      case 'privateMeeting':
        state.personalCenterNum.privateMeetingCount = personalNum.num
        break
      case 'myCollection':
        state.personalCenterNum.myCollectionCount = personalNum.num
        break
      case 'latestPlay':
        state.personalCenterNum.latestPlayCount = personalNum.num
        break
      case 'download':
        state.personalCenterNum.downloadCount = personalNum.num
        break
    }
  },
  //设置限制会议
  [types.SET_RESTRICTED_MEETING_LIST](state, item) {
    state.restrictedMeetingList.push(item)
  },
  //设置session
  [types.SET_SESSIONID](state, sessionid) {
    state.sessionid = sessionid
  },
  [types.SET_APP_INFO](state, info) {
    state.appInfo = info
  }
}

export default mutations
