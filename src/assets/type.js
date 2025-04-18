import request from "@/assets/index.js";

export function getTypeAll(){
   return  request({
        url:"type/typeAll",
        method:"post"
    })
}
