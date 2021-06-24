// function getConfig() {
//     let apiURL = document.getElementById("apiURL_input").value;
//     let apiKEY = document.getElementById("apiKEY_input").value;
//     fetch(apiURL + "config/get?token=" + apiKEY, {
//         method: "GET",
//         mode: "no-cors",
//     })
//         .then(res => res.json())
//         .then((json) => {
//             console.log(json);
//         });
// }

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
document.getElementById("rssURL_input").value = getLS("rssURL");
function saveConfig() {
    let rssURL = document.getElementById("rssURL_input").value;
    try {
        setLS("rssURL", rssURL);
        swal({
            icon: "success",
            title: "保存成功",
            timer: 2000,
        });
    } catch (e) {
        swal({
            icon: "error",
            title: "保存失败",
            text: `${e}`,
        });
    }
}
