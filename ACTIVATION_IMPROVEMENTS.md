# 激活系统改进记录 v2.0 - v4.0

## 改进概述

根据用户需求「一个激活码能够对这个用户的所有设备都能认证，但是又要防止这个用户分享给别人用」，我们对激活系统进行了3个版本的迭代改进。

---

## 版本 2.0 - 信任评分与异常检测

### 核心功能

#### 1. 信任评分系统 (Trust Score)
- **评分范围**: 0-100分
- **初始分数**: 50分
- **评分规则**:
  - 每次成功心跳: +0.1分
  - 连续使用7天: +5分/周
  - 异常行为: -10分/次
  - 设备指纹变化: -5分
  - 地理位置异常: -15分

```javascript
// 使用示例
const score = ActivationSystem.state.trustScore; // 当前评分
const needsVerify = !ActivationSystem.checkTrustScore(); // 是否需要额外验证

// 评分低于30触发额外验证
if (score < 30) {
    showAdditionalVerification();
}
```

#### 2. 地理异常检测
- **IP地理定位**: 通过公开API获取用户大致位置
- **异常判断标准**: 
  - 两次心跳间隔时间内移动距离
  - 计算速度 > 500km/h 视为异常
- **处理方式**: 记录警告、降低信任分

```javascript
// 内部实现逻辑
const distance = calculateDistance(lastLocation, currentLocation); // km
const timeHours = (now - lastHeartbeat) / 3600000;
const speed = distance / timeHours;
if (speed > 500) {
    // 触发地理异常警告
}
```

### 防分享效果
- 用户A在北京，用户B在上海同时使用 → 检测到异常移动 → 降低信任分
- 持续异常 → 信任分降至30以下 → 需要额外验证

---

## 版本 3.0 - VIP等级与试用系统

### 核心功能

#### 1. VIP等级体系

| 等级 | 最大设备数 | 功能 | 价格示例 |
|------|-----------|------|----------|
| free | 1 | 基础功能 | 免费 |
| basic | 3 | 全部功能 | ¥68/年 |
| premium | 5 | 全部功能+优先支持 | ¥128/年 |
| family | 10 | 家庭共享 | ¥198/年 |

```javascript
// 获取当前VIP配置
const vip = ActivationSystem.getVipConfig();
console.log(vip); 
// { name: 'basic', maxDevices: 3, features: [...] }

// 升级VIP
await ActivationSystem.upgradeVip('premium');
```

#### 2. 免费试用系统

- **试用时长**: 7天
- **限制**: 每个设备只能试用一次
- **试用功能**: 与basic相同

```javascript
// 检查试用状态
const trial = ActivationSystem.checkTrialStatus();
if (trial.canStartTrial) {
    ActivationSystem.startTrial();
}

// 试用中检查
if (trial.isInTrial) {
    console.log(`剩余 ${trial.remainingDays} 天`);
}
```

#### 3. 失败尝试锁定

- **锁定条件**: 5次失败尝试
- **锁定时长**: 15分钟
- **记录内容**: 尝试次数、时间戳

```javascript
// 检查锁定状态
if (ActivationSystem.isLocked()) {
    const remaining = ActivationSystem.getRemainingLockTime();
    showMessage(`请等待 ${remaining} 分钟后再试`);
}
```

### 防分享效果
- 分享者购买低等级无法支持多设备
- 被分享者使用试用后仍需购买
- 暴力破解激活码被锁定

---

## 版本 4.0 - 家庭共享与设备迁移

### 核心功能

#### 1. 家庭共享

合理的多设备使用场景，无需分享激活码：

```javascript
// 创建家庭组
const result = ActivationSystem.createFamilyGroup('我的家庭');
const inviteCode = result.inviteCode; // 如: FAM-A1B2C3

// 家人加入
await ActivationSystem.joinFamilyGroup('FAM-A1B2C3');

// 查看成员
const family = ActivationSystem.state.familyGroup;
// { name: '我的家庭', members: [{id, name, joinedAt}], totalDevices: 10 }
```

**限制**:
- 仅 family 等级用户可创建
- 最多5位家庭成员
- 共享10台设备配额

#### 2. 设备迁移

用户换新设备时无需重新激活：

```javascript
// 旧设备: 生成迁移令牌
const token = ActivationSystem.generateMigrationToken();
console.log(token.token); // 如: MIGRATE-XYZ123
console.log(token.expiresAt); // 10分钟后过期

// 新设备: 使用令牌
const result = await ActivationSystem.useMigrationToken('MIGRATE-XYZ123');
if (result.success) {
    // 迁移成功，旧设备自动下线
}
```

