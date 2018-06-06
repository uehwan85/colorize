/* eslint-disable */

import React, { Component } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { url } from '../config';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import avatar from '../assets/profile.png';

const Container = styled.div`
  padding-top: 100px;
  position: relative;
  display: block;
  font-size: 12px;
  line-height: 1.6;
  color: #666;
  width: 80%;
  margin: 0px auto;
  @media (max-width: 768px) {
    width: 90%;
  }
  `
const Header = styled.h1`
  font-weight: bold;
  color: black;
  letter-spacing: -1px;
  text-align: center;
`
// font-family:;
const Table = styled.table`
  width: 100%;
  border-top: 2px solid black;
  border-collapse: collapse;
  vertical-align: center;
`
const Row = styled.tr`
  display: table-row;
  vertical-align: center;
  border-color: inherit;
  @media (max-width: 768px) {
    width: 100%;
    height: 8vh !important;
  }
`
const Column = styled.th`
  width: 20vw;
  text-align: center;
  border-bottom: 1px solid #ddd;
  display: table-cell;
  vertical-align: center;
  color: #666;
  @media (max-width: 768px) {
    width: 30% !important;
    padding: 0;
  }
`
const Data = styled.td`
  width: 60vw;
  border-left: 1px solid #ddd;
  padding: 14px 30px;
  border-bottom: 1px solid #ddd;
  display: table-cell;
  vertical-algin: inherit;
  line-height: 1.6;
  color: #666;
  @media (max-width: 768px) {
    width: 70% !important;
    padding: 5px 5px 5px 10px;
    line-height: 1.6;
  }
`
const Intable = styled.table`
  border-collapse: collapse;
  line-height: 2;
  width: 100%;
`
const InTH = styled.th`
  font-weight: normal;
  text-align: left;
  padding-left: 8px;
  width: 100%;
  @media (max-width: 768px) {

  }
`

const Button = styled.button `
    cursor: pointer;
    min-width: 70px;
    min-height: 25px;
    border: none;
    color: white;
    background-color: black;
    text-align: center;
    transition: 0.3s;
    border: 0;
    outline: 0;
    margin-right: 5%
    &:hover {
      text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
    }
    @media (max-width: 768px) {
      padding: 5px;
      margin: 5px;
    }
`
const Input = styled.input`
    padding-left: 5px;
`
const ProfPic = styled.img`
  vertical-align:middle;
  width:10vw;
  height:10vw;
  border-radius:50%;
  margin-right: 8px;
  object-fit: cover
  @media (max-width: 768px) {
    width:30vw;
    height:30vw;
  }
`
const ChangePic = styled.img`
  vertical-align: middle;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  // @media (max-width: 700px) {
  //   width: 25vw;
  //   height: 25vw;
  // }
  // @media (max-width: 500px) {
  //   width: 35vw;
  //   height: 35vw;
  // }
`
const CancelButton = styled.button `
    cursor: pointer;
    width: 10%;
    height: 5vh;
    border: none;
    color: black;
    background-color: #F4F5F9;
    text-align: center;
    opacity: 0.6;
    transition: 0.3s;
    border: n1px solid #d9dee8;
    &:hover {
        opacity: 1;
    }
`
//닉네임 중복확인 api 비밀번호 확인 api  validation 확인 

class MyInfo extends Component {
    constructor(){
        super()
        this.state = {
          hasPhoto: true,
          data: '',
          tone : false,
          nickName : false,
          colorSelected : '',
          validate : true,
          files:'',
          imagepreviewUrl: '',
          photos:'',
          confirmPassword : '',
          confirmNickname :'',
          minNum : '',
          filetype:'',
          imageAddress : ''
          
        }

        this._toneChange = this._toneChange.bind(this);
        this._photoChange = this._photoChange.bind(this);
        this._nickNameChange = this._nickNameChange.bind(this);
        this._comparePassword = this._comparePassword.bind(this);
        this._passwordInput = this._passwordInput.bind(this);
        this._submit = this._submit.bind(this);
        this._onColorSelect = this._onColorSelect.bind(this);
        this._onDrop = this._onDrop.bind(this);
        this._passwordConfirm = this._passwordConfirm.bind(this);
        this._passwordCompare = this._passwordCompare.bind(this);
        this._confirmNickname = this._confirmNickname.bind(this);
        this._minNumber = this._minNumber.bind(this);
        this._nicknameOnchange = this._nicknameOnchange.bind(this);
    }

