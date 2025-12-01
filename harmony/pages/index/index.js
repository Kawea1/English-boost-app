// 学术英语精进 - 鸿蒙版页面逻辑
export default {
    data: {
        title: '学术英语精进'
    },
    
    onInit() {
        console.info('学术英语精进 - 鸿蒙版初始化');
    },
    
    onPageStart(e) {
        console.info('页面开始加载:', e.url);
    },
    
    onPageFinish(e) {
        console.info('页面加载完成:', e.url);
    },
    
    onMessage(e) {
        // 处理来自WebView的消息
        console.info('收到WebView消息:', e.message);
        
        // 可以在这里处理原生功能调用
        const message = JSON.parse(e.message);
        if (message.type === 'speak') {
            // 调用鸿蒙TTS
            this.speak(message.text);
        }
    },
    
    speak(text) {
        // 鸿蒙语音合成API
        // 需要导入 @ohos.ai.speechRecognizer
        console.info('语音合成:', text);
    }
}
