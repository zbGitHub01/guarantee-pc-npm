import Formily from './Formily.vue'

import { message, Modal } from 'ant-design-vue';

const coms = [
    Formily,
]

const install = function(Vue){
    // 全局注册所有组件
    coms.forEach(item => {
        Vue.component(item.name, item)
    })
    Vue.prototype.$message = message;
    Vue.prototype.$confirm = Modal.confirm;
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default install;