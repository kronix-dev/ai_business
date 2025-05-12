import * as React from 'react'
import {Menu } from 'antd';
export default function SideMenu({items=[]}){        
      return(
        <Menu
        
        style={{minWidth: 300,}}
        defaultOpenKeys={[]}
        mode="vertical"
        theme="dark"
        items={items}
      />
      )
}