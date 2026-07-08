const Consumer_Map_H = `\
/**
 * @file Consumer_Map.h
 * @brief HID Usage Tables - Consumer Page (0x0C) Macro Definitions (HUT 1.7)
 * @note  Based on USB HID Usage Tables 1.7, Max Usage ID: 0x0517
 */

#ifndef CONSUMER_MAP_H
#define CONSUMER_MAP_H

#ifdef __cplusplus
extern "C" {
#endif

/* 0x0001-0x0006: 消费类控制 */
#define HID_CON_CONSUMER_CONTROL                     0x0001  /* 消费类控制 */
#define HID_CON_NUMERIC_KEY_PAD                      0x0002  /* 数字小键盘 */
#define HID_CON_PROGRAMMABLE_BUTTONS                 0x0003  /* 可编程按键 */
#define HID_CON_MICROPHONE                           0x0004  /* 麦克风 */
#define HID_CON_HEADPHONE                            0x0005  /* 耳机 */
#define HID_CON_GRAPHIC_EQUALIZER                    0x0006  /* 图形均衡器 */

/* 0x0020-0x0022: 选择器 */
#define HID_CON_PLUS10                               0x0020  /* +10 */
#define HID_CON_PLUS100                              0x0021  /* +100 */
#define HID_CON_AMPM                                 0x0022  /* 上午/下午 */

/* 0x0030-0x0036: 系统电源 */
#define HID_CON_POWER                                0x0030  /* 电源 */
#define HID_CON_RESET                                0x0031  /* 复位 */
#define HID_CON_SLEEP                                0x0032  /* 睡眠 */
#define HID_CON_SLEEP_AFTER                          0x0033  /* 定时睡眠 */
#define HID_CON_SLEEP_MODE                           0x0034  /* 睡眠模式 */
#define HID_CON_ILLUMINATION                         0x0035  /* 背光照明 */
#define HID_CON_FUNCTION_BUTTONS                     0x0036  /* 功能按键 */

/* 0x0040-0x0048: 菜单控制 */
#define HID_CON_MENU                                 0x0040  /* 菜单 */
#define HID_CON_MENU_PICK                            0x0041  /* 菜单选取 */
#define HID_CON_MENU_UP                              0x0042  /* 菜单上移 */
#define HID_CON_MENU_DOWN                            0x0043  /* 菜单下移 */
#define HID_CON_MENU_LEFT                            0x0044  /* 菜单左移 */
#define HID_CON_MENU_RIGHT                           0x0045  /* 菜单右移 */
#define HID_CON_MENU_ESCAPE                          0x0046  /* 菜单退出 */
#define HID_CON_MENU_VALUE_INCREASE                  0x0047  /* 菜单数值增加 */
#define HID_CON_MENU_VALUE_DECREASE                  0x0048  /* 菜单数值减少 */

/* 0x0060-0x007D: 显示器/视听/相机 */
#define HID_CON_DATA_ON_SCREEN                       0x0060  /* 屏幕数据显示 */
#define HID_CON_CLOSED_CAPTION                       0x0061  /* 隐藏式字幕 */
#define HID_CON_CLOSED_CAPTION_SELECT                0x0062  /* 隐藏式字幕选择 */
#define HID_CON_VCRTV                                0x0063  /* 录像机/电视 */
#define HID_CON_BROADCAST_MODE                       0x0064  /* 广播模式 */
#define HID_CON_SNAPSHOT                             0x0065  /* 快照 */
#define HID_CON_STILL                                0x0066  /* 静止画面 */
#define HID_CON_RED_MENU_BUTTON                      0x0069  /* 红色菜单键 */
#define HID_CON_GREEN_MENU_BUTTON                    0x006A  /* 绿色菜单键 */
#define HID_CON_BLUE_MENU_BUTTON                     0x006B  /* 蓝色菜单键 */
#define HID_CON_YELLOW_MENU_BUTTON                   0x006C  /* 黄色菜单键 */
#define HID_CON_ASPECT_RATIO                         0x006D  /* 屏幕宽高比 */
#define HID_CON_DISPLAY_BRIGHTNESS_INC               0x006F  /* 亮度递增 */
#define HID_CON_DISPLAY_BRIGHTNESS_DEC               0x0070  /* 亮度递减 */
#define HID_CON_DISPLAY_BRIGHTNESS                   0x0071  /* 显示器亮度 */
#define HID_CON_DISPLAY_BACKLIGHT_TOGGLE             0x0072  /* 背光开关 */
#define HID_CON_DISPLAY_BRIGHTNESS_MIN               0x0073  /* 亮度最低 */
#define HID_CON_DISPLAY_BRIGHTNESS_MAX               0x0074  /* 亮度最高 */
#define HID_CON_DISPLAY_BRIGHTNESS_AUTO              0x0075  /* 自动亮度 */
#define HID_CON_CAMERA_ACCESS_ENABLE                 0x0076  /* 摄像头开启 */
#define HID_CON_CAMERA_ACCESS_DISABLE                0x0077  /* 摄像头关闭 */
#define HID_CON_CAMERA_ACCESS_TOGGLE                 0x0078  /* 摄像头切换 */
#define HID_CON_KBD_BRIGHTNESS_INC                   0x0079  /* 键盘亮度递增 */
#define HID_CON_KBD_BRIGHTNESS_DEC                   0x007A  /* 键盘亮度递减 */
#define HID_CON_KBD_BACKLIGHT_MIN                    0x007B  /* 键盘背光最低 */
#define HID_CON_KBD_BACKLIGHT_MAX                    0x007C  /* 键盘背光最高 */
#define HID_CON_KBD_BACKLIGHT_AUTO                   0x007D  /* 键盘背光自动 */

/* 0x0080-0x00A4: 媒体选择/定时 */
#define HID_CON_SELECTION                            0x0080  /* 选择 */
#define HID_CON_ASSIGN_SELECTION                     0x0081  /* 分配选择 */
#define HID_CON_MODE_STEP                            0x0082  /* 模式步进 */
#define HID_CON_RECALL_LAST                          0x0083  /* 召回上一个 */
#define HID_CON_ENTER_CHANNEL                        0x0084  /* 进入频道 */
#define HID_CON_ORDER_MOVIE                          0x0085  /* 订购电影 */
#define HID_CON_CHANNEL                              0x0086  /* 频道 */
#define HID_CON_MEDIA_SELECTION                      0x0087  /* 媒体选择 */
#define HID_CON_MEDIA_SELECT_COMPUTER                0x0088  /* 媒体:电脑 */
#define HID_CON_MEDIA_SELECT_TV                      0x0089  /* 媒体:电视 */
#define HID_CON_MEDIA_SELECT_WWW                     0x008A  /* 媒体:互联网 */
#define HID_CON_MEDIA_SELECT_DVD                     0x008B  /* 媒体:DVD */
#define HID_CON_MEDIA_SELECT_TELEPHONE               0x008C  /* 媒体:电话 */
#define HID_CON_MEDIA_SELECT_PROGRAM_GUIDE           0x008D  /* 媒体:节目指南 */
#define HID_CON_MEDIA_SELECT_VIDEO_PHONE             0x008E  /* 媒体:可视电话 */
#define HID_CON_MEDIA_SELECT_GAMES                   0x008F  /* 媒体:游戏 */
#define HID_CON_MEDIA_SELECT_MESSAGES                0x0090  /* 媒体:信息 */
#define HID_CON_MEDIA_SELECT_CD                      0x0091  /* 媒体:CD */
#define HID_CON_MEDIA_SELECT_VCR                     0x0092  /* 媒体:录像机 */
#define HID_CON_MEDIA_SELECT_TUNER                   0x0093  /* 媒体:收音机 */
#define HID_CON_QUIT                                 0x0094  /* 退出 */
#define HID_CON_HELP                                 0x0095  /* 帮助 */
#define HID_CON_MEDIA_SELECT_TAPE                    0x0096  /* 媒体:磁带 */
#define HID_CON_MEDIA_SELECT_CABLE                   0x0097  /* 媒体:有线电视 */
#define HID_CON_MEDIA_SELECT_SATELLITE               0x0098  /* 媒体:卫星电视 */
#define HID_CON_MEDIA_SELECT_SECURITY                0x0099  /* 媒体:安防 */
#define HID_CON_MEDIA_SELECT_HOME                    0x009A  /* 媒体:主页 */
#define HID_CON_MEDIA_SELECT_CALL                    0x009B  /* 媒体:呼叫 */
#define HID_CON_CHANNEL_INCREMENT                    0x009C  /* 频道递增 */
#define HID_CON_CHANNEL_DECREMENT                    0x009D  /* 频道递减 */
#define HID_CON_MEDIA_SELECT_SAP                     0x009E  /* 媒体:SAP */
#define HID_CON_VCR_PLUS                             0x00A0  /* VCR Plus */
#define HID_CON_ONCE                                 0x00A1  /* 单次定时 */
#define HID_CON_DAILY                                0x00A2  /* 每日定时 */
#define HID_CON_WEEKLY                               0x00A3  /* 每周定时 */

/* 0x00B0-0x00D9: 媒体传输(播放控制) */
#define HID_CON_MONTHLY                              0x00A4  /* 每月定时 */
#define HID_CON_PLAY                                 0x00B0  /* 播放 */
#define HID_CON_PAUSE                                0x00B1  /* 暂停 */
#define HID_CON_RECORD                               0x00B2  /* 录制 */
#define HID_CON_FAST_FORWARD                         0x00B3  /* 快进 */
#define HID_CON_REWIND                               0x00B4  /* 快退 */
#define HID_CON_SCAN_NEXT_TRACK                      0x00B5  /* 下一曲 */
#define HID_CON_SCAN_PREVIOUS_TRACK                  0x00B6  /* 上一曲 */
#define HID_CON_STOP                                 0x00B7  /* 停止 */
#define HID_CON_EJECT                                0x00B8  /* 弹出 */
#define HID_CON_RANDOM_PLAY                          0x00B9  /* 随机播放 */
#define HID_CON_SELECT_DISC                          0x00BA  /* 选择光盘 */
#define HID_CON_ENTER_DISC                           0x00BB  /* 载入光盘 */
#define HID_CON_REPEAT                               0x00BC  /* 重复播放 */
#define HID_CON_TRACKING                             0x00BD  /* 磁迹跟踪 */
#define HID_CON_TRACK_NORMAL                         0x00BE  /* 磁迹标准 */
#define HID_CON_SLOW_TRACKING                        0x00BF  /* 慢速磁迹 */
#define HID_CON_FRAME_FORWARD                        0x00C0  /* 单帧前进 */
#define HID_CON_FRAME_BACK                           0x00C1  /* 单帧后退 */
#define HID_CON_MARK                                 0x00C2  /* 标记 */
#define HID_CON_CLEAR_MARK                           0x00C3  /* 清除标记 */
#define HID_CON_REPEAT_FROM_MARK                     0x00C4  /* 从标记处循环 */
#define HID_CON_RETURN_TO_MARK                       0x00C5  /* 返回标记处 */
#define HID_CON_SEARCH_MARK_FORWARD                  0x00C6  /* 向前搜索标记 */
#define HID_CON_SEARCH_MARK_BACKWARDS                0x00C7  /* 向后搜索标记 */
#define HID_CON_COUNTER_RESET                        0x00C8  /* 计数器清零 */
#define HID_CON_SHOW_COUNTER                         0x00C9  /* 显示计数器 */
#define HID_CON_SET_COUNTER                          0x00CA  /* 设置计数器 */
#define HID_CON_OPEN_CLOSE                           0x00CB  /* 仓门开/关 */
#define HID_CON_INDEX                                0x00CC  /* 索引 */
#define HID_CON_PLAY_PAUSE                           0x00CD  /* 播放/暂停 */
#define HID_CON_SLIDE_SHOW                           0x00CE  /* 幻灯片放映 */
#define HID_CON_VOICE_COMMAND                        0x00CF  /* 语音命令 */
#define HID_CON_DICTATE                              0x00D8  /* 听写/语音输入 */
#define HID_CON_EMOJI_PICKER                         0x00D9  /* 表情符号选择器 */

/* 0x00E0-0x00F5: 音频控制 */
#define HID_CON_VOLUME                               0x00E0  /* 音量 */
#define HID_CON_BALANCE                              0x00E1  /* 左右平衡 */
#define HID_CON_MUTE                                 0x00E2  /* 静音 */
#define HID_CON_BASS                                 0x00E3  /* 低音 */
#define HID_CON_TREBLE                               0x00E4  /* 高音 */
#define HID_CON_BASS_BOOST                           0x00E5  /* 低音增强 */
#define HID_CON_SURROUND_MODE                        0x00E6  /* 环绕声模式 */
#define HID_CON_LOUDNESS                             0x00E7  /* 等响度控制 */
#define HID_CON_MPX                                  0x00E8  /* 立体声复用 */
#define HID_CON_VOLUME_INCREMENT                     0x00E9  /* 音量递增 */
#define HID_CON_VOLUME_DECREMENT                     0x00EA  /* 音量递减 */
#define HID_CON_SPEED_SELECT                         0x00F0  /* 速度选择 */
#define HID_CON_PLAYBACK_SPEED                       0x00F1  /* 播放速度 */
#define HID_CON_STANDARD_PLAY                        0x00F2  /* 标准播放SP */
#define HID_CON_LONG_PLAY                            0x00F3  /* 长时播放LP */
#define HID_CON_EXTENDED_PLAY                        0x00F4  /* 超长播放EP */
#define HID_CON_SLOW                                 0x00F5  /* 慢速播放 */

/* 0x0100-0x0108: 环境/报警 */
#define HID_CON_FAN_ENABLE                           0x0100  /* 风扇开启 */
#define HID_CON_FAN_SPEED                            0x0101  /* 风扇转速 */
#define HID_CON_LIGHT_ENABLE                         0x0102  /* 照明开启 */
#define HID_CON_LIGHT_ILLUMINATION_LEVEL             0x0103  /* 照明亮度 */
#define HID_CON_CLIMATE_CONTROL_ENABLE               0x0104  /* 空调控制开启 */
#define HID_CON_ROOM_TEMPERATURE                     0x0105  /* 室内温度 */
#define HID_CON_SECURITY_ENABLE                      0x0106  /* 安防启用 */
#define HID_CON_FIRE_ALARM                           0x0107  /* 火警 */
#define HID_CON_POLICE_ALARM                         0x0108  /* 警报 */

/* 0x0150-0x0155: 扩展音频 */
#define HID_CON_BALANCE_RIGHT                        0x0150  /* 右平衡 */
#define HID_CON_BALANCE_LEFT                         0x0151  /* 左平衡 */
#define HID_CON_BASS_INCREMENT                       0x0152  /* 低音递增 */
#define HID_CON_BASS_DECREMENT                       0x0153  /* 低音递减 */
#define HID_CON_TREBLE_INCREMENT                     0x0154  /* 高音递增 */
#define HID_CON_TREBLE_DECREMENT                     0x0155  /* 高音递减 */

/* 0x0160-0x016A: 扬声器/声道 */
#define HID_CON_SPEAKER_SYSTEM                       0x0160  /* 扬声器系统 */
#define HID_CON_CHANNEL_LEFT                         0x0161  /* 左声道 */
#define HID_CON_CHANNEL_RIGHT                        0x0162  /* 右声道 */
#define HID_CON_CHANNEL_CENTER                       0x0163  /* 中置声道 */
#define HID_CON_CHANNEL_FRONT                        0x0164  /* 前置声道 */
#define HID_CON_CHANNEL_CENTER_FRONT                 0x0165  /* 前中置声道 */
#define HID_CON_CHANNEL_SIDE                         0x0166  /* 侧环绕声道 */
#define HID_CON_CHANNEL_SURROUND                     0x0167  /* 后环绕声道 */
#define HID_CON_CHANNEL_LFE                          0x0168  /* 低频增强 */
#define HID_CON_CHANNEL_TOP                          0x0169  /* 顶置天空声道 */
#define HID_CON_CHANNEL_UNKNOWN                      0x016A  /* 未知声道 */

/* 0x0170-0x0174: 子频道/备用音频 */
#define HID_CON_SUB_CHANNEL                          0x0170  /* 子频道 */
#define HID_CON_SUB_CHANNEL_INCREMENT                0x0171  /* 子频道递增 */
#define HID_CON_SUB_CHANNEL_DECREMENT                0x0172  /* 子频道递减 */
#define HID_CON_ALT_AUDIO_INCREMENT                  0x0173  /* 备用音频递增 */
#define HID_CON_ALT_AUDIO_DECREMENT                  0x0174  /* 备用音频递减 */

/* 0x0180-0x01CE: AL应用启动 */
#define HID_CON_AL_APP_LAUNCH_BUTTONS                0x0180  /* AL应用启动按键 */
#define HID_CON_AL_BUTTON_CONFIG                     0x0181  /* AL启动键配置 */
#define HID_CON_AL_PROG_BUTTON_CONFIG                0x0182  /* AL可编程按键配置 */
#define HID_CON_AL_CONSUMER_CTRL_CONFIG              0x0183  /* AL消费类控制配置 */
#define HID_CON_AL_WORD_PROCESSOR                    0x0184  /* AL文字处理器 */
#define HID_CON_AL_TEXT_EDITOR                       0x0185  /* AL文本编辑器 */
#define HID_CON_AL_SPREADSHEET                       0x0186  /* AL电子表格 */
#define HID_CON_AL_GRAPHICS_EDITOR                   0x0187  /* AL图形编辑器 */
#define HID_CON_AL_PRESENTATION_APP                  0x0188  /* AL演示文稿 */
#define HID_CON_AL_DATABASE_APP                      0x0189  /* AL数据库 */
#define HID_CON_AL_EMAIL_READER                      0x018A  /* AL邮件阅读器 */
#define HID_CON_AL_NEWSREADER                        0x018B  /* AL新闻阅读器 */
#define HID_CON_AL_VOICEMAIL                         0x018C  /* AL语音邮件 */
#define HID_CON_AL_CONTACTS                          0x018D  /* AL联系人 */
#define HID_CON_AL_CALENDAR                          0x018E  /* AL日历 */
#define HID_CON_AL_TASK_MANAGER                      0x018F  /* AL任务管理器 */
#define HID_CON_AL_JOURNAL                           0x0190  /* AL日志 */
#define HID_CON_AL_FINANCE                           0x0191  /* AL记账/财务 */
#define HID_CON_AL_CALCULATOR                        0x0192  /* AL计算器 */
#define HID_CON_ALAV_CAPTURE                         0x0193  /* AL音视频捕获 */
#define HID_CON_AL_LOCAL_BROWSER                     0x0194  /* AL本地浏览器 */
#define HID_CON_ALLAN_BROWSER                        0x0195  /* AL局域网浏览器 */
#define HID_CON_AL_INTERNET_BROWSER                  0x0196  /* AL互联网浏览器 */
#define HID_CON_AL_REMOTE_NETWORKING                 0x0197  /* AL远程网络 */
#define HID_CON_AL_NETWORK_CONFERENCE                0x0198  /* AL网络会议 */
#define HID_CON_AL_NETWORK_CHAT                      0x0199  /* AL网络聊天 */
#define HID_CON_AL_TELEPHONY                         0x019A  /* AL电话/拨号器 */
#define HID_CON_AL_LOGON                             0x019B  /* AL登录 */
#define HID_CON_AL_LOGOFF                            0x019C  /* AL注销 */
#define HID_CON_AL_LOGON_LOGOFF                      0x019D  /* AL登录/注销切换 */
#define HID_CON_AL_TERMINAL_LOCK                     0x019E  /* AL终端锁定 */
#define HID_CON_AL_CONTROL_PANEL                     0x019F  /* AL控制面板 */
#define HID_CON_AL_COMMAND_LINE                      0x01A0  /* AL命令行 */
#define HID_CON_AL_PROCESS_TASK_MGR                  0x01A1  /* AL进程/任务管理器 */
#define HID_CON_AL_SELECT_TASK                       0x01A2  /* AL选择任务 */
#define HID_CON_AL_NEXT_TASK                         0x01A3  /* AL下一个任务 */
#define HID_CON_AL_PREVIOUS_TASK                     0x01A4  /* AL上一个任务 */
#define HID_CON_AL_PREEMPTIVE_HALT                   0x01A5  /* AL强行终止任务 */
#define HID_CON_AL_DESKTOP                           0x01A6  /* AL桌面/我的电脑 */
#define HID_CON_AL_HELP                              0x01A6  /* AL帮助(同桌面) */
#define HID_CON_AL_DOCUMENTS                         0x01A7  /* AL我的文档 */
#define HID_CON_AL_SPELL_CHECK                       0x01AB  /* AL拼写检查 */
#define HID_CON_AL_KEYBOARD_LAYOUT                   0x01AE  /* AL键盘布局 */
#define HID_CON_AL_SCREEN_SAVER                      0x01B1  /* AL屏幕保护 */
#define HID_CON_AL_FILE_EXPLORER                     0x01B4  /* AL文件资源管理器 */

/* 0x0201-0x02B0: AC应用控制 */
#define HID_CON_AL_IMAGES                            0x01B6  /* AL图片/相册 */
#define HID_CON_AL_AUDIO                             0x01B7  /* AL音频/音乐 */
#define HID_CON_AL_VIDEO                             0x01B8  /* AL视频 */
#define HID_CON_AL_MESSENGER                         0x01BC  /* AL即时通讯 */
#define HID_CON_AL_INFO                              0x01BD  /* AL信息 */
#define HID_CON_AL_ASSISTANT                         0x01CB  /* AL数字助理 */
#define HID_CON_AL_ACTION_ON_SELECTION               0x01CC  /* AL对所选内容执行操作 */
#define HID_CON_AL_CONTEXTUAL_INSERT                 0x01CD  /* AL上下文相关插入 */
#define HID_CON_AL_CONTEXTUAL_QUERY                  0x01CE  /* AL上下文相关查询 */
#define HID_CON_AC_NEW                               0x0201  /* AC新建 */
#define HID_CON_AC_OPEN                              0x0202  /* AC打开 */
#define HID_CON_AC_CLOSE                             0x0203  /* AC关闭 */
#define HID_CON_AC_EXIT                              0x0204  /* AC退出 */
#define HID_CON_AC_MAXIMIZE                          0x0205  /* AC最大化 */
#define HID_CON_AC_MINIMIZE                          0x0206  /* AC最小化 */
#define HID_CON_AC_SAVE                              0x0207  /* AC保存 */
#define HID_CON_AC_PRINT                             0x0208  /* AC打印 */
#define HID_CON_AC_PROPERTIES                        0x0209  /* AC属性 */
#define HID_CON_AC_UNDO                              0x021A  /* AC撤销 */
#define HID_CON_AC_COPY                              0x021B  /* AC复制 */
#define HID_CON_AC_CUT                               0x021C  /* AC剪切 */
#define HID_CON_AC_PASTE                             0x021D  /* AC粘贴 */
#define HID_CON_AC_SELECT_ALL                        0x021E  /* AC全选 */
#define HID_CON_AC_FIND                              0x021F  /* AC查找 */
#define HID_CON_AC_FIND_AND_REPLACE                  0x0220  /* AC查找并替换 */
#define HID_CON_AC_SEARCH                            0x0221  /* AC搜索 */
#define HID_CON_AC_GO_TO                             0x0222  /* AC定位到 */
#define HID_CON_AC_HOME                              0x0223  /* AC主页 */
#define HID_CON_AC_BACK                              0x0224  /* AC后退 */
#define HID_CON_AC_FORWARD                           0x0225  /* AC前进 */
#define HID_CON_AC_STOP                              0x0226  /* AC停止 */
#define HID_CON_AC_REFRESH                           0x0227  /* AC刷新 */
#define HID_CON_AC_PREVIOUS_LINK                     0x0228  /* AC上一个超链接 */
#define HID_CON_AC_NEXT_LINK                         0x0229  /* AC下一个超链接 */
#define HID_CON_AC_BOOKMARKS                         0x022A  /* AC书签/收藏夹 */
#define HID_CON_AC_HISTORY                           0x022B  /* AC历史记录 */
#define HID_CON_AC_SUBSCRIPTIONS                     0x022C  /* AC订阅 */
#define HID_CON_AC_ZOOM_IN                           0x022D  /* AC放大 */
#define HID_CON_AC_ZOOM_OUT                          0x022E  /* AC缩小 */
#define HID_CON_AC_ZOOM                              0x022F  /* AC缩放 */
#define HID_CON_AC_FULL_SCREEN_VIEW                  0x0230  /* AC全屏视图 */
#define HID_CON_AC_NORMAL_VIEW                       0x0231  /* AC常规视图 */
#define HID_CON_AC_VIEW_TOGGLE                       0x0232  /* AC全屏/常规切换 */
#define HID_CON_AC_SCROLL_UP                         0x0233  /* AC向上滚动 */
#define HID_CON_AC_SCROLL_DOWN                       0x0234  /* AC向下滚动 */
#define HID_CON_AC_SCROLL                            0x0235  /* AC滚动 */
#define HID_CON_AC_PAN_LEFT                          0x0236  /* AC向左平移 */
#define HID_CON_AC_PAN_RIGHT                         0x0237  /* AC向右平移 */
#define HID_CON_AC_PAN                               0x0238  /* AC平移 */
#define HID_CON_AC_NEW_WINDOW                        0x0239  /* AC新建窗口 */
#define HID_CON_AC_TILE_HORIZONTALLY                 0x023A  /* AC水平平铺 */

/* 0x02C0-0x02CC: 键盘属性/输入辅助 */
#define HID_CON_AC_TILE_VERTICALLY                   0x023B  /* AC垂直平铺 */
#define HID_CON_AC_FORMAT                            0x023C  /* AC格式化 */
#define HID_CON_AC_EDIT                              0x023D  /* AC编辑 */
#define HID_CON_AC_CANCEL                            0x025F  /* AC取消 */
#define HID_CON_AC_INSERT                            0x0269  /* AC插入 */
#define HID_CON_AC_DELETE                            0x026A  /* AC删除 */
#define HID_CON_AC_REDO                              0x0279  /* AC重做 */
#define HID_CON_AC_REPLY                             0x0289  /* AC回复 */
#define HID_CON_AC_FORWARD_MAIL                      0x028B  /* AC转发邮件 */
#define HID_CON_AC_SEND                              0x028C  /* AC发送 */
#define HID_CON_AC_KBD_LAYOUT_NEXT                   0x029D  /* AC下一键盘布局 */
#define HID_CON_AC_NAVIGATION_GUIDANCE               0x029E  /* AC导航指引 */

/* 0x02D0-0x02D4: 防窥屏 */
#define HID_CON_AC_DESKTOP_SHOW_ALL_WINDOWS          0x029F  /* AC显示桌面所有窗口 */
#define HID_CON_AC_CONTEXT_MENU                      0x0266  /* AC右键上下文菜单 */
#define HID_CON_AC_SOFT_KEY_LEFT                     0x02A0  /* AC左软件键 */
#define HID_CON_AC_SOFT_KEY_RIGHT                    0x02A1  /* AC右软件键 */
#define HID_CON_AC_DESKTOP_SHOW_ALL_APPS             0x02A2  /* AC显示桌面所有应用 */

/* 0x0500-0x0517: 联系人/键盘亮度扩展 */
#define HID_CON_AC_IDLE_KEEP_ALIVE                   0x02B0  /* AC空闲保持激活 */
#define HID_CON_EXT_KBD_ATTR_COLLECTION              0x02C0  /* 扩展键盘属性集合 */
#define HID_CON_KBD_FORM_FACTOR                      0x02C1  /* 键盘外形尺寸 */
#define HID_CON_KBD_KEY_TYPE                         0x02C2  /* 键盘按键类型 */
#define HID_CON_KBD_PHYSICAL_LAYOUT                  0x02C3  /* 键盘物理布局 */
#define HID_CON_VENDOR_KBD_PHYSICAL_LAYOUT           0x02C4  /* 厂商键盘物理布局 */
#define HID_CON_KBD_IETF_LANG_TAG_INDEX              0x02C5  /* 键盘IETF语言标签索引 */
#define HID_CON_IMPLEMENTED_KBD_INPUT_ASSIST         0x02C6  /* 已实现键盘输入辅助 */
#define HID_CON_AC_KBD_INPUT_PREV                    0x02C7  /* AC键盘输入辅助:上一个 */
#define HID_CON_AC_KBD_INPUT_NEXT                    0x02C8  /* AC键盘输入辅助:下一个 */
#define HID_CON_AC_KBD_INPUT_PREV_GROUP              0x02C9  /* AC键盘输入辅助:上一组 */
#define HID_CON_AC_KBD_INPUT_NEXT_GROUP              0x02CA  /* AC键盘输入辅助:下一组 */
#define HID_CON_AC_KBD_INPUT_ACCEPT                  0x02CB  /* AC键盘输入辅助:接受 */
#define HID_CON_AC_KBD_INPUT_CANCEL                  0x02CC  /* AC键盘输入辅助:取消 */
#define HID_CON_PRIVACY_SCREEN_TOGGLE                0x02D0  /* 防窥屏开关 */
#define HID_CON_PRIVACY_SCREEN_LEVEL_DEC             0x02D1  /* 防窥等级递减 */
#define HID_CON_PRIVACY_SCREEN_LEVEL_INC             0x02D2  /* 防窥等级递增 */
#define HID_CON_PRIVACY_SCREEN_LEVEL_MIN             0x02D3  /* 防窥等级最低 */
#define HID_CON_PRIVACY_SCREEN_LEVEL_MAX             0x02D4  /* 防窥等级最高 */
#define HID_CON_CONTACT_EDITED                       0x0500  /* 联系人已编辑 */
#define HID_CON_CONTACT_ADDED                        0x0501  /* 联系人已添加 */
#define HID_CON_CONTACT_RECORD_ACTIVE                0x0502  /* 联系人记录激活 */
#define HID_CON_CONTACT_INDEX                        0x0503  /* 联系人索引 */
#define HID_CON_CONTACT_NICKNAME                     0x0504  /* 联系人昵称 */

#ifdef __cplusplus
}
#endif

#endif /* CONSUMER_MAP_H */
`

export { Consumer_Map_H };
