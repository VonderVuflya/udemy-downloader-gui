import {
  // FILE_DOWNLOAD_FINISHED,
  // UPDATE_CHAPTER_NUMBER,
  // UPDATE_COURSE_VISITED_FILES,
  // UPDATE_LECTURE_NUMBER,
  // updateChapterNumber,
  updateLectureNumber,
} from '../../ducks/downloads'
import downloadHandler from './downloadHandler'
import handleChapter from './handleChapter'
import getDownloadItem from './getDownloadItem'
import downloadItem from './downloadItem'

export default function handleItem(getState, dispatch, course) {
  const item = getDownloadItem(course)
  console.log({ item })

  // eslint-disable-next-line no-underscore-dangle
  switch (item._class) {
    case 'chapter':
      // dispatch({
      //   type: UPDATE_CHAPTER_NUMBER,
      //   courseid: course.id,
      //   chapterNumber: course.chapterNumber + 1,
      // })
      // dispatch({
      //   type: UPDATE_LECTURE_NUMBER,
      //   courseid: course.id,
      //   lectureNumber: 0,
      // })
      // dispatch(updateChapterNumber(course.id, course.chapterNumber))
      return handleChapter(dispatch, getState, course, item)
    case 'asset':
      return downloadItem(dispatch, getState, course, item)
    case 'lecture':
      dispatch(updateLectureNumber(course.id, course.lectureNumber))
      return downloadItem(dispatch, getState, course, item)
    case 'caption':
      // handle caption here
      return downloadItem(dispatch, getState, course, item)
  }
  // TODO: delete this shit
  return downloadHandler(dispatch, getState, course)
}
