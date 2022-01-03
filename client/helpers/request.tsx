import Axios from './axios';

export const Github = async () => {
  try {
    const req = await Axios.get('/auth/github').then((res: any) => {
      if (res.status !== 200) throw new Error(res.statusText)
      return res.data;
    })
    return req
  } catch ( e: any ) {
    return new Error(e.name);
  }
}
