//获得openid
export const getCode = '/NAMS_mobile/main/getCode.do'
    // 发送短信验证码接口
export const sendCaptchas = '/NAMS_mobile/user/sendCaptchas.do'
    //验证验证码是否正确
export const checkCaptchas = '/NAMS_mobile/user/checkCaptchas.do'
    // 微信公众号绑定
export const binding = '/NAMS_mobile/user/binding.do'
    // 微信公众号解除绑定
export const unbinding = '/NAMS_mobile/user/unbinding.do'

// 取得拍品条件查询
export const productQueryParams = '/NAMS_mobile/product/productQueryParams.do'
    // 拍品详情
export const productDetail = '/NAMS_mobile/product/detail.do'

// 查询拍品列表
export const list = '/NAMS_mobile/product/list.do'
    // 消息服务轨迹
export const messageQuery = '/NAMS_mobile/message/query.do'
export const openId = sessionStorage.openId
    // 基本信息录入
export const add = '/NAMS_mobile/baseinfo/add.do'
    //基本信息查询
export const baseinfoQuery = '/NAMS_mobile/baseinfo/query.do'
    // 法院列表

export const listByCourt = '/NAMS_mobile/product/listByCourt.do'
    // 4.5 添加案件：获取下拉列表中的数据
export const querySelectedParam = '/NAMS_mobile/product/querySelectedParam.do'

//获取消息列表
export const msgList = '/NAMS_mobile/message/queryMessage.do'
    //消息详情
export const msgDetail = '/NAMS_mobile/message/detail.do'
    //法院筛选
export const chooseCourt = '/NAMS_mobile/product/querySelectedParam.do'
    //个人中心
export const userInfo = '/NAMS_mobile/user/getUserInfo.do'
    //增加优先权人
export const preemtionAdd = '/NAMS_mobile/preemtion/add.do'
    //优先权人类型
export const querySelectParam = '/NAMS_mobile/product/querySelectParam.do'
    //删除优先权人
export const preemtionDelete = '/NAMS_mobile/preemtion/delete.do'
    //查询优先权人详情
export const preemtionDetail = '/NAMS_mobile/preemtion/detail.do'
    //用户登记新增
export const bookAdd = '/NAMS_mobile/book/add.do'
    //用户登记详情
export const bookDetail = '/NAMS_mobile/book/detail.do'
    //用户登记删除
export const bookDelete = '/NAMS_mobile/book/delete.do'
    //联合购买人新增
export const unionAdd = '/NAMS_mobile/union/add.do'
    //联合购买人详情
export const unionDetail = '/NAMS_mobile/union/detail.do'
    //联合购买人查询
export const unionQuery = '/NAMS_mobile/union/query.do'
    //联合购买人删除
export const unionDelete = '/NAMS_mobile/union/delete.do'
    //图片上传接口
export const upload64Img = '/NAMS_mobile/file/uploadBase64Image.do'
    //快递单号保存
export const expressadd = '/NAMS_mobile/express/add.do'
    //快递单号删除
export const expressdelete = '/NAMS_mobile/express/delete.do'
    //快递详情查询
export const expressdetail = '/NAMS_mobile/express/detail.do'
    //快递单号查询
export const expressquery = '/NAMS_mobile/express/query.do'

// 5. 上传图片返回Url地址
export const fileUpload = '/NAMS_mobile/file/upload.do'

// 上传图片返回url地址
export const upload = '/NAMS_mobile/file/upload.do'
export const uploadimg = '/NAMS_mobile/file/uploadWechatImage.do'
    // 十六项查询
export const queryDetail = '/NAMS_mobile/baseinfo/query.do'
    //分类接口请求
export const querySelect = '/NAMS_mobile/product/querySelectParam.do'
    //竞买记录
export const biddingRecord = '/NAMS_mobile/bidding/biddingRecord.do'