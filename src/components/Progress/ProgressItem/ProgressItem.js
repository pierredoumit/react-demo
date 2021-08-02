import './ProgressItem.css'
import Checkbox from '../../UI/Checkbox'

const ProgressItem = ({ step, stepcheck, stepid, handleChange }) => {
    return (
        <div className="Progress__Step__Entry">
            <Checkbox label={step} stepcheck={stepcheck} stepid={stepid} handleChange={handleChange} />
        </div>
    )
}

export default ProgressItem
