//
// // 定义功能点ID
// const ACTION_ID = {
//   ACTION_HOME: '802300090001', //3C会议手机
//   ACTION_LATEST_MEETING_BANNER: '901800040022', //最新会议-Banner
//   ACTION_LATEST_MEETING: '802300090013', //最新会议
//   ACTION_LATEST_MEETING_VIEW: '802300090002', //最新会议浏览
//   ACTION_HISTORY_MEETING: '802300090006', //历史会议
//   ACTION_OFFLINE_MEETING: '922300090018', //会议资讯
//   ACTION_OFFLINE_MEETING_VIEW: '922300090019', //会议资讯浏览
//   ACTION_OFFLINE_MEETING_TYPE: '901800040104', //会议资讯类型筛选
//   ACTION_OFFLINE_MEETING_ADDR: '901800040105', //会议资讯地点筛选
//   ACTION_OFFLINE_MEETING_TIME: '901800040106', //会议资讯时间筛选
//   ACTION_MINE: '922300090024', //个人中心
//   ACTION_MY_MESSAGE: '901800040097', //个人中心-我的消息
//   ACTION_MY_MEETING: '802300090009', //个人中心-我的会议
//   ACTION_MY_COLLECTION: '922300090026', //个人中心-我的收藏
//   ACTION_MY_DOWNLOAD: '922300090027', //个人中心-下载管理
//   ACTION_CANCEL_MEETING: '922300090028', //会议管理-取消会议
//   ACTION_CREATE_MEETING: '922300090029', //发起会议
//   ACTION_CREATE_PUBLIC: '922300090030', //发起公开会议
//   ACTION_CREATE_PUBLIC_SUBMIT: '922300090031', //发起公开会议-提交
//   ACTION_CREATE_PRIVATE: '802300090010', //发起私人会议
//   ACTION_CREATE_PRIVATE_INVATE: '922300090032', //发起私人会议-邀请参会人
//   ACTION_CREATE_PRIVATE_SUBMIT: '922300090033', //发起私人会议-提交
//   ACTION_SEARCH_MEETING: '802300090011', //会议搜索
//   ACTION_SIGNIN_MEETING: '802300090004', //立即参会
//   ACTION_SIGNUP_MEETING: '802300090003', //立即报名
//   ACTION_MEETING_DETAIL: '922300090034', //会议详情页面
//   ACTION_COMMENT: '922300090035', //发送互动内容
//   ACTION_COMMENT_ANONYMOUS: '922300090036', //匿名互动
//   ACTION_SHOW_VIDEO: '922300090037', //看视频
//   ACTION_SHOW_AUDIO: '802300090008', //听录音
//   ACTION_SHOW_SHORTHAND: '802300090007', //看速记
//   ACTION_HISTORY_MEETING_FIELD: '922300090038', //历史会议领域筛选
//   ACTION_HISTORY_MEETING_CATE: '922300090039', //历史会议类型筛选
//   ACTION_HISTORY_DOWNLOAD_AUDIO: '922300090055', //历史会议列表页下载音频
//   ACTION_BOOKMARK_MEETING: '922300090040', //收藏会议
//   ACTION_UNBOOKMARK_MEETING: '922300090041', //取消收藏会议
//   ACTION_DOWNLOAD_PPT: '922300090042', //下载PPT
//   ACTION_DOWNLOAD_AUDIO: '922300090043', //下载录音
//   ACTION_DOWNLOAD_PDF: '922300090044', //下载速记
//   ACTION_DOWNLOAD_MAN: '922300090045', //下载管理
//   ACTION_DOWNLOAD_EDIT: '922300090046', //下载管理-编辑
//   ACTION_DOWNLOAD_ALL: '922300090047', //下载管理-全选
//   ACTION_DOWNLOAD_DEL: '922300090048', //下载管理-删除
//   ACTION_EDIT_DOWNLOAD: '922300090049', //编辑下载任务
//   ACTION_EDIT_DOWNLOAD_EDIT: '922300090050', //编辑下载任务-编辑
//   ACTION_EDIT_DOWNLOAD_ALL: '922300090051', //编辑下载任务-全选
//   ACTION_EDIT_DOWNLOAD_DEL: '922300090052', //编辑下载任务-删除
//   ACTION_EDIT_DOWNLOAD_START: '922300090053', //编辑下载任务-全部开始
//   ACTION_EDIT_DOWNLOAD_PAUSE: '922300090054', //编辑下载任务-全部暂停
//   ACTION_SHARE_MEETING: '802300090014', //会议分享
//   ACTION_MEETING_SHORTCUT: '802300090005', //安卓3C会议快捷方式
//   ACTION_HISTORY_MEETING_VIEW: '802300090015', //历史会议浏览
//   ACTION_PRIVATE_MEETING_VIEW: '802300090016', //私人会议浏览
//   ACTION_LATEST_PLAY_VIEW: '802300090017', //私人会议浏览
// }
//
// // 定义功能点KEY
// const ACTION_KEY = {
//   ACTION_FROM: 'from', //打开的来源
//   ACTION_SEARCHWORD: 'searchWord', //搜索词
//   ACTION_TYPE: 'type', //类型
//   ACTION_INDUSTRY: 'industry', //领域
//   ACTION_TIME: 'time', //时间
//   ACTION_PLACE: 'place', //地点
//   ACTION_ENTANCE: 'entance', //打开的来源
//   ACTION_CONTENT: 'content', //分享的渠道
// }
//
// // 定义打开的来源from
// const FROM = {
//   LATEST_MEETING: '最新会议',
//   HISTORY_MEETING: '历史会议',
//   OFFLINE_MEETING: '会议资讯',
//   MINE: '个人中心',
//   SEARCH: '搜索',
//   MY_MESSAGE: '我的消息',
//   MY_MEETING: '我的会议',
//   MY_COLLECTION: '我的收藏',
//   MY_DOWNLOAD: '我的下载',
//   MY_PRIVATE_MEETING: '私人会议',
//   MY_LATEST_PLAY: '最近播放'
// }
//
// // 定义会议类型
// const MEETING_CATEGORY = [{
//   key: 'IR_ROADSHOW',
//   value: 'IR路演'
// },
//   {
//     key: 'ANALYST_ROADSHOW',
//     value: '分析师路演'
//   },
//   {
//     key: 'PRODUCT_ROADSHOW',
//     value: '产品项目路演'
//   },
//   {
//     key: 'FORUMSUMMIT',
//     value: '论坛峰会'
//   },
//   {
//     key: 'FINACIAL_TRNG',
//     value: '金融培训'
//   },
//   {
//     key: 'STRATEGY_MEETING',
//     value: '策略会'
//   },
//   {
//     key: 'OTHERS',
//     value: '其他'
//   },
// ]
//
// // 定义会议领域
// const MEETING_FIELD = [{
//   key: 'MACRO_ECONOMY',
//   value: '宏观经济'
// },
//   {
//     key: 'OPERATIONAL_RESEARCH',
//     value: '策略研究'
//   },
//   {
//     key: 'FIXEDINCOME',
//     value: '固定收益'
//   },
//   {
//     key: 'NONBANKFINANCE',
//     value: '非银金融'
//   },
//   {
//     key: 'REALESTATE',
//     value: '房地产'
//   },
//   {
//     key: 'CULTURAL',
//     value: '文化传播'
//   },
//   {
//     key: 'COMPUTER',
//     value: '计算机'
//   },
//   {
//     key: 'BIO_MEDICINE',
//     value: '医药生物'
//   },
//   {
//     key: 'TELECOMMUNICATION_ELECTRONICS',
//     value: '通讯电子'
//   },
//   {
//     key: 'SOCIALSERVICE',
//     value: '社会服务'
//   },
//   {
//     key: 'PUBLICUTILITIES',
//     value: '公用事业'
//   },
//   {
//     key: 'FOOD_BEVERAGE',
//     value: '食品饮料'
//   },
//   {
//     key: 'TRADE_RETAIL',
//     value: '批发零售'
//   },
//   {
//     key: 'AUTO_PARTS',
//     value: '汽车及零部件'
//   },
//   {
//     key: 'NONFERROUS_METAL',
//     value: '有色金属'
//   },
//   {
//     key: 'MILITARYMACHINERY',
//     value: '军工机械'
//   },
//   {
//     key: 'TEXTILES_GARMENTS',
//     value: '纺织服装'
//   },
//   {
//     key: 'AGRICULTURE_FORESTRY',
//     value: '农林牧渔'
//   },
//   {
//     key: 'TRANSPORTATION',
//     value: '交通运输'
//   },
//   {
//     key: 'CONSTRUCTION_MATERIALS',
//     value: '建筑建材'
//   },
//   {
//     key: 'COALMINING',
//     value: '煤炭开采'
//   },
//   {
//     key: 'PAPER_PRINGING',
//     value: '造纸印刷'
//   },
//   {
//     key: 'FINANCIAL_ENGINEERING',
//     value: '金融工程'
//   },
//   {
//     key: 'CHEMICAL_INDUSTRY',
//     value: '化工'
//   },
//   {
//     key: 'POWER_EQUIPMENT',
//     value: '电力设备与新能源'
//   },
//   {
//     key: 'STEEL',
//     value: '钢铁'
//   },
//   {
//     key: 'APPLIANCES',
//     value: '家电'
//   },
//   {
//     key: 'BANK',
//     value: '银行'
//   },
//   {
//     key: 'INTERNET',
//     value: '互联网'
//   },
//   {
//     key: 'OTHERS',
//     value: '其他'
//   }
// ]
