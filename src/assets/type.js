import request from "@/assets/index.js";

export function getTypeAll(){
    request({
        url:"type/typeAll",
        method:"post"
    })
}
