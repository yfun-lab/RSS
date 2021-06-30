var cardElement = document.getElementById("card");
/**
 * 对浏览器 localStorage 的封装
 */
const setLS = (k, v) => {
    try {
        return localStorage.setItem(k, v);
    } catch (e) {
        console.error("您的浏览器似乎不支持 localStorage~");
        console.error(e);
    }
};

const getLS = (k) => {
    try {
        return localStorage.getItem(k);
    } catch (e) {
        console.error("您的浏览器似乎不支持 localStorage~");
        console.error(e);
    }
};

/* Fetch URL，获取相关 RSS 数据 */
/* 在 RSS URL 后加入时间戳和随机数，防止缓存 */
var rssURL = getLS("rssURL") ? getLS("rssURL") : "./rss.json";
fetch(rssURL + "?t=" + new Date().getTime() + Math.random(), {})
    .then((res) => res.json())
    .then((json) => {
        // 去除加载动画
        document.getElementById("loading-spinner").remove();
        // 遍历 JSON，新建标签
        for (let i = 0; i < json.length; i++) {
            let ele = document.createElement("div");
            ele.className = "item";
            ele.innerHTML = `
            <div class="content">
                <h3><a href="${json[i].link}" target="_blank" rel="noreferrer noopener">${json[i].title}</a></h3>
                <p class="time">${json[i].date}</p>
            </div>
            <div class="pre-content" id="preview-content-${i}" style="max-width:100%;"><div class="pre-des textretty">${json[i].description}</div></div>
            <div class="btn" onclick="preview(document.getElementById('preview-content-${i}'));">
                <svg t="1624444308792" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2412" width="24" height="24">
                    <path d="M512 864c177.6 0 336.064-113.216 475.136-334.976a32 32 0 0 0 0-34.048C848 273.28 689.6 160 512 160 334.4 160 175.936 273.216 36.864 494.976a32 32 0 0 0 0 34.048C176 750.72 334.4 864 512 864z m0-640c148.032 0 284.608 94.592 410.048 288-125.44 193.408-262.016 288-410.048 288-148.032 0-284.608-94.592-410.048-288C227.392 318.592 363.968 224 512 224z" p-id="2413"></path>
                    <path d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384z m0-64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z" p-id="2414"></path>
                </svg>
            </div>
            `;
            // 追加元素
            cardElement.appendChild(ele);
        }
    });

/**
 * 预览文章
 */
function preview(content) {
    alertify
        .dialog("alert")
        .set({
            basic: true,
            transitionOff: true,
            message: content.innerHTML,
        })
        .show();
}
