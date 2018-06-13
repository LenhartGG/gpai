import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/HelloWorld'
import Login from '../pages/Login.vue' //登陆
import Binding from '../pages/Binding.vue' //手机绑定
import Home from '../pages/Home.vue' //案例
import Detail from '../pages/Detail.vue' //详情
import Service from '../pages/Service.vue' //服务
import Message from '../pages/Message.vue' //消息
import User from '../pages/User.vue' //个人信息
import testPag from '../pages/testPag.vue'
import textInput from '../components/textInput.vue'
import Test2 from '../pages/DetailLists/test2.vue' //测试日期选择 mint-ui
// import test3_upload from '../pages/DetailLists/test3_upload.vue' //测试上传图片


// 详情16项
import Add from '../pages/DetailLists/Add.vue' //添加案例(基本信息)
import Info from '../pages/DetailLists/Info.vue' //基本信息
import Voucher from '../pages/DetailLists/Voucher.vue' //处置凭证
import report from '../pages/DetailLists/report.vue' //评估报告
import Ownership from '../pages/DetailLists/Ownership.vue' //权属调查(房地产)
import Ownership_ground from '../pages/DetailLists/Ownership_ground.vue' //权属调查(土地)
import Ownership_invisible from '../pages/DetailLists/Ownership_invisible.vue' //权属调查(无形资产)
import Ownership_car from '../pages/DetailLists/Ownership_car.vue' //权属调查(机动车)
import Ownership_stock from '../pages/DetailLists/Ownership_stock.vue' //权属调查(股权)
import Ownership_ship from '../pages/DetailLists/Ownership_ship.vue' //权属调查(船舶)
import Fieldinvestigation from '../pages/DetailLists/Fieldinvestigation.vue' //实地勘察
import PriceSuggestion from '../pages/DetailLists/PriceSuggestion.vue' //价格建议
import Priorityperson from '../pages/DetailLists/Priorityperson.vue' //优先权人
import AuctionDoc from '../pages/DetailLists/AuctionDoc.vue' //拍卖文案
import Propertydelivery from '../pages/DetailLists/Propertydelivery.vue' //财产交割
import ServiceTrack from '../pages/DetailLists/ServiceTrack.vue' //服务轨迹
import ScoreFeedback from '../pages/DetailLists/ScoreFeedback.vue' //评分反馈

import Sampleservice from '../pages/DetailLists/Sampleservice.vue' //看样服务
import Registrationservices from '../pages/DetailLists/Registrationservices.vue' //登记服务
import Addregister from '../pages/DetailLists/Addregister.vue' // 添加登记
import Addregistertwo from '../pages/DetailLists/Addregister-two.vue' // 添加登记-类型选择
import Addbidders from '../pages/DetailLists/Addbidders.vue' // 添加联合竞买人
import Racketrecord from '../pages/DetailLists/Racketrecord.vue' // 网拍纪录
import Bidrecord from '../pages/DetailLists/Bidrecord.vue' // 出价记录
import Afterpat from '../pages/DetailLists/Afterpat.vue' // 拍后结款
import Uservisit from '../pages/DetailLists/Uservisit.vue' // 用户回访
import Costsettlement from '../pages/DetailLists/Costsettlement.vue' // 费用结算
import Finishedfile from '../pages/DetailLists/Finishedfile.vue' // 结案入档
import msgDetail from '../pages/DetailLists/msgDetail.vue' // 消息详情
import chooseCourt from '../pages/DetailLists/chooseCourt.vue' // 法院选择
import addFristPerson from '../pages/DetailLists/addFristPerson.vue' // 添加优先权人
import otherSuggest from '../pages/DetailLists/otherSuggest.vue' // 异议页面
import video from '../pages/DetailLists/video.vue' // 视频页面
import search from '../pages/search.vue' // 搜索页面
//共用的input输入框
import inputText from '../pages/DetailLists/inputText.vue'
import index from '../pages/index.vue'

import loading from '../pages/loading.vue'

