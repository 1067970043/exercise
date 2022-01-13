import React from 'react'
import { Card, Col, Row } from 'antd';
import './index.css'

export default function BasicInfo() {

    const infoList = [{
        title:"销售金额",
        value:10000,
        unit:"元"
    },{
        title:"成交单数",
        value:32,
        unit:"笔"
    },{
        title:"日活",
        value:50000,
        unit:"人"
    }]
    const num = 24/infoList.length
    const renderinfo = (infoList) =>{
        return infoList.map(item=>{
            return <Col span={num}>
                <Card title={item.title} bordered={true}>{item.value}{item.unit}</Card>
            </Col>
        })
    }

    return (
        <Row>
            {renderinfo(infoList)}
        </Row>
    )
}
