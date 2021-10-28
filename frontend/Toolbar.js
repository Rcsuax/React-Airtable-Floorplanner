import React from 'react'
import { useGlobalConfig, Box, Button, Tooltip } from '@airtable/blocks/ui'

const ToolbarContainerStyle = {  
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '20%',
    left: '2%' 
}


// PropType: item { name: string, value: number, icon: string }
export const ToolbarItem = ({ item }) => {
    const globalConfig = useGlobalConfig()

    function handleClick() {
        globalConfig.setAsync('MOUSE_MODE', item.value)
    }

    return (<Tooltip content={ item.name }
                placementX={Tooltip.placements.RIGHT}
                placementY={Tooltip.placements.CENTER}
                shouldHideTooltipOnClick={true}>

                <Button key={ item.name } icon={ item.icon } onClick={ handleClick } />
            </Tooltip>)
}


const Toolbar = (props) => {
    const globalConfig = useGlobalConfig()
    const isEditMode = globalConfig.get('EDIT_MODE')

    if (!isEditMode ) return null
        
    return (<Box style={ToolbarContainerStyle}> {props.children} </Box>)
}

export default Toolbar