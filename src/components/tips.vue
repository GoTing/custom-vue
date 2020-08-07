<!--
 * @Descripttion: 
 * @Version: 
 * @Date: 2019-05-22 17:25:20
-->
<template>
  <div class="myalert">
    {{msg}}
    <a class="close" @click="closeFn">确定</a>
  </div>
</template>

<script>
export default {
  name: "tips",
  props:{
        msg:{require:true}
  },
  data() {
    return {};
  },
  methods: {
   closeFn(){
     this.$emit('changeShowTips',false);
   }
  }
};
</script>
