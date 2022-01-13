import React from 'react'
import BasicInfo from './basicinfo/BasicInfo'
import NumTable from './numtable/NumTable'



export default function Home() {
    return (
        <div>
            <div style={{ background: '#ECECEC', padding: '5px' }}>
                <BasicInfo></BasicInfo>
            </div>
                <NumTable></NumTable>
        </div>
    )
}
