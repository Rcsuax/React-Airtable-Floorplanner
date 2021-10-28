import React from 'react'
import { AppTableContext, CanvasContext , initialDimensions, zoomMod } from './Constants'

import { globalConfig } from '@airtable/blocks'
import { useGlobalConfig, useRecords, Box, Select, FormField, Switch, Button } from '@airtable/blocks/ui'


const Settings = () => {
    const tables = React.useContext(AppTableContext)
    const [dimensions, setDimensions] = React.useContext(CanvasContext)
    const records = useRecords(tables.LOCATION)

    function zoomIn() {
        setDimensions({ ...dimensions,
            x : dimensions.x - (-1*(Math.round(dimensions.x / zoomMod) / 2)),
            y :  dimensions.y - (-1*(Math.round(dimensions.y / zoomMod) / 2)),
            width : Math.round(dimensions.width / zoomMod),
            height : Math.round(dimensions.height / zoomMod),
        })
    }

    function zoomOut() {
        setDimensions({
            x :  dimensions.x - (-1*(Math.round(dimensions.x * zoomMod) / 2)),
            y :  dimensions.y - (-1*(Math.round(dimensions.y * zoomMod) / 2)),
            width : Math.round(dimensions.width * zoomMod),
            height : Math.round(dimensions.height * zoomMod),
        })
    }

    return (
            <Box display="flex" padding={3}>
                
                <FormField label="Locations" width='40%' paddingRight={2}> 
                    <LocationSelect records={records}/>
                </FormField>

                <FormField label="Rooms" width='40%'>
                    <RoomSelect records={ records } />
                </FormField>

                <FormField label='Edit' width='10%'>
                    <EditSwitch />
                </FormField>

                <Box alignItems='center' display='flex' flexDirection='row'>   
                    <Button icon='plus' onClick={zoomIn}/>
                    <Button icon='collapse' onClick={ () => setDimensions(initialDimensions) }/>
                    <Button icon='minus' onClick={zoomOut}/>
                </Box>

            </Box>
    );
}

function EditSwitch() {
    const [value, setValue] = React.useState(false)

    function onChange(value) {
        setValue(value)
        globalConfig.setAsync('EDIT_MODE', value) 
    }
    
    return (<Switch
                value={value}
                onChange={ onChange }
                size="small"
                paddingLeft={3}
                backgroundColor='transparent'
            />)
}


function LocationSelect({ records }) {
    const [value , setValue ] = React.useState()
    const options = []
    
    records?.map( item => options.push( SelectOption(item)) )

    function onChange( newValue ) {
        setValue(newValue)
        globalConfig.setAsync('LOCATION_ID', newValue)
        globalConfig.setAsync('ROOM_ID', null)
    }

    return (<Select 
                options={ options }
                value={ value }
                onChange={ onChange }
            />)
}


function RoomSelect({ records }) {
    const [value , setValue ] = React.useState()
    const config = useGlobalConfig()
    const options = []


    const location = records.find( i => i.id  == config.get('LOCATION_ID'))
    const rooms = location?.getCellValue('Rooms')
    rooms?.map( item => options.push( SelectOption(item)) )


    function onChange( newValue ) {
        setValue(newValue)
        globalConfig.setAsync('ROOM_ID', newValue)
    }
    
    return (
        <Select
            options={ options }
            value={ value }
            onChange={ onChange }
            disabled={ false }
    />)
}

function SelectOption(prop) {
    return ({ label: prop.name , value : prop.id } )
}

export default Settings

