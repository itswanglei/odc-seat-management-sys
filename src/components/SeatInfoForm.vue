<template>
  <el-dialog
    :visible.sync="visible"
    title="编辑座位信息"
    width="26%"
    top="10vh"
    :before-close="resetFields"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-position="left"
      label-width="95px"
      size="small"
    >
      <el-form-item label="座位编号" class="form-item">
        <el-input v-model="form.seatId" disabled></el-input>
      </el-form-item>
      <el-form-item label="显示器 #1" prop="monitor1">
        <el-input v-model="form.monitor1"></el-input>
      </el-form-item>
      <el-form-item label="显示器 #2" prop="monitor2">
        <el-input v-model="form.monitor2"></el-input>
      </el-form-item>
      <el-form-item label="显示器 #3" prop="monitor3">
        <el-input v-model="form.monitor3"></el-input>
      </el-form-item>
      <el-form-item label="Mac mini #1" prop="macmini1">
        <el-input v-model="form.macmini1"></el-input>
      </el-form-item>
      <el-form-item label="Mac mini #2" prop="macmini2">
        <el-input v-model="form.macmini2"></el-input>
      </el-form-item>
      <el-form-item v-if="region === 'greenRegion'" label="TC 盒子" prop="tc">
        <el-input v-model="form.tc"></el-input>
      </el-form-item>
      <el-form-item v-if="region === 'yellowRegion' || 'blueRegion'" label="PC" prop="pc">
        <el-input v-model="form.pc"></el-input>
      </el-form-item>
      <el-form-item label="使用人">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose('form')">取 消</el-button>
      <el-button type="primary" size="small" @click="handleSubmit('form')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Notification } from "element-ui";
import { mapState } from "vuex";
import { checkDeviceNumberExistance } from "../js/dataProcessor";

export default {
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
        pc: "",
        user: "",
        phone: ""
      },
      originForm: {},
      rules: {
        monitor1: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        monitor2: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        monitor3: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        macmini1: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        macmini2: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        tc: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        pc: [
          {
            type: "string",
            validator: this.validateDeviceNumber,
            trigger: "blur"
          }
        ],
        phone: [
          {
            type: "string",
            pattern: /^\d{11}$/,
            message: "联系电话应为11位数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["allSeatsData"]),
    region() {
      return this.$route.name;
    }
  },
  methods: {
    handleOpen(seatInfo) {
      this.visible = true;
      this.form = Object.assign({}, seatInfo);
      this.originForm = Object.assign({}, seatInfo);
    },
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.visible = false;
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("updateSeatsData", {
            region: this.region,
            seat: Object.assign({}, this.form)
          });
          Notification.success({
            title: "保存成功"
          });
          this.handleClose(formName);
          this.$emit("update-device-statistics");
        }
      });
    },
    resetFields(done) {
      this.$refs["form"].resetFields();
      done();
    },
    validateDeviceNumber(rule, value, callback) {
      const isValidFormat = value && !/^\d{8}$/.test(value);
      const isUpdated = this.originForm[rule.field] !== value;
      const existanceCheckResult = checkDeviceNumberExistance(
        value,
        this.allSeatsData
      );

      if (isValidFormat) {
        callback(new Error("设备编号应为8位数字"));
      } else if (value && isUpdated && existanceCheckResult.length > 0) {
        callback(new Error(`此编号已登记于${existanceCheckResult.join("、")}`));
      } else {
        callback();
      }
    }
  }
};
</script>

<style >
form .el-input {
  width: 230px;
}
</style>
