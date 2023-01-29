import React from 'react'
import ReactDOM, { createPortal } from 'react-dom'

const modalRoot = document.getElementById('modal-root')

const Modal = ({ children }) => {


    return (
        ReactDOM.createPortal(
            children,
            modalRoot)
    )
}

export default Modal