import router from '@ohos.router';

/**
 * 学术英语精进 - 启动页
 */
@Entry
@Component
struct Index {
  @State message: string = '学术英语精进';
  @State subMessage: string = 'GRE · 托福 · 学术英语';

  aboutToAppear(): void {
    // 延迟后跳转到主页面
    setTimeout(() => {
      router.replaceUrl({
        url: 'pages/WebContainer'
      });
    }, 1500);
  }

  build() {
    Column() {
      // Logo 区域
      Column() {
        // 应用图标
        Image($r('app.media.icon'))
          .width(120)
          .height(120)
          .borderRadius(24)
          .shadow({ radius: 20, color: '#667eea', offsetX: 0, offsetY: 10 })
        
        // 应用名称
        Text(this.message)
          .fontSize(32)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: 30 })
        
        // 副标题
        Text(this.subMessage)
          .fontSize(16)
          .fontColor('#666666')
          .margin({ top: 10 })
      }
      .margin({ top: 150 })
      
      // 加载指示器
      Column() {
        LoadingProgress()
          .width(50)
          .height(50)
          .color('#667eea')
        
        Text('正在加载...')
          .fontSize(14)
          .fontColor('#999999')
          .margin({ top: 15 })
      }
      .margin({ top: 100 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
    .linearGradient({
      angle: 135,
      colors: [['#f5f7fa', 0], ['#e4e8f0', 1]]
    })
  }
}
