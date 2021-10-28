import React from 'react'
import { AppTableContext, GlobalConfigKey , MouseMode, deskColorMap, getMousePoint } from './Constants'
import { globalConfig } from '@airtable/blocks'
import { expandRecord, useRecordById } from '@airtable/blocks/ui';


const Desk = ({ id }) => {
    const tableContext = React.useContext(AppTableContext)
    
    const isEditModeOn = globalConfig.get(GlobalConfigKey.EDIT_MODE)
    const mode = globalConfig.get(GlobalConfigKey.MOUSE_MODE)

    const desk = useRecordById(tableContext.DESK, id)
    const contact = (desk.getCellValue('Contact'))?.pop()
    const status = desk.getCellValue('Status')
    const width = desk.getCellValue('width')
    const height = desk.getCellValue('height')
    
    const x = desk.getCellValue('x')
    const y = desk.getCellValue('y') 
    const originX = x + (width/2)
    const originY = y + (height/2)
    const originAngle = desk.getCellValue('angle')

    const [ state , setState ] = React.useState({ 
        x: x,
        y: y,
        angle: originAngle,
        selected: false,
    })

    let transform = `rotate(${originAngle} ${originX} ${originY})`

    React.useEffect(() => {
        // only updates when state.selected flips to false
        if (!state.selected) tableContext.DESK.updateRecordAsync(desk.id, { x: state.x, y: state.y, angle: state.angle } )
    }, [state.selected])

    function onMouseDown(e) {
        e.preventDefault()
        e.stopPropagation()
    
        if (!isEditModeOn) {
            expandRecord(desk)
        }
        else if (mode === MouseMode.MOUSE ) {
            setState({ ...state, selected: true })
        }
    }

    function onMouseMove(e) {
        e.preventDefault()
        e.stopPropagation()
        const mousePoint = getMousePoint(e)
        
        if (state.selected) {
            let mouseOffX = mousePoint.x - (width / 2)
            let mouseOffY = mousePoint.y - (height / 2)
            setState( { ...state, x: mouseOffX, y: mouseOffY } )
        }
    }

    function onMouseOff(e) {
        if ((mode === MouseMode.MOUSE ) && state.selected) {
            setState({ ...state, selected: false }) // this triggers useEffect()
        }
    }

    function updateRotation(e) {
        // e.stopPropagation()
        console.log(`rotate clicked state-angle: ${state.angle}`)
        setState({...state, angle: state.angle + 90 })
    }

    return (<>
            <g
                // transform-origin={`${state.x} ${state.y}`} // https://github.com/facebook/react/issues/11265
                transform={ transform }
                onMouseDown={ onMouseDown }
                onMouseMove={ onMouseMove }
                onMouseUp={ onMouseOff }
                onMouseLeave={ onMouseOff } >

                <rect id={id}
                    x={state.x}
                    y={state.y}
                    rx='1%'
                    fill= { deskColorMap[status?.color] ?? '#FFF' }
                    stroke={ state.selected ? 'white' : 'black' }
                    strokeWidth={20}
                    width={width} 
                    height={height} />
                
                <text userSelect='none' fontSize='115'
                    x={ state.x + 50 } 
                    y={ state.y - 50 }>
                        { desk.name } 
                </text>

                { contact && <DeskContact id={contact.id} state={state}/> }
            </g>
            { isEditModeOn &&  <rect onClick={updateRotation} x={state.x + width + 100} y={state.y} width={100} height={100} fill='red' />}
        </>
        )
}

const DeskContact = ({ id, state }) => {
    
    const containerStyle = {
        font: 'OpenSans',
        fontSize: 100,
        userSelect: 'none',
        display:'flex',
        flexDirection:'row',
        flexWrap:'none',
    }

    const tableContext = React.useContext(AppTableContext)
    const contact = useRecordById(tableContext.CONTACT, id)


    const details = {
        FULLNAME: contact.getCellValue('Name'),
        EMAIL: contact.getCellValue('Email'),
        PHONE: contact.getCellValue('Phone'),
        COMPANY: contact.getCellValue('Company'),
    }

    let x = state.x + 10
    let y = state.y + (500/2) // 500=height 
    
    return (<g style={containerStyle} >          
                <text x={x + 20} y={y - 100}> {details.FULLNAME} </text>
                <text x={x + 20} y={y + 100}> {details.COMPANY} </text>
            </g>)
}

export default Desk