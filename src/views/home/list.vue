<template>
    <div class="list">
        <!-- <van-list
		v-model="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad"
		>
		<van-pull-refresh v-model="loading" @refresh="onRefresh">
			<ul class="goods-list">
				<li v-for="(item,index) in listData" :key="index" @click="shopClick(item.shopId,item.shopUrl)">
				
						<van-image
							width="46vw"
							height="46vw"
							fit="cover"
							:src="'web/shop/img/download.do?fileName='+item.thumbnail"
						/>
						<p class="name">{{item.shopName}}</p>
				
					
				</li>
			</ul>
		</van-pull-refresh>
			
		</van-list> -->
		<transition name="vux-pop-out">
			<div class="tips" v-if="isWxTaobao">
				<p>点击右上角按钮，然后在弹出菜单中，选择在浏览器中打开，体验不中断哦。</p>
				<img src="../../assets/images/top.png" width="42px" alt="">
		</div>
		</transition>
		 <van-list
		v-model="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad"
		>
			<van-pull-refresh v-model="loading" @refresh="onRefresh">
				<Waterfall :gutterHeight="10" :gutterWidth="gutterWidth">
					<WaterfallItem :width="itemWidth" class="goods-item"  v-for="(item,index) in listData" :key="index" @click.native="shopClick(item.shopId,item.shopUrl)">
							<van-image
								width="46vw"
								height="46vw"
								fit="cover"
								:src="'web/shop/img/download.do?fileName='+item.thumbnail"
							/>
							<p class="name">{{item.shopName}}</p>
					</WaterfallItem>
				</Waterfall>
			</van-pull-refresh>
		 </van-list>
		<div class="bottom-wrap">
			<van-button to="/home/join" class="bom-btn" type="primary" size="small">申请展位入驻</van-button>
		</div>
		
    </div>
</template>

<script>
	import axios from 'axios'
	// import Waterfall from 'vue-waterfall/lib/waterfall'
	// import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
	import {Waterfall, WaterfallItem} from 'vue2-waterfall';
    export default {
        data (){
			return{
				loading:false,
				finished:false,
				screen:{
					pageSize:10,
					nowPage:1
				},
				listData:[],
				itemWidth:180,
				gutterWidth:5,
				isWxTaobao:false,    //是否是微信浏览器打开淘宝
				timeout:null
			}
		},
		components:{
			Waterfall,
			WaterfallItem
		},
		methods:{
			onLoad (){
				this.screen.nowPage ++;
				this.getList()
			},
			getList (){
				this.loading = true;
				this.$api({
					url:'/app/api/queryShopList.do',
					params:this.screen
				}).then((result) => {
					this.loading = false;
					this.listData = [...this.listData,...result.results];
					if(result.results && result.results.length < this.screen.pageSize){
						this.finished = true;
					}
				}).catch((err) => {
				});
			},
			onRefresh (){
				setTimeout(()=>{
					this.listData = [];
					this.screen.nowPage = 1;
					this.finished = false;
					this.getList()
				},1000)
			},
			isWeiXin(){
				
					var ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/MicroMessenger/i) == 'micromessenger'){
						return true;
					}else{
						return false;
					}
				
			},
			shopClick (id,url){
				this.isWxTaobao = false;
				clearTimeout(this.timeout)
				axios({
					url:'/app/api/shopClick.do',
					method:'post',
					data:{
						shopId:id
					}
				})
				var u = navigator.userAgent, app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; 
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
				var isMyapp = this.$route.query.from;
				if(isMyapp){
					if(isiOS){
						try {
							jsContext.skipToSafari(url)
							// app_response = window.webkit.messageHandlers.skipToSafari.postMessag(url);
						} catch (e) {
							console.log(e)
						}
					}else if(isAndroid){

					}
				}else if(this.isWeiXin()){
					var disabledUrls=['tmall.com','taobao.com'];
					if(url.indexOf(disabledUrls[0]) > -1 || url.indexOf(disabledUrls[1]) > -1){
						// alert('weixin')
						this.isWxTaobao = true;
						this.timeout = setTimeout(()=>{
							this.isWxTaobao = false;
						},3000)
					}else{
						window.location.href = url;
					}
				}else{
					window.location.href = url;
				}
				
				
			},
			parseUrl (){

			}
		},
		created (){
			this.getList()
		},
		mounted() {
			this.$nextTick(()=>{
				this.itemWidth = window.innerWidth * 0.46;
				this.gutterWidth = window.innerWidth * 0.03;
			})
		},
    }
</script>

<style lang="less" scoped>
// .list /deep/ .waterfall-box{box-sizing: border-box}
	.vux-pop-out-enter-active,
	.vux-pop-out-leave-active
	{
		will-change: transform;
		transition: transform 500ms;
	}

  .vux-pop-out-enter {
    transform: translateY(-100%);
  }

  .vux-pop-out-leave-active {
    transform: translateY(-100%);
  }
	.tips{
		// width: 
		width: 100%;
		box-sizing: border-box;
		padding: 10px 25px;
		background-color: #fc6600;
		opacity: 0.85;
		color: #fff;
		display: flex;
		justify-content: space-around;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		img{
			width: 42px;
			height: 31px;
		}

	}
	.list
		
		/deep/ {
			.van-list{
				padding-bottom: 50px;
			}
		}
	.list{
		background-color: #F7F7F9;
		padding-top: 10px; 
	}
	.bottom-wrap{
		width: 100%;
		height: 60px;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		.bom-btn{
			width: 80%;
			display: block;
			margin: 7.5px auto 0 auto;
		}
	}
	.goods-item{
		width: 100%;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		margin-bottom: 10px;
		// flex: flex-grow;
		height: auto;
		// padding: 0 8px;
		// box-sizing: border-box;
		.name{
			// height: 21px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-align: left;
		}
	}
	.goods-list{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		background-color: #F7F7F9;
		padding: 0 5px;
		li{
			width: 46vw;
			background-color: #fff;
			border-radius: 5px;
			overflow: hidden;
			margin-bottom: 10px;
			// flex: flex-grow;
			height: auto;
			.name{
				// height: 21px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
	}
</style>