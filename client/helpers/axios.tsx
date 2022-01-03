import axios from "axios";
import { config } from "../config";

const Axios = axios;
Axios.defaults.baseURL = config.url;

export default Axios;