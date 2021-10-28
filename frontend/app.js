import React from 'react'
import { globalConfig } from '@airtable/blocks'
import { useBase, useGlobalConfig, Box } from '@airtable/blocks/ui'

import Room from "./Room"
import Canvas from "./Canvas"
import Settings from './Settings'
import Toolbar, { ToolbarItem } from './Toolbar'
import { AppTableContext, CanvasContext, Tools, initialDimensions } from './Constants'



function App() {
    const base = useBase()
    const config = useGlobalConfig()
    const currentRoomID = config.get('ROOM_ID')
    const dimensions = React.useState(initialDimensions)
    
    const tables = {
        LOCATION: base.getTableByName('Locations'),
        ROOM:  base.getTableByName('Rooms'),
        DESK: base.getTableByName('Desks'),
        CONTACT: base.getTableByName('Contacts')
    }
    
    React.useEffect( () => {
        // reset global state
        globalConfig.setAsync('ROOM_ID', '') 
        globalConfig.setAsync('LOCATION_ID', '')
        globalConfig.setAsync('MOUSE_MODE', 0)
        globalConfig.setAsync('EDIT_MODE', false) 
    }, [])

    let boxstyle = { 
        height:"100%", 
        display:"flex",
        flexDirection: "column",
        border:"thick",
        backgroundColor:"lightGrey1",
    }

    // let helptext = <text x={0} y={0} fontSize='100'> PLEASE SELECT A LOCATION/ROOM </text>

    return (    
        <div className="App" >
            <Box style={boxstyle}>   

                <AppTableContext.Provider value={tables}>

                    <Toolbar> 
                        <ToolbarItem item={Tools.MOUSE}/>
                        <ToolbarItem item={Tools.DESK}/>
                        {/* <ToolbarItem item={Tools.ROTATE}/> */}
                        {/* <ToolbarItem item={Tools.DELETE}/> */}
                    </Toolbar>
                    
                    <CanvasContext.Provider value={dimensions}>
                        <Settings/>

                        <Canvas>
                            { currentRoomID && <Room id={currentRoomID}/> }
                        </Canvas>
                    </CanvasContext.Provider>

                </AppTableContext.Provider>

            </Box>
        </div>)
}

export default App