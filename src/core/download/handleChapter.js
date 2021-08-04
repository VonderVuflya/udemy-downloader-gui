import mkdirp from 'mkdirp'
import downloadHandler from './downloadHandler'
import {
  updateChapterName,
  updateCourseVisitedFiles,
} from '../../ducks/downloads'

export default function handleChapter(dispatch, getState, course, item) {
  const { parentPath, visitedFiles, chapterNumber } = course
  const chapterName = item.title
  const directory = `${parentPath}/${chapterNumber} ${chapterName}`
  // dispatch({
  //   type: NEW_CHAPTER_STARTED,
  //   chapter: chapterName,
  //   courseid: course.id,
  // })

  console.log('We are here', directory)
  dispatch(updateChapterName(course.id, `${chapterNumber} ${chapterName}`))

  return mkdirp(directory).then(() => {
    // dispatch({
    //   type: UPDATE_COURSE_VISITED_FILES,
    //   courseid: course.id,
    //   visitedFiles: visitedFiles + 1,
    // })
    dispatch(updateCourseVisitedFiles(course.id, visitedFiles))
    // TODO: delete this shit
    downloadHandler(dispatch, getState, course.id)
  })
}
