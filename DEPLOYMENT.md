# 本仓库的部署与日常管理

状态页：<https://uptimeflare-8y5.pages.dev/>

本仓库已同步此前通过本地 Wrangler 部署的生产配置，来源为
`lyc8503/UptimeFlare` 的 `a5670e51cbc167bf3610fce4d3389dd00141d729`。

## 当前配置

- 主站：https://www.fabrapid.com/（ID：fabrapid_main）
- 工具站：https://3d-tools.fabrapid.com/（ID：fabrapid_3d_tools）
- HHCNC：https://hhcnctech.com/（ID：hhcnctech_main）
- 每 10 分钟检查一次：每小时的 00、10、20、30、40、50 分。
- GET 请求，预期 HTTP 200，超时 10 秒。
- 飞书故障与恢复通知已接入，原有历史数据保留在 D1。

## 启用 GitHub 自动部署

1. 在 Cloudflare 创建 API Token，使用 **Edit Cloudflare Workers** 模板，包含 **D1 Edit** 权限，限制为本项目所在账号。
2. 在本仓库 **Settings → Secrets and variables → Actions** 添加 `CLOUDFLARE_API_TOKEN`。
3. 添加 `FEISHU_WEBHOOK_URL` Actions Secret，填入飞书群机器人的 Webhook。工作流会同步为同名 Worker Secret，仅在 Worker 运行时读取。
4. 在 **Actions** 页面允许 fork 仓库运行工作流（如 GitHub 提示），选择 **Deploy to Cloudflare → Run workflow**。
5. 确认工作流成功。以后提交到 `main` 会自动构建并更新线上部署。

没有密钥时，工作流会在部署凭据检查处明确失败，不会修改线上资源。
不要把 API Token、机器人令牌或带密钥的 Webhook 提交到这个公开仓库。
本机 Wrangler 的 OAuth 登录不会自动授权 GitHub Actions。

## 添加或修改监控

在 GitHub 网页打开 `uptime.config.ts`，点击编辑，修改 `workerConfig.monitors`，提交到 `main`。
复制已有监控条目即可添加站点，但每个 `id` 必须唯一。
保留 `id` 会保留历史关联；修改目标地址不会清空旧故障记录。

检查频率由 `worker/wrangler.toml` 的 `triggers.crons` 管理。
GitHub Actions 不运行定时检查，只负责部署；实际检查由 Cloudflare Cron 执行。

## 告警

已启用飞书文本通知：检测到故障和恢复时发送，持续故障期间不因错误原因变化重复通知。
检查频率为 10 分钟，故障发现可能接近 10 分钟后；未额外设置告警等待时间。

Webhook 只保存在 GitHub Actions Secret 和 Cloudflare Worker Secret `FEISHU_WEBHOOK_URL` 中。
更换机器人时，在仓库 Settings 中更新该 Secret，再运行 Deploy to Cloudflare 工作流即可。
页面构建不接收 Webhook 密钥，运行日志也不会输出 Webhook URL、请求头或通知正文。


## 已存在的 Cloudflare 资源

- 账号：94d197e33c0d7c88c00816c99445ddcc
- Pages：uptimeflare
- Worker：uptimeflare_worker
- D1：uptimeflare_d1（f7758dd2-69e6-4f75-91fc-122366ed9742）
- Durable Object 类：RemoteChecker（当前监控未启用地区代理，不调用它）

工作流直接使用 Wrangler 更新已有资源，不会新建数据库或重置历史。
`deploy.tf` 是上游保留的部署方式，本工作流不执行它；日常以 Wrangler 配置为准。
