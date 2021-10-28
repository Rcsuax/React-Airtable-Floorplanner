import React from 'react'

export const MouseMode = Object.freeze({
    MOUSE  : 0,
    DESK   : 1,
    DELETE : 2,
    ROTATE : 3,
})

export const Tools = Object.freeze({
    MOUSE  : { name: 'Mouse'  , value: MouseMode.MOUSE, icon: 'cursor' } ,
    DESK   : { name: 'Desk'   , value: MouseMode.DESK, icon: 'checkboxUnchecked' } ,
    DELETE : { name: 'Delete' , value: MouseMode.DELETE, icon: 'x' } ,
    ROTATE : { name: 'Rotate' , value: MouseMode.ROTATE, icon: 'redo' } ,
})

export const GlobalConfigKey = {
    LOCATION_ID : 'LOCATION_ID',
    ROOM_ID     : 'ROOM_ID',
    MOUSE_MODE  : 'MOUSE_MODE',
    EDIT_MODE   : 'EDIT_MODE'
}

export const deskColorMap = {
    'greenLight1' : '#129746',
    'yellowLight1': '#FFBF0F',
    'pinkLight1'  : '#E71173',
}

export const getMousePoint = (e) => {
    const element = e.target
    // translate's svg coord system to DOM coord system
    const inverseScreenCTM = element.getScreenCTM().inverse()
    return DOMPoint.fromPoint({ x: e.clientX, y: e.clientY }).matrixTransform(inverseScreenCTM)
}


export const zoomMod = 1.25
export const initialDimensions = { x : 0, y : 0, width : 10000, height : 10000 }

export const AppTableContext = React.createContext()
export const CanvasContext = React.createContext()
