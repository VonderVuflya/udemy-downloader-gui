import handleItem from './handleItem'
import {
  // courseDownloadFinished,
  updateDownloaderStatus,
  downloadStarted,
} from '../../ducks/downloads'

export default function downloadHandler(dispatch, getState, courseId) {
  try {
    const courseInfo = getState().downloads[courseId]
    if (!courseInfo) return
    const { curriculum, started: hasStarted } = courseInfo

    if (courseInfo.downloaded === courseInfo.total) {
      // dispatch(courseDownloadFinished(courseId))
      dispatch(updateDownloaderStatus(courseId, 'finished'))
    }

    if (!hasStarted) {
      const parentPath = `${courseInfo.settings.downloadPath}/${courseInfo.title}`
      dispatch(downloadStarted(courseId, parentPath))
    }

    console.log(getState().downloads[courseId])
    handleItem(getState, dispatch, courseInfo)

    // TODO: add yeild
    // curriculum.forEach(curriculumItem =>
    //   yeild handleItem(dispatch, getState, courseInfo, curriculumItem)
    // )
  } catch (e) {
    console.error(e)
  }
}
