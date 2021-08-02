import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Progress.css'
import ProgressStep from '../../components/Progress/ProgressStep/ProgressStep'

const Progress = () => {
    const [data, setData] = useState([
        {
            _id: 1,
            stepname: "Foundation",
            completed: false,
            steps: [
                {
                    _id: 1,
                    step: "Setup virtual office",
                    check: false
                },
                {
                    _id: 2,
                    step: "Set mission & vision",
                    check: false
                },
                {
                    _id: 3,
                    step: "Select business name",
                    check: false
                },
                {
                    _id: 4,
                    step: "Buy domains",
                    check: false
                }
            ]
        },
        {
            _id: 2,
            stepname: "Discovery",
            completed: false,
            steps: [
                {
                    _id: 5,
                    step: "Create roadmap",
                    check: false
                },
                {
                    _id: 6,
                    step: "Competitor Analysis",
                    check: false
                }
            ]
        },
        {
            _id: 3,
            stepname: "Delivery",
            completed: false,
            steps: [
                {
                    _id: 7,
                    step: "Release marketing website",
                    check: false
                },
                {
                    _id: 8,
                    step: "Release MVP",
                    check: false
                }
            ]
        }
    ]);

    const [completed, setCompleted] = useState(false)
    const [randomfact, setRandomFact] = useState('')

    useEffect(() => {
        axios.get('https://uselessfacts.jsph.pl/random.json')
            .then(response => {
                const { text } = response.data
                setRandomFact(text)
            })
            .catch(error => {
                console.log(error)
            });

        if (localStorage.getItem('steps'))
            setData(JSON.parse(localStorage.getItem('steps')))

        if (localStorage.getItem('completed') === 'true')
            setCompleted(localStorage.getItem('completed'))

    }, []);


    const handleChange = (stepid) => {
        let arr = [...data];
        let filteredArray = arr.find((element) => element.steps.some((step) => step._id.toString() === stepid.target.id.toString()));

        const { steps } = filteredArray;
        const step = steps.find(step => step._id.toString() === stepid.target.id.toString())
        step.check = !step.check;

        const completedSteps = steps.every(v => v.check === true)
        filteredArray.completed = completedSteps;
        setData(arr);

        const allPhasesCompleted = arr.every(v => v.completed === true);

        if (completed !== allPhasesCompleted) {
            setCompleted(allPhasesCompleted);
            window.localStorage.setItem("completed", allPhasesCompleted);
        }

        window.localStorage.setItem("steps", JSON.stringify(arr));
    }


    const steps = data.map((step, index) => {
        return <ProgressStep
            key={step._id}
            stepname={step.stepname}
            steps={step.steps}
            completed={step.completed}
            count={index + 1}
            handleChange={handleChange}
        />
    })

    return (
        <div className="Progress">
            <span>My startup progress</span>
            <div className='Progress__Steps'>
                {steps}
            </div>
            <div className="Progress__Fact">
                {completed && randomfact}
            </div>
        </div>
    )
}

export default Progress
