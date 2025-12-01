import UIKit
import Capacitor
import AVFoundation
import UserNotifications

/**
 * 学术英语精进 - AppDelegate
 * v2.0 - 增强版
 *
 * 功能特性：
 * 1. 音频会话配置 (支持后台播放)
 * 2. 推送通知支持
 * 3. Deep Links 处理
 * 4. 状态栏优化
 */
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    
    // MARK: - Application Lifecycle

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // 配置音频会话 (支持口语练习和听力播放)
        configureAudioSession()
        
        // 配置推送通知
        configureNotifications(application)
        
        // 配置状态栏样式
        configureStatusBar()
        
        return true
    }
    
    // MARK: - Audio Session Configuration
    
    private func configureAudioSession() {
        do {
            let audioSession = AVAudioSession.sharedInstance()
            
            // 设置为播放和录音模式
            try audioSession.setCategory(
                .playAndRecord,
                mode: .default,
                options: [
                    .defaultToSpeaker,      // 默认使用扬声器
                    .allowBluetooth,        // 支持蓝牙耳机
                    .allowBluetoothA2DP,    // 支持蓝牙音频
                    .mixWithOthers          // 允许与其他音频混合
                ]
            )
            
            // 激活音频会话
            try audioSession.setActive(true)
            
            print("✅ 音频会话配置成功")
        } catch {
            print("❌ 音频会话配置失败: \(error.localizedDescription)")
        }
    }
    
    // MARK: - Notifications Configuration
    
    private func configureNotifications(_ application: UIApplication) {
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        
        // 请求通知权限
        center.requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            if granted {
                print("✅ 通知权限已授予")
                DispatchQueue.main.async {
                    application.registerForRemoteNotifications()
                }
            } else if let error = error {
                print("❌ 通知权限请求失败: \(error.localizedDescription)")
            }
        }
    }
    
    // MARK: - Status Bar Configuration
    
    private func configureStatusBar() {
        // iOS 13+ 使用 UIWindowSceneDelegate
        if #available(iOS 13.0, *) {
            // 状态栏样式由 View Controller 控制
        } else {
            UIApplication.shared.statusBarStyle = .lightContent
        }
    }
    
    // MARK: - Remote Notifications
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let tokenString = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
        print("📱 APNs Device Token: \(tokenString)")
        
        // 通知 Capacitor
        NotificationCenter.default.post(
            name: .capacitorDidRegisterForRemoteNotifications,
            object: deviceToken
        )
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("❌ APNs 注册失败: \(error.localizedDescription)")
        
        NotificationCenter.default.post(
            name: .capacitorDidFailToRegisterForRemoteNotifications,
            object: error
        )
    }

    // MARK: - Application State Changes
    
    func applicationWillResignActive(_ application: UIApplication) {
        // 应用即将进入非活跃状态
        // 保存学习进度
        NotificationCenter.default.post(name: Notification.Name("AppWillResignActive"), object: nil)
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // 应用进入后台
        // 可以继续播放音频 (需要 Background Modes)
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // 应用即将进入前台
        // 刷新界面
        NotificationCenter.default.post(name: Notification.Name("AppWillEnterForeground"), object: nil)
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // 应用已激活
        // 清除角标
        application.applicationIconBadgeNumber = 0
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // 应用即将终止
        // 保存数据
        NotificationCenter.default.post(name: Notification.Name("AppWillTerminate"), object: nil)
    }
    
    // MARK: - URL Handling (Deep Links)

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // 处理 Deep Link
        print("🔗 收到 URL: \(url.absoluteString)")
        
        // 通知 WebView 处理
        if let scheme = url.scheme, scheme == "englishboost" {
            handleDeepLink(url)
        }
        
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // 处理 Universal Links
        if userActivity.activityType == NSUserActivityTypeBrowsingWeb,
           let url = userActivity.webpageURL {
            print("🔗 收到 Universal Link: \(url.absoluteString)")
        }
        
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
    
    // MARK: - Deep Link Handler
    
    private func handleDeepLink(_ url: URL) {
        guard let host = url.host else { return }
        
        // 根据 host 路由到不同页面
        switch host {
        case "vocabulary":
            navigateToModule("vocabulary")
        case "listening":
            navigateToModule("listening")
        case "reading":
            navigateToModule("reading")
        case "speaking":
            navigateToModule("speaking")
        default:
            print("⚠️ 未知的 Deep Link: \(url.absoluteString)")
        }
    }
    
    private func navigateToModule(_ module: String) {
        // 通过 JavaScript Bridge 导航
        NotificationCenter.default.post(
            name: Notification.Name("NavigateToModule"),
            object: module
        )
    }
}

// MARK: - UNUserNotificationCenterDelegate

extension AppDelegate: UNUserNotificationCenterDelegate {
    
    // 前台收到通知
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        // 在前台也显示通知
        if #available(iOS 14.0, *) {
            completionHandler([.banner, .badge, .sound])
        } else {
            completionHandler([.alert, .badge, .sound])
        }
    }
    
    // 用户点击通知
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        let userInfo = response.notification.request.content.userInfo
        
        // 处理通知点击
        if let action = userInfo["action"] as? String {
            handleNotificationAction(action)
        }
        
        completionHandler()
    }
    
    private func handleNotificationAction(_ action: String) {
        // 根据通知类型执行操作
        switch action {
        case "study_reminder":
            navigateToModule("vocabulary")
        case "review_reminder":
            navigateToModule("review")
        default:
            break
        }
    }
}
