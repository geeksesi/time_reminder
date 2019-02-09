import React, { Component }                           from 'react';
import './App.css';
import { Row, Col, Input, InputNumber, Button, Icon } from 'antd';
import 'antd/dist/antd.css';

const InputGroup = Input.Group;


class App extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
			{
				time         : 0,
				hour         : '',
				minute       : '',
				second       : '',
				audio        : new Audio("assets/Careless.ogg"),
				audio_status : "Play",
				audio_icon   : "play-circle",
			};
	}

	alarm()
	{
		let my_time = this.state.time - 1;
		this.setState({ time : my_time });
		if ( this.state.time !== 0 )
		{
			setTimeout(this.alarm.bind(this), 1000);
		}
		else
		{
			this.control_audio();
		}

	}

	control_audio()
	{
		if ( this.state.audio_status === "Play" )
		{
			this.state.audio.play();
			this.setState({
				audio_icon   : "pause-circle",
				audio_status : "Pause",
			});
		}
		else
		{
			this.state.audio.pause();
			this.setState({
				audio_icon   : "play-circle",
				audio_status : "Play",
			});
		}
	}

	submit_alarm()
	{
		let interval = (this.state.hour * 60 * 60) + (this.state.minute * 60) + this.state.second;
		this.setState({
			time : interval,
		});
		setTimeout(this.alarm.bind(this), 1000);
	}

	set_change(value, type)
	{
		switch ( type )
		{
			case 'H':
				this.setState({
					hour : value,
				});
				break;
			case 'M':
				this.setState({
					minute : value,
				});
				break;
			case 'S':
				this.setState({
					second : value,
				});
				break;
			default:

		}
	}

	render()
	{

		return (
			<div className="App">
				<br/>
				<Row type="flex" justify="center">
					<h1><Icon type="clock-circle"/> { this.state.time }</h1>
				</Row>
				<br/>
				<Row type="flex" justify="center">
					<Col xs={ 24 } md={ 8 }>
						<InputGroup compact>
							<InputNumber style={ { width : '33%' } } placeholder="hour"
										 onChange={ value => this.set_change(value, 'H') }/>
							<InputNumber style={ { width : '33%' } } placeholder="minute"
										 onChange={ value => this.set_change(value, 'M') }/>
							<InputNumber style={ { width : '33%' } } placeholder="second"
										 onChange={ value => this.set_change(value, 'S') }/>
						</InputGroup>
					</Col>
				</Row>
				<br/>
				<Row type="flex" justify="center">
					<Button type="primary" icon="notification" onClick={ (event) => this.submit_alarm(event) }>
						Remind it!
					</Button>
				</Row>
				<br/>
				<Row>
					<Button type="primary" icon={ this.state.audio_icon } onClick={ () => this.control_audio() }>
						{ this.state.audio_status }
					</Button>
				</Row>
			</div>
		);
	}
}


export default App;
