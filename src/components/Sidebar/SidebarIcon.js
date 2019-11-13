import React from 'react'
import { IoIosArrowDropright, IoIosBackspace } from 'react-icons/io'
import '../../css/sidebar.css'

const SidebarIcon = ({ handleClick, isOpen }) => {
    return <span onClick={handleClick}>
        {isOpen ? <IoIosBackspace id="close" /> : <IoIosArrowDropright id="bars" />}
    </span>
}
export default SidebarIcon