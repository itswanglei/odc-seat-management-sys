<template>
  <el-dialog
    :visible.sync="visible"
    title="编辑座位信息"
    width="26%"
    :before-close="resetFields"
    @open="handleOpen"
  >
    <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="95px">
      <el-form-item label="座位编号">
        <el-input v-model="form.seatId" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="显示器 #1" prop="monitor1">
        <el-input v-model="form.monitor1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="显示器 #2" prop="monitor2">
        <el-input v-model="form.monitor2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="显示器 #3" prop="monitor3">
        <el-input v-model="form.monitor3" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Mac mini #1" prop="macmini">
        <el-input v-model="form.macmini1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Mac mini #2" prop="macmini">
        <el-input v-model="form.macmini2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="TC 盒子" prop="tc">
        <el-input v-model="form.tc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="使用人">
        <el-input v-model="form.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose('form')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('form')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: [
    "seatId",
    "monitor1",
    "monitor2",
    "monitor3",
    "macmini1",
    "macmini2",
    "tc",
    "user",
    "phone"
  ],
  data() {
    return {
      visible: false,
      form: {
        seatId: "",
        monitor1: "",
        monitor2: "",
        monitor3: "",
        macmini1: "",
        macmini2: "",
        tc: "",
        user: "",
        phone: ""
      },
      rules: {
        monitor1: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "设备编号应为8位数字",
            trigger: "blur"
          }
        ],
        monitor2: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "设备编号应为8位数字",
            trigger: "blur"
          }
        ],
        monitor3: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "设备编号应为8位数字",
            trigger: "blur"
          }
        ],
        macmini1: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "设备编号应为8位数字",
            trigger: "blur"
          }
        ],
        macmini2: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "设备编号应为8位数字",
            trigger: "blur"
          }
        ],
        tc: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "设备编号应为8位数字",
            trigger: "blur"
          }
        ],
        phone: [
          {
            type: "string",
            pattern: /^\d{8}$/,
            message: "联系电话应为11位数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
      this.$nextTick(() => {
        this.form.seatId = this.seatId;
        this.form.monitor1 = this.monitor1;
        this.form.monitor2 = this.monitor2;
        this.form.monitor3 = this.monitor3;
        this.form.macmini1 = this.macmini1;
        this.form.macmini2 = this.macmini2;
        this.form.tc = this.tc;
        this.form.user = this.user;
        this.form.phone = this.phone;
      });
    },
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.visible = false;
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submit", this.form);
          this.$refs[formName].resetFields();
          this.visible = false;
        }
      });
    },
    resetFields(done) {
      this.$refs["form"].resetFields();
      done();
    }
  }
};
</script>