# 宝可梦内容已迁出主站

独立仓库：https://github.com/Tito-XD/tito-pokemon（私有）
独立站点：https://tito-pokemon.pages.dev
Cloudflare Pages 项目：`tito-pokemon`；R2 bucket：`tito-cafe-1025`。

主站不再构建图鉴、151、1025 页面或托管相关图片；`/151`、`/pokedex/*`、`/1025` 仅作 302 跳转。`public/sw.js` 是旧图鉴离线缓存的退役脚本，暂时保留以便老访客更新。Gallery 导航入口继续隐藏。

宝可梦页面的维护、版权说明、素材说明与独立下线步骤见新仓库 README。需要彻底停止分发时，除了当前站点和 R2 公开访问，还需检查历史部署（旧的 Netlify deploy URL 不因迁移自动消失）。独立项目便于分别下线，不构成版权授权或账号/域名风险隔离保证。
