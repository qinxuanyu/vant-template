<template>
    <div >
        <img src="../../assets/images/join_bg.png" alt="join_bg" class="join_bg"> 
        <div class="tips">
            <h1 class="l-title">猎吧推广平台优势</h1>
        </div>
        <div class="img-box">
           <div>
                <img src="../../assets/images/item1.png" alt="">
           </div>
           <div>
                <img src="../../assets/images/item2.png" alt="">
           </div>
           <div>
                <img src="../../assets/images/item3.png" alt="">
           </div>
        </div>
        <div class="tips">
            <h1 class="l-title">申请人信息填写</h1>
            <p>请完整正确填写申请人信息，平台届时会与您联系合作</p>
        </div>
        
        <van-cell-group>
            <van-field
                v-model="form.userName"
                autosize
                label="姓名"
                type=""
                placeholder="请输入姓名"
            />
            <van-field
                v-model="form.userPhone"
                autosize
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                readonly
                clickable
                label="展品所属平台"
                :value="value"
                placeholder="选择平台"
                is-link
                autosize
                arrow-direction="down"
                @click="showPicker = true"
            />
             <van-field
                v-model="form.shopName"
                label="网店店铺名称"
                autosize
                placeholder="请输入店铺名称"
            />
        </van-cell-group>
        <van-button class="bom-btn" type="primary" @click="submit">提交</van-button>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import tool from '@/utils/tool'
    export default {
        data (){
            return{
                value:'淘宝',
                showPicker: false,
                columns: [{
                    text:'淘宝',
                    value:0
                },{
                    text:'京东',
                    value:1
                },
                // {
                //     text:'拼多多',
                //     value:2
                // },
                // {
                //     text:'苏宁易购',
                //     value:3
                // }
                ],
                form:{
                    userPhone:'',
                    userName:'',
                    type:0,
                    shopName:''
                }
            }
        },
        methods:{
            onConfirm(data){
                this.showPicker = false;
                this.form.type = data.value;
                this.value = data.text;
            },
            submit (){
           
                for (const key in this.form) {
                    if(this.form[key] === "" || this.form[key] === null){
                        console.log(this.form[key]);
                        return this.$notify({type:'danger',message:'请填写完整内容'})
                    }
                }
                if(!tool.utils.isCNPhone(this.form.userPhone)){
                    this.$notify({type:'danger',message:'请输入正确的手机号'})
                    return
                }
                this.$api({
                    url:'/app/api/addApplyBooth.do',
                    method:'post',
                    data:this.form
                }).then((result) => {
                    // this.$notify('请填写完整内容')
                    this.$dialog.alert({
                        title:'提交成功',
                        message: '猎吧平台会届时与您联系商议合作'
                    }).then(() => {
                    // on close
                        this.$router.go(-1)
                    });
                    console.log(result);
                }).catch((err) => {
                    
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .join_bg{
        display: block;
        width: 100%;
    }
    .img-box{
        display: flex;
        justify-content: space-around;
        img{
            display: block;
            height: auto;
            width: 30vw;
        }
    }
    .van-cell{
        padding: 16px 16px 10px 16px;
    }
    .tips{
        padding: 15px;
        .l-title{
            font-size: 16px;
            color: #000000; 
            font-weight: 600;
        }
        p{
            color: #BDBEBE;
        }
    }
    .bom-btn{
        width: 90%;
        display: block;
        margin: 15px auto;
    }
</style>