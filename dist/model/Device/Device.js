"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Device = void 0;

var schedule = _interopRequireWildcard(require("node-schedule"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Device {
  constructor(timeRange) {
    this.timeRange = timeRange;
    this.realTimeRange = {
      start: baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.start,
      end: baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.end
    }; // 凌晨更新时间

    schedule.scheduleJob('1 0 0 * * *', () => {
      this.realTimeRange.start = baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.start;
      this.realTimeRange.end = baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.end;
    });
  }

}

exports.Device = Device;

function baseTimeStamp() {
  return new Date(new Date().toLocaleDateString()).getTime();
}