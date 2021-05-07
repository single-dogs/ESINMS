"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeRule = exports.DeviceState = exports.Rule = void 0;

class Rule {}

exports.Rule = Rule;
let DeviceState;
exports.DeviceState = DeviceState;

(function (DeviceState) {
  DeviceState[DeviceState["BEFORE_WORK"] = 0] = "BEFORE_WORK";
  DeviceState[DeviceState["LATE_WORK"] = 1] = "LATE_WORK";
  DeviceState[DeviceState["AT_WORK"] = 2] = "AT_WORK";
  DeviceState[DeviceState["LEAVE_WORK"] = 3] = "LEAVE_WORK";
  DeviceState[DeviceState["AFTER_WORK"] = 4] = "AFTER_WORK";
})(DeviceState || (exports.DeviceState = DeviceState = {}));

class TimeRule extends Rule {
  constructor({
    device
  }) {
    super();
    this.device = device;
    this.deviceState = DeviceState.BEFORE_WORK;
  }

  resolveData(data) {
    if (Date.now() <= this.device.realTimeRange.start) {
      // 上班前的时间
      if (this.deviceState == DeviceState.BEFORE_WORK) {
        // 打卡
        this.deviceState = DeviceState.AT_WORK;
      }
    } else if (Date.now() <= this.device.realTimeRange.end) {
      // 上班中的时间
      if (data.online) {
        // 开启设备
        this.deviceState = DeviceState.AT_WORK;
      } else {
        // 未开启设备
        if (this.deviceState == DeviceState.BEFORE_WORK) {
          // 迟到
          this.device.pushViolation({
            timestamp: Date.now(),
            message: '迟到'
          });
          this.deviceState = DeviceState.LATE_WORK;
        } else if (this.deviceState == DeviceState.AT_WORK) {
          // 早退
          this.device.pushViolation({
            timestamp: Date.now(),
            message: '早退'
          });
          this.deviceState = DeviceState.LEAVE_WORK;
        }
      }
    } else {
      // 下班后的时间
      this.deviceState = DeviceState.AFTER_WORK;
    }
  }

}

exports.TimeRule = TimeRule;