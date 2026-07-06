const Consumer_Map_H = `\
/**
 * @file Consumer_Map.h
 * @brief HID Usage Tables - Consumer Page (0x0C) Mapping with Chinese Comments (HUT 1.7)
 * @note  Based on USB HID Usage Tables 1.7, Max Usage ID: 0x0517
 */

#ifndef CONSUMER_MAP_H
#define CONSUMER_MAP_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    // 0x0001 - 0x0006: 消费类控制类别 (应用集合)
    uint16_t ConsumerControl;       // 消费类控制 (CA)
    uint16_t NumericKeyPad;         // 数字小键盘 (NAry)
    uint16_t ProgrammableButtons;   // 可编程按键 (NAry)
    uint16_t Microphone;            // 麦克风 (CA)
    uint16_t Headphone;             // 耳机 (CA)
    uint16_t GraphicEqualizer;      // 图形均衡器 (CA)

    // 0x0020 - 0x0022: 选择器
    uint16_t Plus10;                // +10 (OSC)
    uint16_t Plus100;               // +100 (OSC)
    uint16_t AMPM;                  // 上午/下午 (OSC)

    // 0x0030 - 0x0036: 系统电源控制
    uint16_t Power;                 // 电源 (OSC)
    uint16_t Reset;                 // 复位 (OSC)
    uint16_t Sleep;                 // 睡眠 (OSC)
    uint16_t SleepAfter;            // 定时睡眠 (睡眠延时)
    uint16_t SleepMode;             // 睡眠模式
    uint16_t Illumination;          // 背光照明 (键盘背光开关切换)
    uint16_t FunctionButtons;       // 功能按键

    // 0x0040 - 0x0048: 菜单控制
    uint16_t Menu;                  // 菜单 (OOC)
    uint16_t MenuPick;              // 菜单选取 (OSC)
    uint16_t MenuUp;                // 菜单上移 (OSC)
    uint16_t MenuDown;              // 菜单下移 (OSC)
    uint16_t MenuLeft;              // 菜单左移 (OSC)
    uint16_t MenuRight;             // 菜单右移 (OSC)
    uint16_t MenuEscape;            // 菜单退出/返回 (OSC)
    uint16_t MenuValueIncrease;     // 菜单数值增加 (OSC)
    uint16_t MenuValueDecrease;     // 菜单数值减少 (OSC)

    // 0x0060 - 0x007D: 显示器 / 视听 / 相机控制
    uint16_t DataOnScreen;          // 屏幕数据显示 (信息)
    uint16_t ClosedCaption;         // 隐藏式字幕 (字幕)
    uint16_t ClosedCaptionSelect;   // 隐藏式字幕选择
    uint16_t VCRTV;                 // 录像机/电视切换
    uint16_t BroadcastMode;         // 广播模式
    uint16_t Snapshot;              // 快照 (相机抓拍)
    uint16_t Still;                 // 静止画面 (定格)
    uint16_t RedMenuButton;         // 红色菜单键
    uint16_t GreenMenuButton;       // 绿色菜单键
    uint16_t BlueMenuButton;        // 蓝色菜单键
    uint16_t YellowMenuButton;      // 黄色菜单键
    uint16_t AspectRatio;           // 屏幕宽高比
    uint16_t DisplayBrightnessInc;  // 显示器亮度递增
    uint16_t DisplayBrightnessDec;  // 显示器亮度递减
    uint16_t DisplayBrightness;     // 显示器亮度 (LC)
    uint16_t DisplayBacklightToggle;// 显示器背光开关
    uint16_t DisplayBrightnessMin;  // 显示器亮度调至最低
    uint16_t DisplayBrightnessMax;  // 显示器亮度调至最高
    uint16_t DisplayBrightnessAuto; // 显示器自动亮度调节
    uint16_t CameraAccessEnable;    // 摄像头访问开启
    uint16_t CameraAccessDisable;   // 摄像头访问关闭
    uint16_t CameraAccessToggle;    // 摄像头访问切换
    uint16_t KbdBrightnessInc;      // 键盘亮度递增
    uint16_t KbdBrightnessDec;      // 键盘亮度递减
    uint16_t KbdBacklightMin;       // 键盘背光调至最低
    uint16_t KbdBacklightMax;       // 键盘背光调至最高
    uint16_t KbdBacklightAuto;      // 键盘背光自动调节

    // 0x0080 - 0x00A4: 选择 / 媒体选择 / 定时调度
    uint16_t Selection;             // 选择 (NAry)
    uint16_t AssignSelection;       // 分配选择 (OSC)
    uint16_t ModeStep;              // 模式步进 / 下一个视频 (OSC)
    uint16_t RecallLast;            // 召回上一个/返回前一频道 (OSC)
    uint16_t EnterChannel;          // 进入频道 (OSC)
    uint16_t OrderMovie;            // 订购电影 (OSC)
    uint16_t Channel;               // 频道 (LC)
    uint16_t MediaSelection;        // 媒体选择 (NAry)
    uint16_t MediaSelectComputer;   // 媒体选择：电脑/PC (Sel)
    uint16_t MediaSelectTV;         // 媒体选择：电视 (Sel)
    uint16_t MediaSelectWWW;        // 媒体选择：万维网/互联网 (Sel)
    uint16_t MediaSelectDVD;        // 媒体选择：DVD (Sel)
    uint16_t MediaSelectTelephone;  // 媒体选择：电话 (Sel)
    uint16_t MediaSelectProgramGuide;// 媒体选择：节目指南 (Sel)
    uint16_t MediaSelectVideoPhone; // 媒体选择：可视电话 (Sel)
    uint16_t MediaSelectGames;      // 媒体选择：游戏 (Sel)
    uint16_t MediaSelectMessages;   // 媒体选择：信息/备忘录 (Sel)
    uint16_t MediaSelectCD;         // 媒体选择：CD (Sel)
    uint16_t MediaSelectVCR;        // 媒体选择：录像机 (Sel)
    uint16_t MediaSelectTuner;      // 媒体选择：调谐器/收音机 (Sel)
    uint16_t Quit;                  // 退出 (OSC)
    uint16_t Help;                  // 帮助 (OSC)
    uint16_t MediaSelectTape;       // 媒体选择：磁带 (Sel)
    uint16_t MediaSelectCable;      // 媒体选择：有线电视/TV2 (Sel)
    uint16_t MediaSelectSatellite;  // 媒体选择：卫星电视/SAT (Sel)
    uint16_t MediaSelectSecurity;   // 媒体选择：安防系统 (Sel)
    uint16_t MediaSelectHome;       // 媒体选择：主页/数字录像机PVR (Sel)
    uint16_t MediaSelectCall;       // 媒体选择：呼叫 (Sel)
    uint16_t ChannelIncrement;      // 频道递增 (OSC)
    uint16_t ChannelDecrement;      // 频道递减 (OSC)
    uint16_t MediaSelectSAP;        // 媒体选择：次要音频节目SAP (Sel)
    uint16_t VCRPlus;               // VCR Plus / VCR2 (OSC)
    uint16_t Once;                  // 单次定时 (OSC)
    uint16_t Daily;                 // 每日定时 (OSC)
    uint16_t Weekly;                // 每周定时 (OSC)
    uint16_t Monthly;               // 每月定时 (OSC)

    // 0x00B0 - 0x00DF: 媒体传输控制 (播放控制)
    uint16_t Play;                  // 播放 (OSC)
    uint16_t Pause;                 // 暂停 (OSC)
    uint16_t Record;                // 录制 (OSC)
    uint16_t FastForward;           // 快进 (OSC)
    uint16_t Rewind;                // 快退/倒带 (OSC)
    uint16_t ScanNextTrack;         // 扫描下一曲/下一首 (OSC)
    uint16_t ScanPreviousTrack;     // 扫描上一曲/上一首 (OSC)
    uint16_t Stop;                  // 停止 (OSC)
    uint16_t Eject;                 // 弹出 (OSC)
    uint16_t RandomPlay;            // 随机播放/混序 (OSC)
    uint16_t SelectDisc;            // 选择光盘 (OSC)
    uint16_t EnterDisc;             // 载入光盘 (OSC)
    uint16_t Repeat;                // 重复播放 (OSC)
    uint16_t Tracking;              // 磁迹跟踪调节 (OSC)
    uint16_t TrackNormal;           // 磁迹标准恢复 (OSC)
    uint16_t SlowTracking;          // 慢速磁迹跟踪 (OSC)
    uint16_t FrameForward;          // 单帧前进 (OSC)
    uint16_t FrameBack;             // 单帧后退 (OSC)
    uint16_t Mark;                  // 标记 (OSC)
    uint16_t ClearMark;             // 清除标记 (OSC)
    uint16_t RepeatFromMark;        // 从标记处循环播放 (OSC)
    uint16_t ReturnToMark;          // 返回标记处 (OSC)
    uint16_t SearchMarkForward;     // 向前搜索标记 (OSC)
    uint16_t SearchMarkBackwards;   // 向后搜索标记 (OSC)
    uint16_t CounterReset;          // 计数器清零 (OSC)
    uint16_t ShowCounter;           // 显示计数器 (OSC)
    uint16_t SetCounter;            // 设置计数器 / 跟踪增量 (OSC)
    uint16_t OpenClose;             // 仓门开/关 (OSC)
    uint16_t Index;                 // 索引 (OSC)
    uint16_t SlideShow;             // 幻灯片放映 (OSC)
    uint16_t PlayPause;             // 播放/暂停 (OSC)
    uint16_t VoiceCommand;          // 语音命令 (OSC)
    uint16_t Dictate;               // 听写/语音输入 (OOC)
    uint16_t EmojiPicker;           // 表情符号选择器 (OOC)

    // 0x00E0 - 0x00FF: 音频控制
    uint16_t Volume;                // 音量 (LC)
    uint16_t Balance;               // 左右声道平衡 (LC)
    uint16_t Mute;                  // 静音 (OOC)
    uint16_t Bass;                  // 低音 (LC)
    uint16_t Treble;                // 高音 (LC)
    uint16_t BassBoost;             // 低音增强 (OSC)
    uint16_t SurroundMode;          // 环绕声模式 (OSC)
    uint16_t Loudness;              // 等响度控制 (OSC)
    uint16_t MPX;                   // 多路复用立体声切换 (OSC)
    uint16_t VolumeIncrement;       // 音量递增 / 音量加 (OSC)
    uint16_t VolumeDecrement;       // 音量递减 / 音量减 (OSC)
    uint16_t SpeedSelect;           // 速度选择 (OSC)
    uint16_t PlaybackSpeed;         // 播放速度 (OSC)
    uint16_t StandardPlay;          // 标准播放模式SP (OSC)
    uint16_t LongPlay;              // 长时播放模式LP (OSC)
    uint16_t ExtendedPlay;          // 超长播放模式EP (OSC)
    uint16_t Slow;                  // 慢速播放 (OSC)

    // 0x0100 - 0x0108: 环境 / 报警控制
    uint16_t FanEnable;             // 风扇开启 (OOC)
    uint16_t FanSpeed;              // 风扇转速 (LC)
    uint16_t LightEnable;           // 照明开启 (OOC)
    uint16_t LightIlluminationLevel;// 照明亮度调节 (LC)
    uint16_t ClimateControlEnable;  // 气候/空调控制开启 (OOC)
    uint16_t RoomTemperature;       // 室内温度设置 (LC)
    uint16_t SecurityEnable;        // 安防系统启用 (OOC)
    uint16_t FireAlarm;             // 火警 (OSC)
    uint16_t PoliceAlarm;           // 警报/匪警 (OSC)

    // 0x0150 - 0x0155: 扩展音频控制
    uint16_t BalanceRight;          // 右平衡调节 (OSC)
    uint16_t BalanceLeft;           // 左平衡调节 (OSC)
    uint16_t BassIncrement;         // 低音递增 (OSC)
    uint16_t BassDecrement;         // 低音递减 (OSC)
    uint16_t TrebleIncrement;       // 高音递增 (OSC)
    uint16_t TrebleDecrement;       // 高音递减 (OSC)

    // 0x0160 - 0x016A: 扬声器系统 / 声道控制
    uint16_t SpeakerSystem;         // 扬声器系统 (CA)
    uint16_t ChannelLeft;           // 左声道 (OSC)
    uint16_t ChannelRight;          // 右声道 (OSC)
    uint16_t ChannelCenter;         // 中置声道 (OSC)
    uint16_t ChannelFront;          // 前置声道 (OSC)
    uint16_t ChannelCenterFront;    // 前中置声道 (OSC)
    uint16_t ChannelSide;           // 侧环绕声道 (OSC)
    uint16_t ChannelSurround;       // 后环绕声道 (OSC)
    uint16_t ChannelLFE;            // 低频增强声道 / 超低音 (OSC)
    uint16_t ChannelTop;            // 顶置天空声道 (OSC)
    uint16_t ChannelUnknown;        // 未知声道 (OSC)

    // 0x0170 - 0x0174: 子频道 / 备用音频
    uint16_t SubChannel;            // 子频道 (OSC)
    uint16_t SubChannelIncrement;   // 子频道递增 (OSC)
    uint16_t SubChannelDecrement;   // 子频道递减 (OSC)
    uint16_t AltAudioIncrement;     // 备用音频递增 (OSC)
    uint16_t AltAudioDecrement;     // 备用音频递减 (OSC)

    // 0x0180 - 0x01CE: 应用程序启动 (AL) 按键
    uint16_t ALAppLaunchButtons;    // 应用启动按键群 (NAry)
    uint16_t ALButtonConfig;        // AL 启动键配置工具
    uint16_t ALProgButtonConfig;    // AL 可编程按键配置
    uint16_t ALConsumerCtrlConfig;  // AL 消费类控制配置
    uint16_t ALWordProcessor;       // AL 文字处理器 (如 Word)
    uint16_t ALTextEditor;          // AL 文本编辑器 (如记事本)
    uint16_t ALSpreadsheet;         // AL 电子表格 (如 Excel)
    uint16_t ALGraphicsEditor;      // AL 图形编辑器 (如 Photoshop)
    uint16_t ALPresentationApp;     // AL 演示文稿应用 (如 PPT)
    uint16_t ALDatabaseApp;         // AL 数据库应用
    uint16_t ALEmailReader;         // AL 邮件阅读器 (如 Outlook)
    uint16_t ALNewsreader;          // AL 新闻阅读器
    uint16_t ALVoicemail;           // AL 语音邮件
    uint16_t ALContacts;            // AL 联系人 / 通讯录
    uint16_t ALCalendar;            // AL 日历 / 日程表
    uint16_t ALTaskManager;         // AL 任务 / 项目管理器
    uint16_t ALJournal;             // AL 日志 / 工时表
    uint16_t ALFinance;             // AL 记账 / 财务软件
    uint16_t ALCalculator;          // AL 计算器
    uint16_t ALAVCapture;           // AL 音视频捕获 / 播放
    uint16_t ALLocalBrowser;        // AL 本地资源浏览器 (文件资源管理器)
    uint16_t ALLANBrowser;          // AL 局域网/广域网浏览器
    uint16_t ALInternetBrowser;     // AL 互联网浏览器
    uint16_t ALRemoteNetworking;    // AL 远程网络 / ISP 连接
    uint16_t ALNetworkConference;   // AL 网络会议
    uint16_t ALNetworkChat;         // AL 网络聊天
    uint16_t ALTelephony;           // AL 电话系统 / 拨号器
    uint16_t ALLogon;               // AL 登录
    uint16_t ALLogoff;              // AL 注销
    uint16_t ALLogonLogoff;         // AL 登录/注销切换
    uint16_t ALTerminalLock;        // AL 终端锁定 / 屏幕保护
    uint16_t ALControlPanel;        // AL 控制面板
    uint16_t ALCommandLine;         // AL 命令行处理器 / 运行窗口
    uint16_t ALProcessTaskMgr;      // AL 进程 / 任务管理器
    uint16_t ALSelectTask;          // AL 选择任务/应用
    uint16_t ALNextTask;            // AL 下一个任务/应用
    uint16_t ALPreviousTask;        // AL 上一个任务/应用
    uint16_t ALPreemptiveHalt;      // AL 强行终止任务/应用
    uint16_t ALHelp;                // AL 帮助
    uint16_t ALDesktop;             // AL 桌面 / 我的电脑
    uint16_t ALDocuments;           // AL 我的文档
    uint16_t ALSpellCheck;          // AL 拼写检查
    uint16_t ALKeyboardLayout;      // AL 键盘布局
    uint16_t ALScreenSaver;         // AL 屏幕保护程序
    uint16_t ALFileExplorer;        // AL 文件资源管理器
    uint16_t ALImages;              // AL 图片 / 相册
    uint16_t ALAudio;               // AL 音频 / 音乐
    uint16_t ALVideo;               // AL 视频
    uint16_t ALMessenger;           // AL 即时通讯软件
    uint16_t ALInfo;                // AL 信息
    uint16_t ALAssistant;           // AL 数字助理 (如 AI 助手、语音助手)
    uint16_t ALActionOnSelection;   // AL 对所选内容执行操作
    uint16_t ALContextualInsert;    // AL 上下文相关插入
    uint16_t ALContextualQuery;     // AL 上下文相关查询

    // 0x0201 - 0x029F: 通用图形用户界面应用控制 (AC)
    uint16_t ACNew;                 // AC 新建 (OSC)
    uint16_t ACOpen;                // AC 打开 (OSC)
    uint16_t ACClose;               // AC 关闭 (OSC)
    uint16_t ACExit;                // AC 退出 (OSC)
    uint16_t ACMaximize;            // AC 最大化 (OSC)
    uint16_t ACMinimize;            // AC 最小化 (OSC)
    uint16_t ACSave;                // AC 保存 (OSC)
    uint16_t ACPrint;               // AC 打印 (OSC)
    uint16_t ACProperties;          // AC 属性 (OSC)
    uint16_t ACUndo;                // AC 撤销 (OSC)
    uint16_t ACCopy;                // AC 复制 (OSC)
    uint16_t ACCut;                 // AC 剪切 (OSC)
    uint16_t ACPaste;               // AC 粘贴 (OSC)
    uint16_t ACSelectAll;           // AC 全选 (OSC)
    uint16_t ACFind;                // AC 查找 (OSC)
    uint16_t ACFindAndReplace;      // AC 查找并替换 (OSC)
    uint16_t ACSearch;              // AC 搜索 (OSC)
    uint16_t ACGoTo;                // AC 定位到/转到 (OSC)
    uint16_t ACHome;                // AC 主页 (OSC)
    uint16_t ACBack;                // AC 后退 (OSC)
    uint16_t ACForward;             // AC 前进 (OSC)
    uint16_t ACStop;                // AC 停止加载 (OSC)
    uint16_t ACRefresh;             // AC 刷新 (OSC)
    uint16_t ACPreviousLink;        // AC 上一个超链接 (OSC)
    uint16_t ACNextLink;            // AC 下一个超链接 (OSC)
    uint16_t ACBookmarks;           // AC 书签/收藏夹 (OSC)
    uint16_t ACHistory;             // AC 历史记录 (OSC)
    uint16_t ACSubscriptions;       // AC 订阅 (OSC)
    uint16_t ACZoomIn;              // AC 放大 (OSC)
    uint16_t ACZoomOut;             // AC 缩小 (OSC)
    uint16_t ACZoom;                // AC 缩放 (OSC)
    uint16_t ACFullScreenView;      // AC 全屏视图 (OSC)
    uint16_t ACNormalView;          // AC 常规视图 (OSC)
    uint16_t ACViewToggle;          // AC 全屏/常规视图切换 (OSC)
    uint16_t ACScrollUp;            // AC 向上滚动 (OSC)
    uint16_t ACScrollDown;          // AC 向下滚动 (OSC)
    uint16_t ACScroll;              // AC 滚动 (OSC)
    uint16_t ACPanLeft;             // AC 向左平移 (OSC)
    uint16_t ACPanRight;            // AC 向右平移 (OSC)
    uint16_t ACPan;                 // AC 平移 (OOC) -- 相对水平滚轮
    uint16_t ACNewWindow;           // AC 新建窗口 (OSC)
    uint16_t ACTileHorizontally;    // AC 水平平铺 (OSC)
    uint16_t ACTileVertically;      // AC 垂直平铺 (OSC)
    uint16_t ACFormat;              // AC 格式化 (OSC)
    uint16_t ACEdit;                // AC 编辑 (OSC)
    uint16_t ACCancel;              // AC 取消 (OSC)
    uint16_t ACInsert;              // AC 插入 (OSC)
    uint16_t ACDelete;              // AC 删除 (OSC)
    uint16_t ACRedo;                // AC 重做 (OSC)
    uint16_t ACReply;               // AC 回复 (OSC)
    uint16_t ACForwardMail;         // AC 转发邮件 (OSC)
    uint16_t ACSend;                // AC 发送 (OSC)
    uint16_t ACKbdLayoutNext;       // AC 切换到下一个键盘布局 (OSC)
    uint16_t ACNavigationGuidance;  // AC 导航指引 (OSC)
    uint16_t ACDesktopShowAllWindows;// AC 显示桌面所有窗口 (OSC)
    uint16_t ACContextMenu;         // AC 右键上下文菜单 (OSC)
    uint16_t ACSoftKeyLeft;         // AC 左软件键 (Sel)
    uint16_t ACSoftKeyRight;        // AC 右软件键 (Sel)
    uint16_t ACDesktopShowAllApps;  // AC 显示桌面所有应用 (Sel)

    // 0x02B0 - 0x02BF: 附加 AC 控制
    uint16_t ACIdleKeepAlive;       // AC 空闲保持激活 (Sel)

    // 0x02C0 - 0x02C6: 扩展键盘属性集合 (HUT 1.7)
    uint16_t ExtKbdAttrCollection;  // 扩展键盘属性集合 (CL)
    uint16_t KbdFormFactor;         // 键盘外形尺寸规格 (SV)
    uint16_t KbdKeyType;            // 键盘按键类型 (SV)
    uint16_t KbdPhysicalLayout;     // 键盘物理布局 (SV)
    uint16_t VendorKbdPhysicalLayout;// 厂商特定键盘物理布局 (SV)
    uint16_t KbdIETFLangTagIndex;   // 键盘 IETF 语言标签索引 (SV)
    uint16_t ImplementedKbdInputAssist;// 已实现的键盘输入辅助控制 (SV)

    // 0x02C7 - 0x02CC: 键盘输入辅助控制 (HUT 1.7 15.19)
    uint16_t ACKbdInputPrev;        // AC 键盘输入辅助：上一个 (Sel)
    uint16_t ACKbdInputNext;        // AC 键盘输入辅助：下一个 (Sel)
    uint16_t ACKbdInputPrevGroup;   // AC 键盘输入辅助：上一个组 (Sel)
    uint16_t ACKbdInputNextGroup;   // AC 键盘输入辅助：下一个组 (Sel)
    uint16_t ACKbdInputAccept;      // AC 键盘输入辅助：接受 (Sel)
    uint16_t ACKbdInputCancel;      // AC 键盘输入辅助：取消 (Sel)

    // 0x02D0 - 0x02D4: 防窥屏控制 (HUT 1.7 15.23)
    uint16_t PrivacyScreenToggle;   // 防窥屏开关切换 (OOC)
    uint16_t PrivacyScreenLevelDec; // 防窥等级递减 (RTC)
    uint16_t PrivacyScreenLevelInc; // 防窥等级递增 (RTC)
    uint16_t PrivacyScreenLevelMin; // 防窥等级调至最低 (OSC)
    uint16_t PrivacyScreenLevelMax; // 防窥等级调至最高 (OSC)

    // 0x0500 - 0x0514: 联系人控制 (HUT 1.7 15.17)
    uint16_t ContactEdited;         // 联系人已编辑 (OOC)
    uint16_t ContactAdded;          // 联系人已添加 (OOC)
    uint16_t ContactRecordActive;   // 联系人记录激活 (OOC)
    uint16_t ContactIndex;          // 联系人索引 (DV)
    uint16_t ContactNickname;       // 联系人昵称 (DV)
    uint16_t ContactFirstName;      // 联系人名 (DV)
    uint16_t ContactLastName;       // 联系人姓 (DV)
    uint16_t ContactFullName;       // 联系人全名 (DV)
    uint16_t ContactPhonePersonal;  // 联系人私人电话 (DV)
    uint16_t ContactPhoneBusiness;  // 联系人工作电话 (DV)
    uint16_t ContactPhoneMobile;    // 联系人移动电话 (DV)
    uint16_t ContactPhonePager;     // 联系人传呼机号 (DV)
    uint16_t ContactPhoneFax;       // 联系人传真号 (DV)
    uint16_t ContactPhoneOther;     // 联系人其它电话 (DV)
    uint16_t ContactEmailPersonal;  // 联系人私人邮箱 (DV)
    uint16_t ContactEmailBusiness;  // 联系人工作邮箱 (DV)
    uint16_t ContactEmailOther;     // 联系人其它邮箱 (DV)
    uint16_t ContactEmailMain;      // 联系人主邮箱 (DV)
    uint16_t ContactSpeedDialNumber;// 联系人快捷拨号号码 (DV)
    uint16_t ContactStatusFlag;     // 联系人状态标志 (DV)
    uint16_t ContactMisc;           // 联系人其它杂项信息 (DV)

    // 0x0515 - 0x0517: 键盘亮度扩展 (HUT 1.7 15.22)
    uint16_t KbdBrightnessNext;     // 键盘亮度：下一个亮度级 (OSC)
    uint16_t KbdBrightnessPrevious; // 键盘亮度：上一个亮度级 (OSC)
    uint16_t KbdBacklightLevelSuggestion;// 键盘背光推荐亮度级 (SV)

} Consumer_Map_TypeDef;

extern const Consumer_Map_TypeDef Consumer_Map;

#ifdef __cplusplus
}
#endif

#endif /* CONSUMER_MAP_H */
`

