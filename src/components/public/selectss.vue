<template>
  <el-select
    v-model="svalue"
    sPlaceholder="全部"
    @change="sChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        svalue: this.value
      };
    },
    methods: {
      sChange() {
        this.$emit("sChange");
      }
    },
    watch: {
      value(newVal) {
        this.svalue = newVal;
      },
      svalue(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit("input", this.svalue);
        }
      }
    }
  };
</script>
