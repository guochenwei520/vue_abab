import axios from "axios";

const request = axios.create({
    baseURL:"https://abab5-153392-5-1329683064.sh.run.tcloudbase.com",
    timeout:5000
})

export default  request;