// import Test from '../pages/DetailLists/test.vue'
Vue.use(Router)
    //路由模式默认使用hash

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login',
            meta: {
                title: '首页入口'
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/binding',
            component: Binding
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/detail',
            name: 'detail',
            meta: {
                title: ''
            },
            component: Detail,
        },
        {
            path: '/service',
            component: Service,
        },
        {
            path: '/message',
            component: Message,
        },
        {
            path: '/user',
            component: User,
        },
        {
            path: '/detail/servicetrack',
            component: ServiceTrack
        },
        {
            path: '/detail/add',
            component: Add,
            meta: {
                title: '添加案件'
            }
        },
        {
            path: '/detail/info',
            component: Info,
            meta: {
                title: '基本信息'
            }
        },
        {
            path: '/detail/voucher',
            component: Voucher,
            meta: {
                title: '处置凭证'
            }
        },
        {
            path: '/detail/report',
            component: report,
            meta: {
                title: '评估报告'
            }
        },
        {
            path: '/detail/ownership',
            component: Ownership,
            meta: {
                title: '权属调查（房地产）'
            }
        },
        {
            path: '/detail/ownership_ground',
            component: Ownership_ground,
            meta: {
                title: '权属调查（土地）'
            }
        },
        {
            path: '/detail/ownership_invisible',
            component: Ownership_invisible,
            meta: {
                title: '权属调查（无形资产）'
            }
        },
        {
            path: '/detail/ownership_stock',
            component: Ownership_stock,
            meta: {
                title: '权属调查（股权）'
            }
        },
        {
            path: '/detail/ownership_car',
            component: Ownership_car,
            meta: {
                title: '权属调查（机动车）'
            }
        },
        {
            path: '/detail/ownership_ship',
            component: Ownership_ship,
            meta: {
                title: '权属调查（船舶）'
            }
        },
        {
            path: '/detail/propertydelivery',
            name: 'propertydelivery',
            component: Propertydelivery,
            meta: {
                title: '财产交割'
            }
        },
        {
            path: '/detail/fieldinvestigation',
            name: 'fieldinvestigation',
            component: Fieldinvestigation,
            meta: {
                title: '实地勘察'
            }
        },
        {
            path: '/detail/pricesuggestion',
            component: PriceSuggestion,
            meta: {
                title: '价格建议'
            }
        },
        {
            path: '/detail/priorityperson',
            component: Priorityperson,
            meta: {
                title: '优先权人'
            }
        },
        {
            path: '/detail/auctiondoc',
            component: AuctionDoc,
            meta: {
                title: '拍卖文案'
            }
        },
        {
            path: '/detail/sampleservice',
            name: 'sampleservice',
            component: Sampleservice,
            meta: {
                title: '看样服务'
            }
        },
        {
            path: '/detail/registrationservices',
            component: Registrationservices,
            meta: {
                title: '登记服务'
            }
        },
        {
            path: '/detail/addregister',
            component: Addregister
        },
        {
            path: '/detail/addregistertwo',
            component: Addregistertwo
        },
        {
            path: '/detail/addbidders',
            component: Addbidders
        },
        {
            path: '/detail/racketrecord',
            name: 'racketrecord',
            component: Racketrecord,
            meta: {
                title: '网拍记录'
            }
        },
        {
            path: '/detail/bidrecord',
            name: 'bidrecord',
            component: Bidrecord,
            meta: {
                title: '竞买记录'
            }
        },
        {
            path: '/detail/afterpat',
            name: 'afterpat',
            component: Afterpat,
            meta: {
                title: '拍后结款'
            }
        },
        {
            path: '/detail/uservisit',
            component: Uservisit,
            meta: { title: '用户回访' }
        },
        {
            path: '/detail/costsettlement',
            name: 'costsettlement',
            component: Costsettlement,
            meta: { title: '费用结算' }
        },
        {
            path: '/detail/finishedfile',
            name: 'finishedfile',
            component: Finishedfile,
            meta: { title: '结案入档' }
        },
        {
            path: '/detail/scorefeedback',
            name: 'scorefeedback',
            component: ScoreFeedback,
            meta: { title: '评分反馈' }
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: '微信授权'
            }
        },
        // {
        //     path: '/detail/test',
        //     component: Test
        // }
        {
            path: '/detail/test2',
            component: Test2
        },
        {
            path: '/textinput',
            component: textInput
        },
        // {
        //     path: '/detail/test3',
        //     component: test3_upload
        // },
        {
            path: '/inputText',
            component: inputText
        },
        {
            path: '/testPag',
            component: testPag
        },
        {
            path: '/loading',
            component: loading
        },
        {
            path: '/detail/msgDetail',
            component: msgDetail
        },
        {
            path: '/detail/chooseCourt',
            name: 'chooseCourt',
            component: chooseCourt
        },
        {
            path: '/detail/addFristPerson',
            name: 'addFristPerson',
            component: addFristPerson
        },
        {
            path: '/detail/otherSuggest',
            name: 'otherSuggest',
            component: otherSuggest
        },
        {
            path: '/detail/video',
            name: 'video',
            component: video
        },
        {
            path: '/search',
            name: 'search',
            component: search
        }
    ]
})