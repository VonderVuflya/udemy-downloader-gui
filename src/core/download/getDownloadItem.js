/* eslint-disable camelcase */
export default function getDownloadItem(course) {
  const { curriculum, visitedFiles: target } = course

  const getCourse = () => {
    let findCourse = curriculum[target]
    if (findCourse?.asset?.caption) {
      findCourse = {
        ...findCourse,
        asset: {
          caption: {
            ...findCourse.asset.caption,
            lectureId: findCourse.id,
          },
        },
      }
    }

    if (findCourse?.supplementary_assets) {
      findCourse = {
        ...findCourse,
        supplementary_assets: findCourse.supplementary_assets.map(el => ({
          ...el,
          lectureId: findCourse.id,
        })),
      }
    }
    return findCourse
  }

  return getCourse()
}
