/* 导入模块 */
const request = require("sync-request");
const fs = require("fs");
/**
 * 配置信息
 * url: RSS Feed 链接
 * limit: 最大获取数限制
 */

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

var rssJSON = [];
/**
 * 通过 RSS2JSON 将 RSS 转换为 JSON
 */
const loadRSS = () => {
    console.log("开始获取 RSS 文件");
    try {
        for (let i = 0; i < config.length; i++) {
            let rssInfo = config[i];
            var res = request(
                "GET",
                "https://api.rss2json.com/v1/api.json?rss_url=" +
                    encodeURIComponent(rssInfo.url)
            );
            var rssContent = JSON.parse(res.getBody());
            if (rssInfo.limit == 0) rssInfo.limit = rssContent.items.length;
            let rssLength =
                rssContent.items.length > rssInfo.limit
                    ? rssInfo.limit
                    : rssContent.items.length;

            for (let n = 0; n < rssLength; n++) {
                let rssData = {
                    title: rssContent.items[n].title,
                    date: rssContent.items[n].pubDate,
                    description:
                        rssContent.items[n].content ||
                        rssContent.items[n].description,
                    link: rssContent.items[n].link,
                };
                rssJSON.push(rssData);
            }
        }
        console.log("获取 RSS 文件成功");
    } catch (e) {
        console.error("获取 RSS 文件失败");
        console.error(e);
    }
};
loadRSS();

/**
 * 日期排序
 */
function sortDownDate(a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
}
rssJSON = JSON.stringify(rssJSON.sort(sortDownDate));

/**
 * 写入 JSON 文件
 */
console.log("开始写入 JSON 文件");
try {
    fs.writeFileSync("./src/rss.json", rssJSON);
    console.log("写入 JSON 文件成功");
} catch (e) {
    console.error("写入 JSON 文件失败");
    console.error(e);
}
