import './ProgressStep.css'
import CheckIcon from '@material-ui/icons/Check';
import ProgressItem from '../ProgressItem/ProgressItem';

const ProgressStep = ({ stepname, completed, steps, count, handleChange }) => {
    const stepsitems =
        steps.map(step => {
            return <ProgressItem
                key={step._id}
                step={step.step}
                stepcheck={step.check}
                handleChange={handleChange}
                stepid={step._id}
            />
        })

    return (
        <div className="Progress__Step" >
            <div className="Progress__Step__Head">
                <span className='num'>{count}</span>
                <h3>{stepname}</h3>
                {completed && <CheckIcon />}

            </div>
            <div className="Progress__Step__List">
                {stepsitems}
            </div>
        </div >
    )
}

export default ProgressStep