const Consumer_Map_C = `\
/**
 * @file Consumer_Map.c
 * @brief HID Usage Tables - Consumer Page (0x0C) 映射值 (HUT 1.7)
 * @note  基于 USB HID Usage Tables 1.7, 最大 Usage ID: 0x0517
 */

#include "Consumer_Map.h"

const Consumer_Map_TypeDef Consumer_Map = {
    // 0x0001 - 0x0006: 消费类控制类别
    .ConsumerControl     = 0x0001,
    .NumericKeyPad       = 0x0002,
    .ProgrammableButtons = 0x0003,
    .Microphone          = 0x0004,
    .Headphone           = 0x0005,
    .GraphicEqualizer    = 0x0006,

    // 0x0020 - 0x0022: 选择器
    .Plus10              = 0x0020,
    .Plus100             = 0x0021,
    .AMPM                = 0x0022,

    // 0x0030 - 0x0036: 系统电源控制
    .Power               = 0x0030,
    .Reset               = 0x0031,
    .Sleep               = 0x0032,
    .SleepAfter          = 0x0033,
    .SleepMode           = 0x0034,
    .Illumination        = 0x0035,
    .FunctionButtons     = 0x0036,

    // 0x0040 - 0x0048: 菜单控制
    .Menu                = 0x0040,
    .MenuPick            = 0x0041,
    .MenuUp              = 0x0042,
    .MenuDown            = 0x0043,
    .MenuLeft            = 0x0044,
    .MenuRight           = 0x0045,
    .MenuEscape          = 0x0046,
    .MenuValueIncrease   = 0x0047,
    .MenuValueDecrease   = 0x0048,

    // 0x0060 - 0x007D: 显示器 / 视听 / 相机控制
    .DataOnScreen          = 0x0060,
    .ClosedCaption         = 0x0061,
    .ClosedCaptionSelect   = 0x0062,
    .VCRTV                 = 0x0063,
    .BroadcastMode         = 0x0064,
    .Snapshot              = 0x0065,
    .Still                 = 0x0066,
    .RedMenuButton         = 0x0069,
    .GreenMenuButton       = 0x006A,
    .BlueMenuButton        = 0x006B,
    .YellowMenuButton      = 0x006C,
    .AspectRatio           = 0x006D,
    .DisplayBrightnessInc  = 0x006F,
    .DisplayBrightnessDec  = 0x0070,
    .DisplayBrightness     = 0x0071,
    .DisplayBacklightToggle= 0x0072,
    .DisplayBrightnessMin  = 0x0073,
    .DisplayBrightnessMax  = 0x0074,
    .DisplayBrightnessAuto = 0x0075,
    .CameraAccessEnable    = 0x0076,
    .CameraAccessDisable   = 0x0077,
    .CameraAccessToggle    = 0x0078,
    .KbdBrightnessInc      = 0x0079,
    .KbdBrightnessDec      = 0x007A,
    .KbdBacklightMin       = 0x007B,
    .KbdBacklightMax       = 0x007C,
    .KbdBacklightAuto      = 0x007D,

    // 0x0080 - 0x00A4: 选择 / 媒体选择 / 定时调度
    .Selection             = 0x0080,
    .AssignSelection       = 0x0081,
    .ModeStep              = 0x0082,
    .RecallLast            = 0x0083,
    .EnterChannel          = 0x0084,
    .OrderMovie            = 0x0085,
    .Channel               = 0x0086,
    .MediaSelection        = 0x0087,
    .MediaSelectComputer   = 0x0088,
    .MediaSelectTV         = 0x0089,
    .MediaSelectWWW        = 0x008A,
    .MediaSelectDVD        = 0x008B,
    .MediaSelectTelephone  = 0x008C,
    .MediaSelectProgramGuide=0x008D,
    .MediaSelectVideoPhone = 0x008E,
    .MediaSelectGames      = 0x008F,
    .MediaSelectMessages   = 0x0090,
    .MediaSelectCD         = 0x0091,
    .MediaSelectVCR        = 0x0092,
    .MediaSelectTuner      = 0x0093,
    .Quit                  = 0x0094,
    .Help                  = 0x0095,
    .MediaSelectTape       = 0x0096,
    .MediaSelectCable      = 0x0097,
    .MediaSelectSatellite  = 0x0098,
    .MediaSelectSecurity   = 0x0099,
    .MediaSelectHome       = 0x009A,
    .MediaSelectCall       = 0x009B,
    .ChannelIncrement      = 0x009C,
    .ChannelDecrement      = 0x009D,
    .MediaSelectSAP        = 0x009E,
    .VCRPlus               = 0x00A0,
    .Once                  = 0x00A1,
    .Daily                 = 0x00A2,
    .Weekly                = 0x00A3,
    .Monthly               = 0x00A4,

    // 0x00B0 - 0x00DF: 媒体传输控制 (播放控制)
    .Play                  = 0x00B0,
    .Pause                 = 0x00B1,
    .Record                = 0x00B2,
    .FastForward           = 0x00B3,
    .Rewind                = 0x00B4,
    .ScanNextTrack         = 0x00B5,
    .ScanPreviousTrack     = 0x00B6,
    .Stop                  = 0x00B7,
    .Eject                 = 0x00B8,
    .RandomPlay            = 0x00B9,
    .SelectDisc            = 0x00BA,
    .EnterDisc             = 0x00BB,
    .Repeat                = 0x00BC,
    .Tracking              = 0x00BD,
    .TrackNormal           = 0x00BE,
    .SlowTracking          = 0x00BF,
    .FrameForward          = 0x00C0,
    .FrameBack             = 0x00C1,
    .Mark                  = 0x00C2,
    .ClearMark             = 0x00C3,
    .RepeatFromMark        = 0x00C4,
    .ReturnToMark          = 0x00C5,
    .SearchMarkForward     = 0x00C6,
    .SearchMarkBackwards   = 0x00C7,
    .CounterReset          = 0x00C8,
    .ShowCounter           = 0x00C9,
    .SetCounter            = 0x00CA,
    .OpenClose             = 0x00CB,
    .Index                 = 0x00CC,
    .SlideShow             = 0x00CE,
    .PlayPause             = 0x00CD,
    .VoiceCommand          = 0x00CF,
    .Dictate               = 0x00D8,
    .EmojiPicker           = 0x00D9,

    // 0x00E0 - 0x00FF: 音频控制
    .Volume                = 0x00E0,
    .Balance               = 0x00E1,
    .Mute                  = 0x00E2,
    .Bass                  = 0x00E3,
    .Treble                = 0x00E4,
    .BassBoost             = 0x00E5,
    .SurroundMode          = 0x00E6,
    .Loudness              = 0x00E7,
    .MPX                   = 0x00E8,
    .VolumeIncrement       = 0x00E9,
    .VolumeDecrement       = 0x00EA,
    .SpeedSelect           = 0x00F0,
    .PlaybackSpeed         = 0x00F1,
    .StandardPlay          = 0x00F2,
    .LongPlay              = 0x00F3,
    .ExtendedPlay          = 0x00F4,
    .Slow                  = 0x00F5,

    // 0x0100 - 0x0108: 环境 / 报警控制
    .FanEnable             = 0x0100,
    .FanSpeed              = 0x0101,
    .LightEnable           = 0x0102,
    .LightIlluminationLevel= 0x0103,
    .ClimateControlEnable  = 0x0104,
    .RoomTemperature       = 0x0105,
    .SecurityEnable        = 0x0106,
    .FireAlarm             = 0x0107,
    .PoliceAlarm           = 0x0108,

    // 0x0150 - 0x0155: 扩展音频控制
    .BalanceRight          = 0x0150,
    .BalanceLeft           = 0x0151,
    .BassIncrement         = 0x0152,
    .BassDecrement         = 0x0153,
    .TrebleIncrement       = 0x0154,
    .TrebleDecrement       = 0x0155,

    // 0x0160 - 0x016A: 扬声器系统 / 声道控制
    .SpeakerSystem         = 0x0160,
    .ChannelLeft           = 0x0161,
    .ChannelRight          = 0x0162,
    .ChannelCenter         = 0x0163,
    .ChannelFront          = 0x0164,
    .ChannelCenterFront    = 0x0165,
    .ChannelSide           = 0x0166,
    .ChannelSurround       = 0x0167,
    .ChannelLFE            = 0x0168,
    .ChannelTop            = 0x0169,
    .ChannelUnknown        = 0x016A,

    // 0x0170 - 0x0174: 子频道 / 备用音频
    .SubChannel            = 0x0170,
    .SubChannelIncrement   = 0x0171,
    .SubChannelDecrement   = 0x0172,
    .AltAudioIncrement     = 0x0173,
    .AltAudioDecrement     = 0x0174,

    // 0x0180 - 0x01CE: 应用程序启动 (AL) 按键
    .ALAppLaunchButtons    = 0x0180,
    .ALButtonConfig        = 0x0181,
    .ALProgButtonConfig    = 0x0182,
    .ALConsumerCtrlConfig  = 0x0183,
    .ALWordProcessor       = 0x0184,
    .ALTextEditor          = 0x0185,
    .ALSpreadsheet         = 0x0186,
    .ALGraphicsEditor      = 0x0187,
    .ALPresentationApp     = 0x0188,
    .ALDatabaseApp         = 0x0189,
    .ALEmailReader         = 0x018A,
    .ALNewsreader          = 0x018B,
    .ALVoicemail           = 0x018C,
    .ALContacts            = 0x018D,
    .ALCalendar            = 0x018E,
    .ALTaskManager         = 0x018F,
    .ALJournal             = 0x0190,
    .ALFinance             = 0x0191,
    .ALCalculator          = 0x0192,
    .ALAVCapture           = 0x0193,
    .ALLocalBrowser        = 0x0194,
    .ALLANBrowser          = 0x0195,
    .ALInternetBrowser     = 0x0196,
    .ALRemoteNetworking    = 0x0197,
    .ALNetworkConference   = 0x0198,
    .ALNetworkChat         = 0x0199,
    .ALTelephony           = 0x019A,
    .ALLogon               = 0x019B,
    .ALLogoff              = 0x019C,
    .ALLogonLogoff         = 0x019D,
    .ALTerminalLock        = 0x019E,
    .ALControlPanel        = 0x019F,
    .ALCommandLine         = 0x01A0,
    .ALProcessTaskMgr      = 0x01A1,
    .ALSelectTask          = 0x01A2,
    .ALNextTask            = 0x01A3,
    .ALPreviousTask        = 0x01A4,
    .ALPreemptiveHalt      = 0x01A5,
    .ALHelp                = 0x01A6,  // AL 桌面/我的电脑 (与 ALHelp 相同)
    .ALDesktop             = 0x01A6,  // ALHelp 别名
    .ALDocuments           = 0x01A7,
    .ALSpellCheck          = 0x01AB,
    .ALKeyboardLayout      = 0x01AE,
    .ALScreenSaver         = 0x01B1,
    .ALFileExplorer        = 0x01B4,
    .ALImages              = 0x01B6,
    .ALAudio               = 0x01B7,
    .ALVideo               = 0x01B8,
    .ALMessenger           = 0x01BC,
    .ALInfo                = 0x01BD,
    .ALAssistant           = 0x01CB,
    .ALActionOnSelection   = 0x01CC,
    .ALContextualInsert    = 0x01CD,
    .ALContextualQuery     = 0x01CE,

    // 0x0201 - 0x029F: 通用图形用户界面应用控制 (AC)
    .ACNew                 = 0x0201,
    .ACOpen                = 0x0202,
    .ACClose               = 0x0203,
    .ACExit                = 0x0204,
    .ACMaximize            = 0x0205,
    .ACMinimize            = 0x0206,
    .ACSave                = 0x0207,
    .ACPrint               = 0x0208,
    .ACProperties          = 0x0209,
    .ACUndo                = 0x021A,
    .ACCopy                = 0x021B,
    .ACCut                 = 0x021C,
    .ACPaste               = 0x021D,
    .ACSelectAll           = 0x021E,
    .ACFind                = 0x021F,
    .ACFindAndReplace      = 0x0220,
    .ACSearch              = 0x0221,
    .ACGoTo                = 0x0222,
    .ACHome                = 0x0223,
    .ACBack                = 0x0224,
    .ACForward             = 0x0225,
    .ACStop                = 0x0226,
    .ACRefresh             = 0x0227,
    .ACPreviousLink        = 0x0228,
    .ACNextLink            = 0x0229,
    .ACBookmarks           = 0x022A,
    .ACHistory             = 0x022B,
    .ACSubscriptions       = 0x022C,
    .ACZoomIn              = 0x022D,
    .ACZoomOut             = 0x022E,
    .ACZoom                = 0x022F,
    .ACFullScreenView      = 0x0230,
    .ACNormalView          = 0x0231,
    .ACViewToggle          = 0x0232,
    .ACScrollUp            = 0x0233,
    .ACScrollDown          = 0x0234,
    .ACScroll              = 0x0235,
    .ACPanLeft             = 0x0236,
    .ACPanRight            = 0x0237,
    .ACPan                 = 0x0238,
    .ACNewWindow           = 0x0239,
    .ACTileHorizontally    = 0x023A,
    .ACTileVertically      = 0x023B,
    .ACFormat              = 0x023C,
    .ACEdit                = 0x023D,
    .ACCancel              = 0x025F,
    .ACInsert              = 0x0269,
    .ACDelete              = 0x026A,
    .ACRedo                = 0x0279,
    .ACReply               = 0x0289,
    .ACForwardMail         = 0x028B,
    .ACSend                = 0x028C,
    .ACKbdLayoutNext       = 0x029D,
    .ACNavigationGuidance  = 0x029E,
    .ACDesktopShowAllWindows=0x029F,
    .ACContextMenu         = 0x0266,
    .ACSoftKeyLeft         = 0x02A0,
    .ACSoftKeyRight        = 0x02A1,
    .ACDesktopShowAllApps  = 0x02A2,

    // 0x02B0 - 0x02BF: 附加 AC 控制 (HUT 1.7)
    .ACIdleKeepAlive       = 0x02B0,

    // 0x02C0 - 0x02C6: 扩展键盘属性集合 (HUT 1.7 15.18)
    .ExtKbdAttrCollection  = 0x02C0,
    .KbdFormFactor         = 0x02C1,
    .KbdKeyType            = 0x02C2,
    .KbdPhysicalLayout     = 0x02C3,
    .VendorKbdPhysicalLayout=0x02C4,
    .KbdIETFLangTagIndex   = 0x02C5,
    .ImplementedKbdInputAssist=0x02C6,

    // 0x02C7 - 0x02CC: 键盘输入辅助控制 (HUT 1.7 15.19)
    .ACKbdInputPrev        = 0x02C7,
    .ACKbdInputNext        = 0x02C8,
    .ACKbdInputPrevGroup   = 0x02C9,
    .ACKbdInputNextGroup   = 0x02CA,
    .ACKbdInputAccept      = 0x02CB,
    .ACKbdInputCancel      = 0x02CC,

    // 0x02D0 - 0x02D4: 防窥屏控制 (HUT 1.7 15.23)
    .PrivacyScreenToggle   = 0x02D0,
    .PrivacyScreenLevelDec = 0x02D1,
    .PrivacyScreenLevelInc = 0x02D2,
    .PrivacyScreenLevelMin = 0x02D3,
    .PrivacyScreenLevelMax = 0x02D4,

    // 0x0500 - 0x0514: 联系人控制 (HUT 1.7 15.17)
    .ContactEdited         = 0x0500,
    .ContactAdded          = 0x0501,
    .ContactRecordActive   = 0x0502,
    .ContactIndex          = 0x0503,
    .ContactNickname       = 0x0504,
    .ContactFirstName      = 0x0505,
    .ContactLastName       = 0x0506,
    .ContactFullName       = 0x0507,
    .ContactPhonePersonal  = 0x0508,
    .ContactPhoneBusiness  = 0x0509,
    .ContactPhoneMobile    = 0x050A,
    .ContactPhonePager     = 0x050B,
    .ContactPhoneFax       = 0x050C,
    .ContactPhoneOther     = 0x050D,
    .ContactEmailPersonal  = 0x050E,
    .ContactEmailBusiness  = 0x050F,
    .ContactEmailOther     = 0x0510,
    .ContactEmailMain      = 0x0511,
    .ContactSpeedDialNumber= 0x0512,
    .ContactStatusFlag     = 0x0513,
    .ContactMisc           = 0x0514,

    // 0x0515 - 0x0517: 键盘亮度扩展 (HUT 1.7 15.22)
    .KbdBrightnessNext     = 0x0515,
    .KbdBrightnessPrevious = 0x0516,
    .KbdBacklightLevelSuggestion = 0x0517,
};
`

export { Consumer_Map_H, Consumer_Map_C };
