import request from "@/assets/index.js";

export function getOpusList(data) {
    return request({
        url: "/Opus/opusAll",
        method: "post",
        data
    })
}

export function insetOpus(data) {
    return request({
        url: "/Opus/opusUpd",
        method: "post",
        data
    })
}