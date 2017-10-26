import { connect } from 'react-redux'
import SavingPhotoModal from '../components/SavingPhotoModal'
import { addImage } from '../redux/actions'

export default connect(
  null,
  { addImage },
)(SavingPhotoModal)
