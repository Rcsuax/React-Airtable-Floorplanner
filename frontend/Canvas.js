import React from 'react'
import { GlobalConfigKey, AppTableContext, CanvasContext, getMousePoint } from './Constants'
import { useGlobalConfig } from '@airtable/blocks/ui'


const Canvas = ({ children }) => {
    const config = useGlobalConfig()
    const table = React.useContext(AppTableContext)
    const mouseMode = config.get(GlobalConfigKey.MOUSE_MODE)
    const currentRoomID = config.get(GlobalConfigKey.ROOM_ID)

    const [ dimensions, setDimensions ] = React.useContext(CanvasContext)
    const [ isDragging, setDragging ] = React.useState(false)
    const [ offset, setOffset ] = React.useState()
    
    let viewBox = `${dimensions.x} ${dimensions.y} ${dimensions.width} ${dimensions.height}`

    function onMouseDown(e) {
        e.preventDefault()
        const point = getMousePoint(e)

        switch(mouseMode) {
            case 0:
                if(!isDragging) { setDragging(true) ; setOffset(point) }
                break
            case 1:
                table.DESK.createRecordAsync({ x: point.x, y: point.y, width: 1000, height: 500, Status: { name: "available"}, Room: [{ id: currentRoomID }] })
                break
            default:
                break
        }
    }

    function onMouseUp(e) { 
        setDragging(false)
    }

    function onMouseMove(e) {
        e.preventDefault()

        const point = getMousePoint(e)

        if ( isDragging ) { 
            setDimensions({ ...dimensions, x: dimensions.x - (point.x - offset.x ), y: dimensions.y - (point.y - offset.y)})
        }
    }

    return (<svg viewBox={ viewBox }
                    onMouseDown= { onMouseDown }
                    onMouseMove= { onMouseMove }
                    onMouseUp= { onMouseUp }
                    width='100%'
                    height= '100%'
                    style={ { backgroundColor : 'darkgrey' } } 
                    shapeRendering="geometricPrecision" > 
                        { children }
            </svg>)
}

export default Canvas