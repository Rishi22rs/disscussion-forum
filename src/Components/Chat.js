import React,{useEffect, useState} from 'react'
import axios from 'axios'

const Chat =()=>{
    const [msgs,setMsgs]=useState()
    const [msgMine,setMsgMine]=useState()

    useEffect(()=>{
        axios.post('https://onthegoo.000webhostapp.com/Appointment/getChat.php')
        .then(res=>{
            setMsgs(res.data)
            console.log(res.data)
        })
    },[])


    const handleSubmit=(e)=>{
        if(msgs!==' '){
            e.preventDefault()
            let data=new FormData()
            data.append('msg',msgMine)
            axios.post('https://onthegoo.000webhostapp.com/Appointment/index.php',data)
            .then(res=>{
                console.log(res)
            })
        }
    }

    return(
        <div style={{background:"#6002EE",top:0,height:'100%',width:'100%'}}>
            <h1 style={{position:'fixed', textAlign:'center',background:'white',padding:30,marginTop:0,color:"#6002EE",width:'100%'}}>Disscussion forum</h1>
            <div style={{overflow:'auto',marginBottom:100}}>
                {msgs&&msgs.map((x,key)=>
                <>
                <h3 style={{color:'white'}}>{x.name}:</h3>
                <div key={key} style={{textAlign:'center',background:'white',margin:10,borderRadius:10}}>
                    <h3 style={{padding:5,color:'#6002EE'}}>{x.chat}</h3>
                </div>
                </>
                )}
            </div>
            <form onSubmit={e=>handleSubmit(e)} style={{borderColor:'1px solid white',background:'none',position:'absolute',top:"90%",width:'100%'}}>
                <input style={{position:'fixed',width:'90%',background:'#6002EE',color:'white',padding:10,borderRadius:20}} type="text" onChange={e=>setMsgMine(e.target.value)}></input>
                <button style={{position:"fixed",padding:10,color:'white',background:"#6002EE",right:0,borderRadius:20}} type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat