import { connect } from 'react-redux'
import TaskScreen from '../components/TaskScreen'
import {
  deleteImage,
  updateTask,
} from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  const { lists, tasks, images } = state.entities
  const task = tasks.byId[ownProps.navigation.state.params.taskId]
  const list = lists.byId[task.listId]
  const taskImages = Object.values(images.byId).filter(image => image.taskId === task.id)
  console.log('in mapStateToProps')
  console.log('taskImages')
  console.log(taskImages)
  return {
    list,
    task,
    images: taskImages,
  }
}

export default connect(
  mapStateToProps,
  {
    deleteImage,
    updateTask,
  },
)(TaskScreen)
