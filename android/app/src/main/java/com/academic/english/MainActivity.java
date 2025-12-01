package com.academic.english;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebView;
import android.graphics.Color;
import android.content.pm.PackageManager;
import android.Manifest;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import java.util.List;

/**
 * 学术英语精进 - 主Activity
 * v2.0 - 增强版
 * 
 * 功能特性：
 * 1. 沉浸式状态栏
 * 2. 自动权限请求
 * 3. WebView 优化
 * 4. 深色模式支持
 */
public class MainActivity extends BridgeActivity {
    
    private static final int PERMISSION_REQUEST_CODE = 100;
    
    // 需要请求的运行时权限
    private static final String[] REQUIRED_PERMISSIONS = {
        Manifest.permission.RECORD_AUDIO,
        Manifest.permission.VIBRATE
    };
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 全屏沉浸式启动页
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        );
        
        super.onCreate(savedInstanceState);
        
        // 设置状态栏
        setupStatusBar();
        
        // 优化 WebView
        optimizeWebView();
        
        // 检查并请求权限
        checkAndRequestPermissions();
    }
    
    /**
     * 设置沉浸式状态栏
     */
    private void setupStatusBar() {
        Window window = getWindow();
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // 透明状态栏
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            
            // 设置状态栏颜色为蓝色主题色
            window.setStatusBarColor(Color.parseColor("#667eea"));
            
            // 导航栏颜色
            window.setNavigationBarColor(Color.parseColor("#f8f9fa"));
        }
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // 设置导航栏图标为深色 (适配浅色背景)
            View decorView = window.getDecorView();
            int flags = decorView.getSystemUiVisibility();
            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            decorView.setSystemUiVisibility(flags);
        }
        
        // Android 11+ 使用新API
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowCompat.setDecorFitsSystemWindows(window, true);
            WindowInsetsControllerCompat controller = 
                WindowCompat.getInsetsController(window, window.getDecorView());
            if (controller != null) {
                controller.setAppearanceLightNavigationBars(true);
            }
        }
    }
    
    /**
     * 优化 WebView 性能
     */
    private void optimizeWebView() {
        // 启用硬件加速
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED
        );
        
        // WebView 调试 (仅Debug模式)
        if (BuildConfig.DEBUG && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
    }
    
    /**
     * 检查并请求必要权限
     */
    private void checkAndRequestPermissions() {
        List<String> permissionsToRequest = new ArrayList<>();
        
        for (String permission : REQUIRED_PERMISSIONS) {
            if (ContextCompat.checkSelfPermission(this, permission) 
                    != PackageManager.PERMISSION_GRANTED) {
                permissionsToRequest.add(permission);
            }
        }
        
        // Android 13+ 需要请求通知权限
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                permissionsToRequest.add(Manifest.permission.POST_NOTIFICATIONS);
            }
        }
        
        if (!permissionsToRequest.isEmpty()) {
            ActivityCompat.requestPermissions(
                this, 
                permissionsToRequest.toArray(new String[0]), 
                PERMISSION_REQUEST_CODE
            );
        }
    }
    
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, 
                                          @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        
        if (requestCode == PERMISSION_REQUEST_CODE) {
            for (int i = 0; i < permissions.length; i++) {
                if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                    // 权限已授予
                    notifyPermissionGranted(permissions[i]);
                } else {
                    // 权限被拒绝
                    handlePermissionDenied(permissions[i]);
                }
            }
        }
    }
    
    /**
     * 通知 WebView 权限已授予
     */
    private void notifyPermissionGranted(String permission) {
        if (bridge != null && bridge.getWebView() != null) {
            String jsCode = String.format(
                "window.dispatchEvent(new CustomEvent('nativePermissionGranted', " +
                "{ detail: { permission: '%s' } }));", 
                permission
            );
            bridge.getWebView().evaluateJavascript(jsCode, null);
        }
    }
    
    /**
     * 处理权限被拒绝
     */
    private void handlePermissionDenied(String permission) {
        if (permission.equals(Manifest.permission.RECORD_AUDIO)) {
            Toast.makeText(this, 
                "麦克风权限被拒绝，口语练习功能将不可用", 
                Toast.LENGTH_LONG).show();
        }
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        
        // 确保 WebView 获取焦点
        if (bridge != null && bridge.getWebView() != null) {
            bridge.getWebView().requestFocus();
        }
    }
    
    @Override
    public void onBackPressed() {
        // 优先让 WebView 处理返回
        if (bridge != null && bridge.getWebView() != null && bridge.getWebView().canGoBack()) {
            bridge.getWebView().goBack();
        } else {
            super.onBackPressed();
        }
    }
}
