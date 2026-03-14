import { Drawer } from 'antd'
import React from 'react'

const OptionDetails = (props) => {
  	return (
    	<Drawer title="Basic Drawer" placement="right" onClose={props.onClose} open={props.isOpen} width={"100%"}>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
     	</Drawer>
  	)
}

export default OptionDetails