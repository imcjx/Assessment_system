import Vue from 'vue'
import { 
    Button,
    Input,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Table,
    TableColumn,
    Tooltip,
    Pagination,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
} from 'element-ui'
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.prototype.$message=Message