    componentDidMount(){
      const token = localStorage.getItem('token');
      axios.get(`${url}/api/user/get/info`, {headers: { 'token': token }})
        .then(response =>{
            if(response.data.success===true){
              this.setState({data : response.data.rows[0]})
            }else {
              this.props.handleLogout()
              this.props.history.push('/login', {from: this.props.location})
            }
          }) 

    }
    // _submitImg(){
    //      axios.post(`${url}/test`, {'base64' :this.state.imagepreviewUrl, 'mail' : this.state.data.mail})
    //        .then((result) => {
    //          console.log(result)
    //        })
    //        .catch(err => console.log(err))

    // }
    _toneChange(){
   
      this.setState({tone : !this.state.tone})
    }

    _confirmNickname(){
      const token = localStorage.getItem('token')
      console.log(this.password.value)
      const form = {
        userName: this.nickname.value
      }
        axios.post(`${url}/api/user/update/username`, form, {
          headers: {
            'token': token
          }
        })
            .then(response => {
              console.log(response.data.success)
             
            
              this.nickname.value.length < 5 ? (this.setState({confirmNickname : false}),alert('닉네임은 5자 이상이어야 합니다')) : response.data.success === false ? (this.setState({confirmNickname : false}), alert('중복된 닉네임입니다.')) : (this.setState({confirmNickname : true}), alert('사용가능한 닉네임입니다.'))  
            }
            )
            .catch(err => console.log(err));
    }

    _nicknameOnchange(){
     console.log(this.nickname.value)
     this.nickname.value.length <5 ? this.setState({confirmNickname : false}) : null;
    }

    _photoChange(){
      this.setState({hasPhoto : !this.state.hasPhoto})
    }

    _nickNameChange(){
           
      this.setState({nickName : !this.state.nickName})
    }



    _comparePassword(){
      console.log(this.newPassword.value)
      console.log(this.confirmPassword.value)
      // !this.password.value ? this.setState({validate : false}) :
      this.newPassword.value !== this.confirmPassword.value ? 
       this.setState({validate : false})
        // alert('입력한 비밀번호가 일치하지 않습니다') 
      
       : 
       this.setState({validate : true})
      // alert('ok');
    }

    _passwordInput(){
      !this.newPassword.value ? alert('새로운 패스워드를 먼저 입력해주세요') : null;
    }

    _onColorSelect(option) {
      console.log(option.value)
      this.setState({ colorSelected: option.value })
    }

    _onDrop(files){
      const token = localStorage.getItem('token')
      const file = files[0];
      this.setState({file:file})
      console.log('file@@@@@@@@@@@@@@ :', file)
      const formData = new FormData();
      formData.append('file', file);
      var mimeType = file.type.split('/')[0];
        mimeType === 'image' ?
        axios.post(`${url}/api/user/post/upload`, formData, { headers: { 'token': token} } )

            .then(response => {
                console.log(response)
                this.setState({imageAddress : response.data.message})
              

            }

            )
            .catch(err => console.log(err))
            : (alert('Image 파일만 올릴수있어요'))

          
      // console.log(mimeType)
      // console.log(files)
      // console.log(file)
      // console.log('file.preview@@@@@@@@@@@@@@@@ :', file.preview)
      // console.log(typeof file)
      //  let reader = new FileReader();

      // typeof file === 'string'||'object' ? reader.readAsDataURL(file) :alert('적당한형식이 아닙니당')
          // reader.readAsDataURL(file)
          //    reader.onload = () => {
          //      this.setState({
          //        file:file,
          //        imagepreviewUrl: reader.result
          //      })
          //    }
            //  console.log(this.state.imagepreviewUrl)
      

      // var options = {
      //     headers : {
      //       'content-type': "application/json"
      //     //  'multipart/form-data'
      //     }
      //   }
   
      }

