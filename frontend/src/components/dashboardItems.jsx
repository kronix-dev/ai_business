import { AimOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Typography } from 'antd'
import * as React from 'react'

export function DashboardCard({avatar,title,value}){
    return(

        <Card style={{marginLeft:3, marginBottom:4}} type='inner' >
            <Row>
                <Col xs={4}>
                <Avatar style={{backgroundColor:"#000"}} size={'large'}>
                    {avatar}
                </Avatar>
                </Col>
                <Col xs={18}>
                <div>
                <Typography.Text level={1}>{title}</Typography.Text>
                </div>
                <Typography.Text level={1}><strong>{value}</strong></Typography.Text>
                </Col>
            </Row>
        </Card>
    )
}