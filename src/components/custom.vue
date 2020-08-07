<!--
 * @Descripttion: 
 * @Version: 
 * @Date: 2019-05-22 17:25:20
-->
<template>
  <div class="wx-page">
    <h3>自定义菜单</h3>
    <div class="nav_co custom">
      <div class="msg">
        <p style="float: left;margin-right: 10px">
          <img
            src="http://static.yuntongauto.com/web/manage/images/look.png"
            alt=""
            style="margin-top:5px;"
          />
        </p>
        <p class="left">
          菜单编辑中
          <br />菜单未发布，请确认菜单编辑完成后点击“保存”，点击“发布”同步到手机。
        </p>
      </div>
      <!--手机显示的菜单栏-->
      <div class="left phone_box">
        <div class="box1">
          <img
            src="http://static.yuntongauto.com/web/manage/images/phone.png"
            alt=""
          />
          <div class="bto">
            <div class="btn_menu" v-for="(item, index) in menuList">
              <template v-if="menuList[index].addContentMenuFlag">
                <div
                  v-for="(v, q) in menuList[index].contentMenuList"
                  class="zicaidan"
                  :style="' top:' + (-50 * (q + 2) - 19) + 'px'"
                  @click.stop="editMinMenu(index, q)"
                >
                  <b @click.stop="deleteMinMenu(index, q)">&times;</b>
                  {{ v.menuListName }}
                  <em
                    class=" arrow"
                    v-show="sortShow"
                    @click.stop="upSort(index, q)"
                  ></em>
                </div>
              </template>
              <span
                v-html="
                  menuList[index].menuListName == null
                    ? '<i></i>'
                    : menuList[index].menuListName.trim().length == 0
                    ? '<i></i>'
                    : menuList[index].menuListName
                "
                @mouseover.stop="onMouseOver(index)"
                @mouseleave.stop="onMouseOut(index)"
                @click="editMenu(index, $event)"
              ></span>
              <b
                v-show="item.closeFlag"
                @click.stop="deleteMenu(index)"
                @mouseover.stop="onMouseOver(index)"
                @mouseleave.stop="onMouseOut(index)"
                >&times;</b
              >
              <a
                href="javascript:void(0)"
                class="btn_top"
                v-show="
                  menuList[index].menuListName == null
                    ? false
                    : menuList[index].addContentMenuFlag
                "
              >
                <div class="addzi" @click.stop="addMinMenu(index)"><i></i></div>
              </a>
            </div>
          </div>
        </div>
        <a
          href="javascript:void(0)"
          class="send send1 left"
          id="up_num"
          @click="toggleSortBtn"
          >菜单排序</a
        >
      </div>
      <div class="cont left content">
        <div class="pad_120 pad1">
          <p class="mainTit">菜单编辑</p>
          <p class="myp">
            <span class="left">菜单名称</span>
            <span class="left"
              ><input
                class="name_input"
                type="text"
                maxlength="16"
                placeholder="菜单名称"
               
                v-model="currentMenu.menuName"
                id="mytitle1"
            /></span>
          </p>
          <p class="myp">
            <span class="left">&nbsp;</span>
            <span class="left cor_gay">字数不超过8个汉字或16个字母</span>
          </p>
          <p class="myp">
            <span class="left">菜单内容</span>
            <label for="sendmsg"
              ><span class="left">
                <input
                  type="radio"
                  id="sendmsg"
                  name="menu"
                  @change="tabBtn(1)"
                />发送消息</span
              ></label
            >
            <label for="sendmsg3"
              ><span class="left">
                <input
                  type="radio"
                  checked
                  id="sendmsg3"
                  @change="tabBtn(2)"
                  name="menu"
                />
                跳转网页</span
              ></label
            >
          </p>
          <div class="sendcont " v-show="!tabContFlag">
            <div class="nav1">
              <a href="javascript:void(0)" @click="changeContType('text')">
                <em></em>文字
              </a>
              <a href="javascript:void(0)" @click="changeContType('img')">
                <em></em>图片
              </a>
            </div>
            <div class="txt" v-show="contType == 'text' ? true : false">
              <textarea class="myarea" v-model="currentMenu.menuText"></textarea>
            </div>
            <div class="txt" v-show="contType == 'img' ? true : false">
              <div class="txt1">
                <img
                  src="http://static.yuntongauto.com/web/manage/images/shangchuan.jpg"
                  alt=""
                  style="margin-top: 32px"
                />
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upImg"
                  ref="imgInput"
                />
              </div>
              <div class="txt1">
                <img :src="currentMenu.menuImgData"  class="show_img" />
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="menu_cont " v-show="tabContFlag">
            <p>订阅用户点击该菜单会跳到以下链接</p>
            <label for="urlText1" class="frm_label">页面地址</label>
            <input
              type="text"
              class="frm_input urlz"
              id="urlText1"
              placeholder="请输入网址"
               v-model="currentMenu.menuLinks"
            />
            <p class="urlz-error">不需要填写 https://</p>
          </div>
        </div>
        <a
          href="javascript:void(0)"
          class="send send2 left"
          id="save"
          @click="save(null)"
          >保存</a
        >
        <a
          href="javascript:void(0)"
          class="send send1 left"
          id="publish"
          @click="send"
          >发布</a
        >
      </div>
      <div class="clear"></div>
    </div>
    <tips
      :msg="msg"
      @changeShowTips="changeShowTips"
      v-show="showTipsFlag"
    ></tips>
  </div>