            // axios.get(`${url}`, {
            //     filename: file.name,
            //     filetype: file.type
            // })
            // .then((result) => {
            //   var signedUrl = result.data.signedUrl;

    // this.setState({
    //   files
    // });
  // files.forEach(file => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const fileAsBinaryString = reader.result;
  //     // do whatever you want with the file content
  //   };
  //   reader.onabort = () => console.log('file reading was aborted');
  //   reader.onerror = () => console.log('file reading has failed');

  //   reader.readAsBinaryString(file);
  // });
// }



      // var file = files[0];
      // console.log(file)
      // var options = {
      //    headers : {
      //      'content-type': file.type
      //     //  'multipart/form-data'
      //    }
      //   }
      // axios.post(`${url}/update`, file, options)
      //   .then((result) => {
      //       console.log(result)
      //   })
      //   .catch(err => console.log(err))
      // }

      // axios.get(`${url}`, {
      //     filename: file.name,
      //     filetype: file.type
      // })
      // .then((result) => {
      //   var signedUrl = result.data.signedUrl;
      // })

    _passwordConfirm(){
      console.log(this.password.value.length)
    }

    _minNumber(){
      this.newPassword.value.length <5 ? this.setState({minNum : false}) : this.setState({minNum : true})
    }

    _passwordCompare(){
      const token = localStorage.getItem('token')
      console.log(token)
      console.log(this.password.value)
      const form = {
        userPassword : this.password.value
      }
        axios.post(`${url}/api/user/update/password`, form, { headers: { 'token': token} })
            .then(response => {
              console.log(response.data)
            
              response.data.success === true || !this.password.value ? this.setState({confirmPassword : true}) : this.setState({confirmPassword : false})
            })
            .catch(err => console.log(err));
    }

    _submit(){
      const token = localStorage.getItem('token')
      const form = {
        userPassword : this.newPassword.value || undefined, 
        userName : this.nickname.value, 
        userPhoto: this.state.imageAddress || this.state.data.user_photo,
        toneName : this.state.colorSelected || this.state.data.tone

      }
        // /confirmNickname true

        this.state.validate === true && this.state.confirmNickname !== false && this.state.confirmPassword !== false && this.state.minNum !== false  ?  
          axios.post(`${url}/api/user/update/info`, form,  { headers: { 'token': token } })
          .then(response => 
              // this.setState({ user: response.data })
              // console.log(response)
              response.data.success === true ? (alert('변경이 완료되었습니다'), window.location.reload()) : null
          )
          .catch(err => console.log(err)) :  alert('변경 정보를 확인해주세요') 
     
    }
      
    

    colorOptions = [
      { value: '모르겠어요', label: '모르겠어요' },
      {
          type: 'group', name: 'Cool tone', items: [
              { value: 'Summer', label: 'Summer' },
              { value: 'Winter', label: 'Winter' },
              { value: '쿨톤', label: '쿨톤' }
          ]
      },
      {
          type: 'group', name: 'Warm tone', items: [
              { value: 'Spring', label: 'Spring' },
              { value: 'Fall', label: 'Fall' },
              { value: '웜톤', label: '웜톤' }
          ]
      }
  ]

