import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import hilog from '@ohos.hilog';
import UIAbility from '@ohos.app.ability.UIAbility';
import Want from '@ohos.app.ability.Want';
import window from '@ohos.window';

/**
 * 学术英语精进 - EntryAbility
 * HarmonyOS NEXT 应用入口
 */
export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'AcademicEnglish', '%{public}s', 'Ability onCreate');
  }

  onDestroy(): void {
    hilog.info(0x0000, 'AcademicEnglish', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'AcademicEnglish', '%{public}s', 'Ability onWindowStageCreate');

    // 设置全屏显示
    windowStage.getMainWindow().then((win: window.Window) => {
      // 设置状态栏颜色
      win.setWindowSystemBarProperties({
        statusBarColor: '#667eea',
        statusBarContentColor: '#FFFFFF',
        navigationBarColor: '#FFFFFF',
        navigationBarContentColor: '#000000'
      });
      
      // 可选：全屏模式
      // win.setWindowLayoutFullScreen(true);
    });

    windowStage.loadContent('pages/WebContainer', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'AcademicEnglish', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'AcademicEnglish', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'AcademicEnglish', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    hilog.info(0x0000, 'AcademicEnglish', '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    hilog.info(0x0000, 'AcademicEnglish', '%{public}s', 'Ability onBackground');
  }
}
