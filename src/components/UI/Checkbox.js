
const Checkbox = ({ label, stepcheck, stepid, handleChange }) => {
    return (
        <>
            <input type="checkbox" id={stepid} checked={stepcheck} onChange={(stepid) => handleChange(stepid)} />
            <label htmlFor={stepid}>{label}</label>
        </>
    )
}

export default Checkbox
