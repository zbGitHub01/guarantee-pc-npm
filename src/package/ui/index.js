import OrderStatus from './OrderStatus.vue'
import PlateTitle from './PlateTitle.vue'
import ApplyInvoice from './ApplyInvoice.vue'
import Description from './Description.vue'
import DocumentDialog from './DocumentDialog.vue'
import Progress from './Progress.vue'

import { message, Modal } from 'ant-design-vue';

const coms = [
    OrderStatus,
    PlateTitle,
    ApplyInvoice,
    Description,
    DocumentDialog,
    Progress,
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