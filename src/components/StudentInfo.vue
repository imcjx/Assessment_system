<template>
    <div>
        <div class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/teacher/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            </el-breadcrumb>
             <el-card class="box-card">
                <div class="card-header">
                    <el-input placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-dropdown split-button type="primary" @command="handleCommand" style="margin-right: 20px">
                        {{this.chooseClass}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in ClassInfo" :key="item.classId" :command="item.className">
                                {{item.className}}({{item.classId}})
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" style="margin-right:10px" @click="showCreateDialog">创建班级</el-button>
                    <el-button type="primary" style="margin-right:10px" @click="showAddDialog">添加学生</el-button>
                    <el-button type="primary" @click="showAddLotsDialog">批量导入</el-button>     
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
                            prop="sId"
                            label="学生编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="sName"
                            label="学生姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="sEmail"
                            label="学生邮箱">
                        </el-table-column>
                        <el-table-column
                            prop="tEmail"
                            label="操作"
                            width="200">
                            <template slot-scope="scope">
                                <el-tooltip effect="dark" content="编辑信息" placement="top" :enterable="false">
                                    <el-button  @click="showEditDialog(scope.row.tId)" type="primary" icon="el-icon-edit" size="mini"></el-button>
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

            <!-- 创建班级对话框 -->
            <el-dialog
                class="createClass"
                title="创建班级"
                :visible.sync="createDialogVisible"
                width="30%">
                <ul>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>名称</span>
                        <el-input
                            placeholder="请输入班级名称"
                            v-model="createClassName">
                        </el-input>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="createDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 添加学生对话框 -->
            <el-dialog
                class="addStudent"
                title="添加学生"
                :visible.sync="addDialogVisible"
                width="30%">
                <ul>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>姓名</span>
                        <el-input
                            placeholder="请输入学生姓名"
                            v-model="createClassName">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>编号</span>
                        <el-input
                            placeholder="请输入加入班级编号"
                            v-model="createClassName">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>账户</span>
                        <el-input
                            placeholder="请输入学生账户"
                            v-model="createClassName">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>密码</span>
                        <el-input
                            placeholder="请输入学生密码"
                            v-model="createClassName">
                        </el-input>
                    </li>
                    <li>
                        <span style="margin-right: 20px"><span style="color: red;">* </span>邮箱</span>
                        <el-input
                            placeholder="请输入学生邮箱"
                            v-model="createClassName">
                        </el-input>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 批量导入对话框 -->
            <el-dialog
                class="addStudent"
                title="批量导入"
                :visible.sync="addLotsDialogVisible"
                width="30%">
                <div class="upload">
                    <div style="font-weight:bold;margin-bottom:10px">请按模板进行导入：</div>
                    <el-input
                        type="text"
                        size="mini"
                        v-model="excelName"
                        style="width:300px;marginRight:20px;"
                    ></el-input>
                    <input
                        type="file"
                        id="uploadExcel"
                        ref="uploadExcel"
                        v-show="false"
                        accept=".xls, .xlsx, .excel"
                        @change="readExcel"
                    />
                    <label for="uploadExcel">浏览</label>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addLotsDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addLotsDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户对话框 -->！！！！！！！！！！！！
            <!-- <el-dialog
                class="editStudent"
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
            </el-dialog> -->
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            //导入文档名字
            excelName: '导入会员模板.xls',
            total: 0,
            currentPage: 1,
            ClassInfo: [
                {classId:'001',className:'灿辉1班'},
                {classId:'002',className:'灿辉2班'},
                {classId:'003',className:'灿辉3班'},
            ],
            chooseClass: '选择班级',
            searchInfo: '',
            tmpList: [],
            studentList: [
                {sId:'001',sName:'蔡家鑫',sEmail:'850839565@qq.com'},
                {sId:'002',sName:'蔡家鑫10',sEmail:'850839565@qq.com'},
                {sId:'003',sName:'蔡家鑫1',sEmail:'850839565@qq.com'},
                {sId:'004',sName:'蔡家鑫11',sEmail:'850839565@qq.com'},
                {sId:'005',sName:'蔡家鑫111',sEmail:'850839565@qq.com'},
                {sId:'006',sName:'蔡家鑫1111',sEmail:'850839565@qq.com'},
                {sId:'007',sName:'蔡家鑫11111',sEmail:'850839565@qq.com'},
                {sId:'008',sName:'蔡家鑫111111',sEmail:'850839565@qq.com'},
                {sId:'009',sName:'蔡家鑫111111110',sEmail:'850839565@qq.com'},
                {sId:'010',sName:'蔡家鑫',sEmail:'850839565@qq.com'},
                {sId:'011',sName:'蔡家鑫00',sEmail:'850839565@qq.com'},
                {sId:'012',sName:'蔡家鑫0',sEmail:'850839565@qq.com'},
                {sId:'013',sName:'蔡家鑫0',sEmail:'850839565@qq.com'},
                {sId:'014',sName:'蔡家鑫000',sEmail:'850839565@qq.com'},
                {sId:'015',sName:'蔡家鑫000',sEmail:'850839565@qq.com'},
                {sId:'016',sName:'蔡家鑫000',sEmail:'850839565@qq.com'},
                {sId:'017',sName:'蔡家鑫10000',sEmail:'850839565@qq.com'},
                {sId:'018',sName:'蔡家鑫0',sEmail:'850839565@qq.com'},
            ],
            addStudent:{
                sName:'',
                sClass:'',
                sUserName:'',
                sPassword:'',
                sEmail: '',
            },
            createClassName: '',
            createDialogVisible: false,
            addDialogVisible: false,
            addLotsDialogVisible: false,
        }
    },
    created(){

    },
    methods:{
        handleSizeChange(newSize){},
        handleCurrentChange(newPage){
            this.tmpList=[];
            const len=Math.min(newPage*7,this.searchStudent(this.studentList).length);
            console.log(len);
            for(let i=newPage*7-7;i<len;i++){
                this.tmpList.push(this.searchStudent(this.studentList)[i]);
            }
            this.currentPage=newPage;
        },
        //选择班级
        handleCommand(command){
            this.chooseClass=command;
            //……请求获得学生列表
            this.tmpList=[];
            const len=Math.min(7,this.studentList.length);
            for(let i=0;i<len;i++){
                this.tmpList.push(this.studentList[i]);
            }
            this.total=this.studentList.length;
        },
        //搜索学生
        searchStudent(arr){
            const info=this.searchInfo.trim();
            const newList=arr.filter(item => {
            if(item.sName.includes(info)){
                return item;
                }
            });
            return newList;
        },
        search(){
            this.tmpList=this.searchStudent(this.studentList);
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
        
        showCreateDialog(){
            this.createDialogVisible=true;
        },
        showAddDialog(){
            this.addDialogVisible=true;
        },
        showAddLotsDialog(){
            this.addLotsDialogVisible=true;
        },
        showEditDialog(id){

        },
        //读取文件
        readExcel (event) {
            let fileList = event.target.files;
            this.excelName = fileList[0].name
            this.excelFile = this.$refs.uploadExcel.files[0];
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

.createClass span , .addStudent span{
    font-size: 18px
}

li{
    margin-bottom: 20px;
    list-style: none;
}

.createClass .el-input , .addStudent .el-input{
    width: 70%;
}

.upload label{
    cursor:pointer;
    border-radius:5px;
    color:white;
    display:inline-block;
    padding:8px 10px;
    letter-spacing: 1.5px;
    background:rgb(64,158,255)
}

.upload label:hover{
    opacity: 0.7;
}
</style>