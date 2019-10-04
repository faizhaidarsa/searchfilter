import React, { Component } from 'react'
import Axios from 'axios'

export class filterBE extends Component {
    
    state={
        allData:[],
        pClass:[],
        loading:false,
        inputName:'',
        inputAgeMin:null,
        inputAgeMax:null,
        inputGender:'',
        inputClass:'',
        inputSurvived:''
    }

    componentDidMount() {
        this.getClass()
        this.getAllData()
    }
    

    getAllData = () =>{
        this.setState({loading:true})
        Axios.get(
            'http://localhost:9000/getall'
        ).then(res=>{            
            this.setState({allData:res.data,loading:false})
        }).catch(err=>{
            console.log(err);
            this.setState({loading:false})
        })
    }
    
    getClass = ()=>{
        this.setState({loading:true})
        Axios.get(
            'http://localhost:9000/getclass'
        ).then((res)=>{           
            this.setState({pClass:res.data,loading:false})
            
            
        }).catch(err=>{
            console.log(err);
            this.setState({loading:false})
        })
    }

    renderOption=()=>{
        let hasil = this.state.pClass.map((item,key)=>{
            return(
                <option key={key} value={item.Pclass}>{(item.Pclass===3)?'Economy':(item.Pclass===2)?'Executive':'First Class'}</option>
            )
        })
        return hasil
    }

    renderTable=()=>{
        
        
        let hasil = this.state.allData.map((item,key)=>{
            return(
                <tr key={key}>
                    <td>{item.PassengerId}</td>
                    <td>{item.Name}</td>
                    <td>{(item.Sex==='male')?'M':'F'}</td>
                    <td>{item.Age}</td>
                    <td>{(item.Pclass===3)?'Economy':(item.Pclass===2)?'Executive':'First Class'}</td>
                    <td>{(item.Survived)?'Alive':'Dead'}</td>
                    
                    
                </tr>
            )
        })
        return hasil
    
    }

    renderLoading=()=>{
        if(this.state.loading)
        return(
            <div className='row'>
                <div className='col-12 text-center'>
                <div className='spinner-grow'></div>
                </div>
                <div className='col-12 text-center'>
                Please wait
                </div>
            </div>
        )
    }

    onFilter = ()=>{
     
        Axios.get(
            'http://localhost:9000/getfilter',
            {
                params:{
                    inputName:this.state.inputName,
                    inputAgeMax:this.state.inputAgeMax,
                    inputAgeMin:this.state.inputAgeMin,
                    inputClass:this.state.inputClass,
                    inputGender:this.state.inputGender,
                    inputSurvived:this.state.inputSurvived
                }
            }
        ).then((res)=>{
            this.setState({allData:res.data})
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    render() {
        return (
            <div className='container-fluid py-3 bg-secondary'>
                <div className='card border-0'>
                    <div className='card-header bg-dark text-center text-white'><h3>Titanic Passenger Data</h3></div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-4'>
                                <input onChange={e=>this.setState({inputName:e.target.value})} className='form-control' type="text" placeholder='Name . . .'/>
                            </div>
                            <div className='col-2'>
                                <input onChange={e=>this.setState({inputAgeMin:e.target.value})} className='form-control' type="number" min='0' placeholder='Min age'/>
                            </div>
                            <div className='col-2'>
                                <input onChange={e=>this.setState({inputAgeMax:e.target.value})} className='form-control' type="number" min='0' placeholder='Max age'/>
                            </div>
                            <div className='col-4'>
                                <select className='form-control' onChange={e=>this.setState({inputGender:e.target.value})} defaultValue="">
                                    <option disabled value="">Gender . . .</option>
                                    <option value="">All gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='row my-3'>
                        <div className='col-4'>
                                <select className='form-control' onChange={e=>this.setState({inputClass:e.target.value})} defaultValue="">
                                    <option disabled value="">Class . . .</option>
                                    <option value="">All class</option>
                                    {this.renderOption()}
                                </select>
                            </div>
                            <div className='col-4'>
                                <select className='form-control' onChange={e=>this.setState({inputSurvived:e.target.value})} defaultValue="">
                                    <option disabled value="">Survived . . .</option>
                                    <option value="">All (dead/alive)</option>
                                    <option value="0">Dead</option>
                                    <option value="1">Alive</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <button onClick={this.onFilter} className='btn btn-primary btn-block'>Filter</button>
                            </div>
                        </div>
                    <div className='table-responsive'>
                    <table className='table table-striped table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Pclass</th>
                            <th>Survived</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
                
                </div>
                {this.renderLoading()}
                    </div>
                </div>
            </div>
        )
    }
}

export default filterBE
