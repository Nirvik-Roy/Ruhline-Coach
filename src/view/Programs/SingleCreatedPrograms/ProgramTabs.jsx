import React, { useState } from 'react'
import ProgramFaq from './ProgramFaq'
import Howitworks from './Howitworks'
import Benefits from './Benefits'

const ProgramTabs = () => {
    const [toggle, setToggle] = useState({
        toggle1: false,
        toggle2: false,
        toggle3: true,
    })
    const toggleFunc = (id) => {
        setToggle({
            toggle1: id === 1 ? true : false,
            toggle2: id === 2 ? true : false,
            toggle3: id === 3 ? true : false,
        })

    }
    return (
        <>
            <div className='service_tabs_wrapper'>
                <p className={toggle.toggle1 && 'service_active'} onClick={(() => {
                    toggleFunc(1)
                })}>Benefits</p>
                <p className={toggle.toggle2 && 'service_active'} onClick={(() => {
                    toggleFunc(2)
                })}>How it works</p>
                <p className={toggle.toggle3 && 'service_active'} onClick={(() => {
                    toggleFunc(3)
                })}>FAQs</p>
            </div>
            {toggle.toggle3 && <ProgramFaq />}
            {toggle.toggle2 && <Howitworks />}
            {toggle.toggle1 && <Benefits />}
        </>
    )
}

export default ProgramTabs
