"use strict";
cc._RF.push(module, 'f4205UA9ohBwpoCELzXYWU1', 'SettingManager');
// src/SettingManager.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    settingLayer: {
      "default": null,
      type: cc.Node
    },
    tips: {
      "default": null,
      type: cc.Node
    },
    tipsLabel: {
      "default": null,
      type: cc.Label
    }
  },
  fullScreen: function fullScreen() {
    if (cc.screen.fullScreen()) {
      cc.screen.exitFullScreen();
    } else {
      cc.screen.requestFullScreen();
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var isIOS14Device = cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && cc.sys.isMobile && /iPhone OS 14/.test(window.navigator.userAgent);

    if (isIOS14Device) {
      cc.MeshBuffer.prototype.checkAndSwitchBuffer = function (vertexCount) {
        if (this.vertexOffset + vertexCount > 65535) {
          this.uploadData();

          this._batcher._flush();
        }
      };

      cc.MeshBuffer.prototype.forwardIndiceStartToOffset = function () {
        this.uploadData();
        this.switchBuffer();
      };
    }
  },
  start: function start() {
    this.game = cc.find("Canvas").getComponent("GameScene");
    this.stage = cc.find("Canvas/stage").getComponent("Stage");
  },
  openSetting: function openSetting() {
    this.settingLayer.active = true;
  },
  closeSetting: function closeSetting() {
    this.settingLayer.active = false;
  },
  restartGame: function restartGame() {
    if (this.stage.autoJump) {
      this.openTips();
      this.tipsLabel.string = "Cannot Restart Game While Auto Jumping";
    } else {
      this.settingLayer.active = false;
      this.game.onOver();
    }
  },
  quitGame: function quitGame() {
    if (this.stage.autoJump) {
      this.openTips();
      this.tipsLabel.string = "Cannot Quit Game While Auto Jumping";
    } else {
      cc.find("Canvas/overPanel").getComponent("OverPanel").isQuit = true;
      this.settingLayer.active = false;
      this.game.onOver();
    }
  },
  openTips: function openTips() {
    this.tips.active = true;
  },
  closeTips: function closeTips() {
    this.tips.active = false;
  } // update (dt) {},

});

cc._RF.pop();