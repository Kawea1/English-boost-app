# ========================================
# 学术英语精进 - ProGuard 混淆规则
# v2.0 - 增强版
# ========================================

# ========== 基础配置 ==========

# 保留行号信息 (用于崩溃堆栈分析)
-keepattributes SourceFile,LineNumberTable

# 隐藏原始源文件名
-renamesourcefileattribute SourceFile

# 保留注解
-keepattributes *Annotation*

# 保留签名信息 (泛型)
-keepattributes Signature

# 保留异常信息
-keepattributes Exceptions

# ========== WebView JavaScript 接口 ==========

# 保留 JavaScript 接口
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Capacitor Bridge
-keep class com.getcapacitor.** { *; }
-keep class com.getcapacitor.plugin.** { *; }

# 应用的 JavaScript 接口
-keepclassmembers class com.academic.english.** {
    public *;
}

# ========== Capacitor 规则 ==========

-keep @com.getcapacitor.annotation.CapacitorPlugin public class * {
    *;
}

-keep class com.getcapacitor.Plugin { *; }
-keep class com.getcapacitor.PluginCall { *; }
-keep class com.getcapacitor.JSObject { *; }

# ========== AndroidX 规则 ==========

-keep class androidx.** { *; }
-keep interface androidx.** { *; }
-dontwarn androidx.**

# ========== Material Design ==========

-keep class com.google.android.material.** { *; }
-dontwarn com.google.android.material.**

# ========== OkHttp (如果使用) ==========

-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# ========== Gson (如果使用) ==========

-keep class com.google.gson.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# ========== Firebase (如果使用) ==========

-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# ========== 通用优化 ==========

# 不混淆枚举
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# 保留 Parcelable
-keepclassmembers class * implements android.os.Parcelable {
    public static final ** CREATOR;
}

# 保留 Serializable
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# 保留 R 文件
-keepclassmembers class **.R$* {
    public static <fields>;
}

# ========== 调试信息 ==========

# 开发环境下可以取消注释以下行来保留更多信息
#-dontobfuscate
#-dontoptimize

# ========== 忽略警告 ==========

-dontwarn javax.**
-dontwarn java.lang.invoke.**
-dontwarn kotlin.**
