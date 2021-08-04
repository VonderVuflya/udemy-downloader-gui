import axios from 'axios'

const urlFetcher = {
  asset: (courseId, itemId, lectureId) => {
    return axios
      .get(
        `https://www.udemy.com/api-2.0/users/me/subscribed-courses/${courseId}/lectures/${lectureId}/supplementary-assets/${itemId}?fields[asset]=download_urls,external_url,asset_type,filename`
      )
      .then(res => res.data)
  },
  lecture: (courseId, lectureId) => {
    return axios
      .get(
        `https://www.udemy.com/api-2.0/users/me/subscribed-courses/${courseId}/lectures/${lectureId}?fields[asset]=stream_urls,download_urls,captions,title,filename,data,body&fields[lecture]=asset,supplementary_assets`
      )
      .then(res => res.data)
  },
  caption: (courseId, lectureId) => {
    return axios
      .get(
        `https://www.udemy.com/api-2.0/users/me/subscribed-courses/${courseId}/lectures/${lectureId}?fields[asset]=stream_urls,download_urls,captions,title,filename,data,body&fields[lecture]=asset,supplementary_assets`
      )
      .then(res => res.data.asset)
  },
}

export default urlFetcher
