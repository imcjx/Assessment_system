<template>
    <div>
        <div class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>教师信息</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card class="box-card">
                <div class="card-header">
                    <el-input placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                    </el-input>
                    <el-button type="primary" @click="addDialogVisible = true">添加教师</el-button>
                </div>
                <div class="card-main">
                    <el-table border stripe
                        :data="tmpList"
                        style="width: 100%">
                        <el-table-column
                            label="#"
                            type="index">
                        </el-table-column>
                        <el-table-column
                            prop="tId"
                            label="教师编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="tName"
                            label="教师姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="tEmail"
                            label="教师邮箱">
                        </el-table-column>
                        <el-table-column
                            prop="tEmail"
                            label="操作"
                            width="200">
                            <template slot-scope="scope">
                                <el-tooltip effect="dark" content="编辑信息" placement="top" :enterable="false">
                                    <el-button @click="showEditDialog(scope.row.tId)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="删除信息" placement="top" :enterable="false">
                                    <el-button @click="showDeleteDialog(scope.row.tId)" type="danger" icon="el-icon-delete" size="mini"></el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="重置密码" placement="top" :enterable="false">
                                    <el-button @click="showResetDialog(scope.row.tId)" type="warning" icon="el-icon-setting" size="mini"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[1, 2, 5, 10]"
                        :page-size="7"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-card>

            <!-- 添加用户对话框 -->
            <el-dialog
                class="addTeacher"
                title="添加教师"
                :visible.sync="addDialogVisible"
                width="40%">
                <ul>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>账户</span>
                        <el-input
                            placeholder="请输入教师账户"
                            v-model="addTeacher.username">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>密码</span>
                        <el-input
                            placeholder="请输入教师密码"
                            v-model="addTeacher.password">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>姓名</span>
                        <el-input
                            placeholder="请输入教师姓名"
                            v-model="addTeacher.name">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>邮箱</span>
                        <el-input
                            placeholder="请输入教师邮箱"
                            v-model="addTeacher.email">
                        </el-input>
                    </li>   
                </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户对话框 -->
            <el-dialog
                class="editTeacher"
                title="修改教师信息"
                :visible.sync="editDialogVisible"
                width="40%">
                <ul>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;opacity: 0;">* </span>编号</span>
                        <el-input
                            :placeholder="editTeacher.tId"
                            :disabled="true">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>姓名</span>
                        <el-input
                            placeholder="请输入修改的姓名"
                            v-model="editTeacher.name">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>邮箱</span>
                        <el-input
                            placeholder="请输入修改的邮箱"
                            v-model="editTeacher.email">
                        </el-input>
                    </li>  
                </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editTeacherFun">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 删除用户对话框 -->
            <el-dialog
                title="删除信息确认"
                :visible.sync="deleteDialogVisible"
                width="30%">
                <span style="font-weight:bold;">确认要删除该老师<span style="color: red">！？？</span></span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteTeacherFun">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 重置密码对话框 -->
            <el-dialog
                title="重置密码确认"
                :visible.sync="resetDialogVisible"
                width="30%">
                <span style="font-weight:bold;">确认要重置该老师密码吗<span style="color: red">！？？</span></span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="resetTeacherFun">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            //重置密码老师ID
            resetTeacherId: '',
            //删除老师Id
            deleteTeacherId: '',
            //编辑老师信息
            editTeacher: {
                tId: '',
                name: '',
                email: '',
            },
            //添加老师信息
            addTeacher: {
                username: '',
                name: '',
                email: '',
                password: '',
            },
            //对话框
            addDialogVisible: false,
            editDialogVisible: false,
            deleteDialogVisible: false,
            resetDialogVisible: false,
            //记录总数
            total:'',
            //当前页面
            currentPage: 1,
            //搜索信息
            searchInfo: '',
            //展示数组
            tmpList: [],
            teacherList: [
                {
                    tId:'0123',
                    tName: '蔡家鑫',
                    tEmail: '850839565@qq.com'
                },
                {
                    tId:'0124',
                    tName: '陈毅力',
                    tEmail: '777777777@qq.com'
                },
                {
                    tId:'0125',
                    tName: '陈舒凯',
                    tEmail: '999999997@qq.com'
                },
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '陈舒凯',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
                {tId:'0125',tName: '蔡好',tEmail: '999999997@qq.com'},
            ],
        }
    },
    created(){
        this.initTmpList();
    },
    methods: {
        //初始化tmpList
        initTmpList(){
            this.tmpList=[];
            const len=Math.min(7,this.teacherList.length);
            for(let i=0;i<len;i++){
                this.tmpList.push(this.teacherList[i]);
            }
            this.total=this.teacherList.length;
        },
        //获取老师信息
        getTeacherList(){

        },
        //
        handleSizeChange(newSIze){},
        handleCurrentChange(newPage){
            this.tmpList=[];
            const len=Math.min(newPage*7,this.searchTeacher(this.teacherList).length);
            for(let i=newPage*7-7;i<len;i++){
                this.tmpList.push(this.searchTeacher(this.teacherList)[i]);
            }
            this.currentPage=newPage;
        },
        //搜索老师
        searchTeacher(arr){
            const info=this.searchInfo.trim();
            const newList=arr.filter(item => {
            if(item.tName.includes(info)){
                return item;
                }
            });
            return newList;
        },
        search(){
            this.tmpList=this.searchTeacher(this.teacherList);
            this.total=this.tmpList.length;
            if(this.total==0) return;
            let page;
            if(this.tmpList.length%7==0) page=this.tmpList.length/7;
            else page=Math.floor(this.tmpList.length/7)+1;
            page = Math.min(page,this.currentPage);
            const len=Math.min(page*7,this.tmpList.length);
            let tmp=[];
            for(let i=page*7-7;i<len;i++){
                tmp.push(this.tmpList[i]);
            }
            this.tmpList=tmp;
        },
        //展示编辑用户对话框,修改信息
        showEditDialog(id){
            this.editDialogVisible=true;
            this.editTeacher.tId=id;
        },
        //展示删除用户对话框
        showDeleteDialog(id){
            this.deleteDialogVisible=true;
            this.deleteTeacherId=id;
        },
        //展示重置密码对话框
        showResetDialog(id){
            this.resetDialogVisible=true;
            this.resetTeacherId=id;
        },
        //删除用户事件
        deleteTeacherFun(){
            this.deleteDialogVisible=false;
            console.log(this.deleteTeacherId);
        },
        //修改用户事件
        editTeacherFun(){
            this.editDialogVisible=false;
            console.log(this.editTeacher.tId);
        },
        //重置密码事件
        resetTeacherFun(){
            this.resetDialogVisible=false;
            console.log(this.resetTeacherId);
        }
    }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
  box-sizing: border-box;
}

.container{
    padding: 20px;
}

.el-breadcrumb{
    margin-bottom: 15px;
}

.card-header .el-input{
    width: 30%;
    margin-right: 20px;
    margin-bottom: 10px;
}

.addTeacher span , .editTeacher span{
    font-size: 18px
}

li{
    margin-bottom: 20px;
    list-style: none;
}

.addTeacher .el-input , .editTeacher .el-input{
    width: 70%;
}

</style>