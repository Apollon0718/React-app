import React from 'react'
import axios from 'axios';
// import ElapsedTime from './elapsed-time/index'
// import Buttons from './buttons/index'

// import './styles.css'

class Timer extends React.Component {
    constructor(props){
        super(props) 
            
        this.state = {
            timerStarted: false,
            timerStopped: true,
            minutes: 0,
            seconds: 0,
            captures: []
        }
    }

    

    render() {
        //const {count} = this.state
        
        return (
            <div classname='container'>
                <h1>{this.state.minutes + ":" + this.state.seconds}</h1>
            </div>
        )
    }

    componentDidMount () {
        // axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC&user_id=' + this.props.user_id)
        // .then(res => {
        // const response = res.data;
        // console.log(response,'data')
        // get currect quiz data and save it to app state
        const timeelapsed = this.props.elapsedTime;
        const minutes = Math.floor(timeelapsed/60);
        const seconds = timeelapsed % 60;
        this.setState({minutes:minutes});
        this.setState({seconds:seconds});
        console.log(this.state.minutes,'mm')
        this.myIntreval = setInterval(()=>{
            if (this.state.seconds>=59){
                this.setState((prevState)=>({minutes: prevState.minutes+1,seconds: -1}));
            }
            this.setState(prevState => ({
                seconds: prevState.seconds + 1
            }))
        }, 1000)
    }

    componentWillUnmount() {
       
       const minutes = this.state.minutes;
       const seconds = this.state.seconds;
       const elapsed_time = minutes*60+seconds;
    //    console.log(this.props.user_id, el);
       axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=UPDATE_ELAPSEDTIME&user_id=' + this.props.user_id+'&elapsed_time='+elapsed_time)
        .then(function (response) {
            console.log(response.data,'when modal close, timer unmount')
        });
    }

} 

export default Timer