</template>

<script>
import tips from "./tips.vue";
export default {
  name: "custom",
  components: { tips },
  data() {
    return {
      sortShow: false,
      showTipsFlag: false,
      msg: "",
      currentMenu: {
        indexParent: 0,
        indexChild: 0,
        menuName: "",
        menuLinks: "",
        menuImgData: "",
        menuText: ""
      },
      tabContFlag: true,
      contType: "text",

      menuList: [
        {
          menuListName: "菜单名称1",
          menuText: "",
          menuLinks: "",
          menuImgData: "",
          deleteFlag: false,
          addContentMenuFlag: false,
          closeFlag: false,
          contentMenuList: [
            {
              menuListName: "子菜单1",
              menuText: "",
              menuLinks: "",
              menuImgData: "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1597396643&t=28144bd213757ee283bfedca5e835a2a"
            }
          ]
        },
        {
          menuListName: "默认菜单2",
          menuLinks: "",
          deleteFlag: false,
          closeFlag: false,
          addContentMenuFlag: false,
          contentMenuList: [
            {
              menuListName: "子菜单1",
              menuText: "www.baidu.com",
              menuLinks: "www.baidu.com",
              menuImgData: ""
            }
          ]
        },
        {
          menuListName: null,
          menuLinks: "",
          deleteFlag: false,
          closeFlag: false,
          addContentMenuFlag: false,
          contentMenuList: []
        }
      ]
    };
  },
  methods: {
    editMenu(index) {
      if (!!this.menuList[index].menuListName) {
        this.menuList[index].addContentMenuFlag = !this.menuList[index]
          .addContentMenuFlag;
        this.currentMenu.menuName = this.menuList[index].menuListName;
        this.currentMenu.menuLinks = this.menuList[index].menuLinks;
      } else {
        this.menuList[index].menuListName = "默认菜单名称";
      }
      console.log(this.menuList);
    },
    editMinMenu(index, minMenuIndex) {
      this.currentMenu.menuName = this.menuList[index].contentMenuList[
        minMenuIndex
      ].menuListName;

      this.currentMenu.menuLinks = this.menuList[index].contentMenuList[
        minMenuIndex
      ].menuLinks;
      this.currentMenu.menuText = this.menuList[index].contentMenuList[
        minMenuIndex
      ].menuText;
      this.currentMenu.menuImgData = this.menuList[index].contentMenuList[
        minMenuIndex
      ].menuImgData;
      this.currentMenu.indexParent = index;
      this.currentMenu.indexChild = minMenuIndex;
    },
    // 移入移出效果
    onMouseOver(index) {
      this.menuList[index].closeFlag = true;
    },
    onMouseOut(index) {
      this.menuList[index].closeFlag = false;
    },
    deleteMenu(index) {
      console.log(this.menuList[index].contentMenuList);
      if (this.menuList[index].contentMenuList.length > 0) {
        this.showTipsFlag = true;
        this.msg = "当前菜单下有子菜单，不可删除";
      } else {
        this.menuList[index].menuListName = null;
      }
    },
    addMinMenu(index) {
      if (this.menuList[index].contentMenuList.length < 6) {
        this.menuList[index].contentMenuList.push({
          menuListName: "新子菜单"
        });
      } else {
        this.showTipsFlag = true;
        this.msg = "最多添加6个子菜单";
      }
    },
    changeShowTips(data) {
      this.showTipsFlag = data;
    },
    toggleSortBtn() {
      this.sortShow = !this.sortShow;
    },
    deleteMinMenu(index, menuIndex) {
      this.menuList[index].contentMenuList.splice(menuIndex, 1);
    },
    upSort(index, menuIndex) {
      var menuObj = this.menuList[index].contentMenuList[menuIndex];
      this.menuList[index].contentMenuList.splice(menuIndex, 1);
      this.menuList[index].contentMenuList.push(menuObj);
    },
    tabBtn(type) {
      if (type == 1) {
        this.tabContFlag = false;
      } else {
        this.tabContFlag = true;
      }
    },
    changeContType(type) {
      this.contType = type;
    },
    upImg(files) {
      // console.log(files)
      var that = this;
      let fileList = this.$refs.imgInput.files;
      // if(files && files.length>0){
      if (!fileList || !window.FileReader) {
        this.showTipsFlag = true;
        this.msg = "浏览器不支持图片上传";
        return;
      } else {
        let file = fileList[0];
        let reader = new FileReader();

        reader.onload = e => {
          that.currentMenu.menuImgData = reader.result;
        };
        reader.readAsDataURL(file);
      }
      // }
    },
    save(callback) {
      let obj=this.menuList[this.currentMenu.indexParent].contentMenuList[
        this.currentMenu.indexChild
      ]
      obj.menuListName=this.currentMenu.menuName;
      obj.menuImgData=this.currentMenu.menuImgData;
      obj.menuText=this.currentMenu.menuText;
      obj.menuLinks=this.currentMenu.menuLinks;
      
      if(!!callback ){
        callback()
      }
    },
    send() {
      this.save(() => {
        this.showTipsFlag = true;
        this.msg = "发布成功";
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.name_input {
  height: 30px;
  width: 275px;
  text-indent: 10px;
  border: 1px solid #e7e7eb;
}
.show_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
