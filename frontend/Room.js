import React from 'react'
import Desk from './Desk'
import { AppTableContext } from './Constants'
import { globalConfig } from '@airtable/blocks'
import { useRecords , useLoadable, useWatchable, useRecordById } from '@airtable/blocks/ui'


function Room({ id }) {
    const tables = React.useContext(AppTableContext)
    const roomRecord = useRecordById(tables.ROOM, (id ?? '') )

    const linkedDesksQuery = roomRecord?.selectLinkedRecordsFromCell('Desks')
    useLoadable(linkedDesksQuery) // useRecords(linkedDesksQuery)
    useWatchable(linkedDesksQuery, [ "recordIds" ] )

    const desks = linkedDesksQuery?.recordIds.reduce( (acc, id) => { 
        acc.push(<Desk id={id} /> )
        return acc
    }, [])

    return (<g> 
                <Floor />
                { desks } 
            </g> )
}

function Floor() {
    // basic floor outline impl will go here
    return (<rect x={0} y={0} 
                width={10000} 
                height={5000}
                fill='white' 
                stroke='black' 
                strokeWidth={200} 
                opacity={0.5} />)
}

export default Room    
