package com.academic.english;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

/**
 * 学术英语精进 - 开机启动接收器
 * v1.0
 * 
 * 功能：
 * 1. 开机后恢复学习提醒
 * 2. 重新注册定时任务
 */
public class BootReceiver extends BroadcastReceiver {
    
    private static final String CHANNEL_ID = "english_boost_reminder";
    private static final String CHANNEL_NAME = "学习提醒";
    
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null) return;
        
        String action = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(action) ||
            "android.intent.action.QUICKBOOT_POWERON".equals(action)) {
            
            // 创建通知渠道 (Android 8.0+)
            createNotificationChannel(context);
            
            // 恢复学习提醒
            restoreLearningReminders(context);
        }
    }
    
    /**
     * 创建通知渠道
     */
    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("学术英语精进学习提醒通知");
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 250, 250, 250});
            
            NotificationManager notificationManager = 
                context.getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
    }
    
    /**
     * 恢复学习提醒 (从 SharedPreferences 读取用户设置)
     */
    private void restoreLearningReminders(Context context) {
        // TODO: 从 SharedPreferences 读取提醒设置
        // 然后使用 AlarmManager 重新注册提醒
        
        // 示例：发送一个欢迎回来的通知
        try {
            sendWelcomeBackNotification(context);
        } catch (SecurityException e) {
            // 权限被拒绝，忽略
        }
    }
    
    /**
     * 发送欢迎回来通知
     */
    private void sendWelcomeBackNotification(Context context) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context, 0, intent, flags
        );
        
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle("学术英语精进")
            .setContentText("继续你的英语学习之旅吧！")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true);
        
        NotificationManagerCompat notificationManager = 
            NotificationManagerCompat.from(context);
        
        // 检查通知权限 (Android 13+)
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
            notificationManager.areNotificationsEnabled()) {
            notificationManager.notify(1001, builder.build());
        }
    }
}