**安全措施**:
- 令牌10分钟内有效
- 一次性使用
- 使用后旧设备自动登出

#### 3. 增强UI组件

```javascript
// 设备管理
ActivationUI.showDeviceManagementDialog();
// - 查看所有设备
// - 远程登出设备
// - 修改设备名称

// VIP状态
ActivationUI.showVipStatusDialog();
// - 当前等级
// - 设备使用情况
// - 升级入口

// 设备迁移界面
ActivationUI.showMigrationDialog();
// - 生成令牌标签页
// - 使用令牌标签页
```

### 防分享效果
- 家庭共享提供合理多设备方案
- 设备迁移解决换机需求
- 降低用户分享动机

---

## 综合防分享策略

### 多层防护

```
第1层: 设备数量限制 (hard limit)
    ↓
第2层: 设备指纹识别 (device binding)
    ↓
第3层: 信任评分系统 (behavior analysis)
    ↓
第4层: 地理异常检测 (location tracking)
    ↓
第5层: 心跳验证 (online check)
```

### 场景分析

| 场景 | 检测机制 | 处理方式 |
|------|----------|----------|
| 用户自己多设备 | 设备数量 | 允许(在限额内) |
| 分享给朋友 | 设备数量超限 | 拒绝新设备 |
| 同时异地使用 | 地理异常检测 | 降信任分+警告 |
| 虚拟机刷设备 | 设备指纹相似 | 合并计数 |
| 暴力破解 | 失败锁定 | 15分钟锁定 |
| 家人使用 | 家庭共享 | 合规使用 |

### 用户友好

1. **换设备**: 设备迁移功能
2. **多设备**: VIP升级或家庭版
3. **试用体验**: 7天免费试用
4. **透明度**: 设备管理可视化

---

## 后端配合要点

### 必须实现的API

```
POST /activation/verify-trust    # 信任分验证
POST /activation/location-check  # 地理检测
POST /activation/upgrade-vip     # VIP升级
POST /family/create              # 创建家庭
POST /family/join                # 加入家庭
POST /migration/generate         # 生成迁移令牌
POST /migration/use              # 使用迁移令牌
```

### 数据库扩展

```sql
-- 信任分记录表
CREATE TABLE trust_scores (
    device_id TEXT PRIMARY KEY,
    score INTEGER DEFAULT 50,
    last_update TIMESTAMP
);

-- 地理位置记录表
CREATE TABLE device_locations (
    id INTEGER PRIMARY KEY,
    device_id TEXT,
    latitude REAL,
    longitude REAL,
    timestamp TIMESTAMP
);

-- 家庭组表
CREATE TABLE family_groups (
    id TEXT PRIMARY KEY,
    name TEXT,
    owner_code TEXT,
    invite_code TEXT,
    created_at TIMESTAMP
);

-- 迁移令牌表
CREATE TABLE migration_tokens (
    token TEXT PRIMARY KEY,
    from_device TEXT,
    code TEXT,
    created_at TIMESTAMP,
    expires_at TIMESTAMP,
    used BOOLEAN DEFAULT FALSE
);
```

---

## 配置参数

```javascript
ActivationSystem.config = {
    // v1.0 基础配置
    maxDevices: 3,
    heartbeatInterval: 300000,        // 5分钟
    heartbeatTimeout: 900000,         // 15分钟
    gracePeriod: 86400000,            // 24小时
    
    // v2.0 信任评分
    trustScoreThreshold: 30,          // 低于此分需额外验证
    maxSpeedKmh: 500,                 // 异常移动阈值
    
    // v3.0 VIP/试用
    trialDays: 7,
    maxFailedAttempts: 5,
    lockoutDuration: 900000,          // 15分钟
    
    // v4.0 迁移
    migrationTokenValidity: 600000,   // 10分钟
    
    // VIP等级配置
    vipTiers: {
        free: { maxDevices: 1 },
        basic: { maxDevices: 3 },
        premium: { maxDevices: 5 },
        family: { maxDevices: 10 }
    }
};
```

---

## 总结

通过3个版本的迭代，激活系统从简单的设备数限制，发展为多层次的智能防护体系：

| 版本 | 核心能力 | 防分享效果 |
|------|----------|------------|
| v2.0 | 信任评分+地理检测 | 检测异常使用行为 |
| v3.0 | VIP体系+试用 | 引导正规付费 |
| v4.0 | 家庭共享+迁移 | 提供合规多设备方案 |

**设计理念**: 
- 让正常用户体验顺畅
- 让分享行为有成本
- 让合规使用更方便
