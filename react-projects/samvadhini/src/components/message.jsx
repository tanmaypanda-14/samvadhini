import React from 'react'
import axios from 'axios'

class Message extends React.Component{
    state={
        chat:[],
        msg:''
    }
    handleChange = (e)=>{
        console.log(e.target.value);
        this.setState({msg:e.target.value});
    }
    handleSend = ()=>{
        if(this.state.msg !== ''){
            var jstr = JSON.stringify({'msg':this.state.msg})
            axios.post('http://localhost:5000/query',
                        jstr,
                        {headers: { 'Content-Type':'application/json' }}   
            )
           .then(res=>{
                let ch = this.state.chat;
                ch.push({from:'our',msag:this.state.msg});
                ch.push({from:'cb',msag:res.data});
                this.setState({chat:ch,msg:''});
                // console.log(this.state);
                let doc = document.getElementById('test');
                console.log(this.state.chat[1].msag.answers[1].context)
                // <p>{this.state.chat[1].msag.answers[1].context}</p>
                doc.innerHTML=<p>{this.state.chat[1].msag.answers[1].context[0]}</p>;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    render(){
        return(
            <div class="container">
                <div id='test' style={{height:'80vh'}}>
                </div>
                <div style={{height:'20vh'}}>
                    <input
                        type='text' 
                        name='msg' 
                        onChange={(e)=>this.handleChange(e)} 
                        class="form-control"
                        width='500px'
                        value={this.state.msg} />
                        <button onClick={()=>this.handleSend()} class="btn btn-primary">check</button>
                </div>                
            </div>
        );
    }
}

export default Message;

