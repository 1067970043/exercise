import React,{useState} from 'react'
import {Layout, Dropdown,Menu,Avatar} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined 
  } from '@ant-design/icons';
  
const {Header} = Layout;

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () =>{
        setCollapsed(!collapsed)
    }

    const menu = (
        <Menu>
          <Menu.Item>
           11111
          </Menu.Item>
          <Menu.Item >
            22222
          </Menu.Item>
          <Menu.Item >
            3333
          </Menu.Item>
          <Menu.Item danger>
            退出登录
          </Menu.Item>
        </Menu>
      );

    return (
        <Header className="site-layout-background" style={{ padding: "0px 16px" }}>
            {
                collapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>
            }

            <div style={{float: "right"}}>
                <span>欢迎回来</span>
                <Dropdown overlay={menu} >
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}