    render() {
      console.log('this.state.file@@@@@@@@@@@@@ : ',this.state.file)
      console.log('닉네임 유효 :', this.state.confirmNickname)
      console.log('현재비번 유효 :', this.state.confirmPassword)
      console.log('비번 대조 :', this.state.validate)
      console.log('최소 비번숫자 :', this.state.minNum)
      console.log('datadatadtata', this.state.data)
      console.log('myinfomyinfomyinfo', this.props);
      console.log('filefilefile', this.state.file);

        // console.log(this.state.imagepreviewUrl)
        return (
          this.state.data ?
          <Container>
            <Header>내 정보 수정</Header>
            <Table>
              <Row>
                <Column>사진</Column>
                <Data>{this.state.hasPhoto ? <div><ProfPic src= {this.state.data.user_photo} /><Button onClick={this._photoChange}> 사진 변경</Button></div> 
                  : <div><Dropzone onDrop={ this._onDrop } size={ 30 }  accept = "image/*">
                  <div style={{width:'100%', height:'100%', textAlign:'center'}}>
                       <div style={{width:'100%', height:'100%', textAlign:'center'}}>{this.state.file ? <ChangePic src= {this.state.imageAddress ? this.state.file.preview : 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}  />:null}</div>
                           </div>
                           </Dropzone>
                           
                           
                          <Button onClick={this._photoChange}> 취소</Button></div>}
                </Data>
              </Row>
              <Row>
                <Column>이메일</Column>
                <Data>{this.state.data ? this.state.data.mail : null}</Data>
              </Row>
              <Row>
                <Column>닉네임</Column>
                <Data>
                    {this.state.nickName === false ? <div><Input value = {this.state.data ? this.state.data.name : null} ref={ref => { this.nickname = ref; }}  readOnly/> <Button onClick = {this._nickNameChange}>닉네임 변경</Button></div>
                    : <div><input onBlur={this._nicknameOnchange} ref={ref => { this.nickname = ref; }} /><Button onClick = {this._confirmNickname}> 중복확인 </Button><Button onClick={this._nickNameChange}>변경취소</Button></div>}
                </Data>
              </Row>
              <Row>
                <Column>피부타입</Column>
                <Data>
                  {!this.state.data ? null : this.state.tone === false ? this.state.data.tone : null}
                   {this.state.tone === false ? <Button onClick = {this._toneChange}style={{'margin-left': '15px'}}>피부타입 변경</Button> : null }
                  {this.state.tone === true ? 
                    <div><Dropdown options={this.colorOptions} placeholder="USER'S PERSONAL COLOR" onChange={this._onColorSelect} value = {this.state.colorSelected} /> <Button onClick={this._toneChange}>변경취소</Button></div> 
                  : null}
                </Data>
              </Row>              
              <Row>
                <Column>비밀번호</Column>
                <Data style={{height: 'auto !important'}}>
                <div>비밀번호는 5-10자 이내로 설정해주세요.</div>
                    <div>현재 비밀번호</div>
                    <input onChange={this._passwordCompare} ref={ref => { this.password = ref; }}type='password'/>
                      {!this.password ? null : !this.password.value.length ? null : this.state.confirmPassword === true ? < div > Ok </div> :  this.state.confirmPassword === false ? <div>비밀번호 확인해주세요</div > : null}
                    <div>신규 비밀번호</div>
                    <input onChange ={this._minNumber} ref={ref => { this.newPassword = ref; }} type='password'/>
                    {!this.newPassword ? null: !this.newPassword.value.length ? null : !this.state.minNum ? <div>비밀번호는 5글자 이상 입력하셔야 합니다.</div> : <div>Ok</div>}
                    <div>비밀번호 재입력</div>
                    <input onClick={this._passwordInput} onChange = {this._comparePassword} ref={ref => { this.confirmPassword = ref; }} type='password'/>
                     {!this.confirmPassword && !this.newPassword ?  null : this.confirmPassword.value && this.newPassword.value ? <div>{this.state.validate === true ? '비밀번호가 일치합니다' : '입력한 비밀번호가 일치하지 않습니다'}</div>:null}
                </Data>
              </Row>
              <Row>
                <Column>성별</Column>
                <Data>{this.state.data ? this.state.data.gender : null}</Data>
              </Row>
              <Row>
                <Column>생년월일</Column>
                <Data>{this.state.data ? this.state.data.birth.split('T')[0] : null}</Data>
              </Row>
            </Table>
            <div style={{margin: ' 5% auto auto auto' , textAlign:'center'}}>
              <Button onClick={this._submit}> 
                  변경 
              </Button>
                <Link to='/' style={{ textDecoration: 'none' }}> <Button>취소</Button> </Link>
            </div>
            {/* <button onClick={this.insta}> 검색 </button> */}
            {/* < img style = {{width:'100px', height:'100px'}} src = {this.state.photos ? this.state.photos : null} */}
             {/*//이건나중에 < img style = {{width:'100px', height:'100px'}} src = {this.state.photos ? this.state.photos.data[0].images.standard_resolution.url : null} */}
            
          
            </Container>
            : < Container > "Loading..." </Container>
        )
    }
}

export default MyInfo;