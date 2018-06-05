import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import './Signup.css';

import axios from 'axios';
import { url } from '../../config';

import validator from 'validator';
import history from '../../utils/history'

const Container = styled.div`
    padding: 5% 0 5% 0
    display: flex;
    flex-direction: column
    align-item: stretch;
    margin: 10% auto;
    font-family: Nanum Gothic;
    border: 1px solid black;
    width: 70%;
    margin: 150px auto auto auto;
    @media (max-width: 768px) {
        margin-top: 100px;
    }
    @media (max-width: 414px) {
        width: 90%;
    }
    @media (max-width: 375px) {
        margin-top: 100px;
    }
    @media (max-width: 320px) {
        margin-top: 100px;
    }
`


const SignupContainer = styled.div`
    .Dropdown-control {
        margin: 5px 0 20px 0;
        font-size: 0.8rem;
        width: 100%;
    }
    .Dropdown-option {
        font-size: 0.8rem;
    }
`

const SignupTop = styled.div`
    display:flex;
    flex-direction: column
    width: 100%
`

const SignupText = styled.div`

    font-size: 3rem;
    font-family: Roboto;
    font-weight: 100
    text-align: center;
    @media (max-width: 570px) {
        font-size: 2rem;
    }
    @media (max-width: 460px) {
        font-size: 1.8rem;
    }
    @media (max-width: 418px) {
        font-size: 1.6rem;
    }
`

const SignupBottom = styled.div`
    height: 80%;
    width: 70%
    margin:20px auto;
`

const BdayInput = styled.input`
    margin: 5px 0 20px 0;
    border: 0.5px solid black;
    width: 100%;
    padding: 10px;
    font-size: 0.8rem
`
const Input = styled.input`
    margin: 5px 0 20px 0;
    border: 0.5px solid black;
    width: 100%;
    padding: 10px;
    font-size: 0.8rem
`
const InvalidId = styled.div`
    color:red
    font-size: 0.9rem
`
const PasswordImage = styled.img`
    width: auto; 
    height: auto;
    max-width: 100%;
`
const InvalidPassword = styled.div`
    color:red
    font-size: 0.8rem;
`

const NicknameImageDiv = styled.div`
    border: 2px solid #ddd;
    width: 10%
    height: 50%;
`

const NicknameImage = styled.img`
    width: auto; 
    height: auto;
    max-width: 100%;
`
const InvalidNickname = styled.div`
    color:red
    font-size: 0.8rem;
`

const BirthdateImageDiv = styled.div`
    border: 2px solid #ddd;
    width: 10%
    height: 50%;
`
const InvalidBirthdate = styled.div`
    color:red
    
`
const Signupbtn = styled.div`
    border: none;
    background-color: black;
    color: white;
    margin-top: 5px
    padding: 14px 28px;
    cursor: pointer;
    text-align: center;
    &:visited {
        text-decoration: none;
    }
    font-size: 1.5em;
    font-family: 'Roboto';
    font-weight: 300;
    @media (max-width: 519px) {
        font-size: 1.3em;
    }
    &:hover {
        text-shadow: 0 0 5px #EB509F, 0 0 10px #EB509F, 0 0 20px #EB509F, 0 0 30px #EB509F, 0 0 40px #EB509F;
        // text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080, 0 0 55px #ff0080, 0 0 75px #ff0080;
      }  
      
`

const Confirm = styled.span`
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: black;
    }
`

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            isValidEmail: true,
            isValidPassword: true,
            isValidNickname: true,
            birthdateSelected: '',
            genderSelected: '',
            colorSelected: '',
            signupSuccess: false,
            isExist: '',
            isExistName: ''
        }
    }

     error() {
        Modal.error({
          title: '로그인 에러',
          content: '모든 항목을 입력해 주세요',
        });
      }

    onSubmit = () => {
        const form = {
            userMail:  this.email.value,
            userPassword: this.password.value,
            userName:  this.nickname.value,
            birthDate: this.state.birthdateSelected, 
            gender: this.state.genderSelected,
            toneName: this.state.colorSelected
        }
        const {userMail, userPassword, userName, birthDate, gender, toneName} = form
        const {isValidEmail, isValidPassword, isValidNickname, birthdateSelected, genderSelected, colorSelected} = this.state
        console.log('birthdate', birthDate.slice(0,4));
        
        if(!(userMail && userPassword && userName && birthDate && gender && toneName)){
            this.error()
        } else {
            if(!validator.isEmail(userMail)){
                document.getElementById('email').style.display = "inline-block"
                document.getElementById('email').style.color = "red"
                document.getElementById('email').style.fontSize = "0.8rem"
                window.setTimeout(function() {
                    document.getElementById('email').style.display='none'
                 }, 3000);
            } else if(!validator.isLength(userPassword, {min: 5, max: 10})){
                document.getElementById('password').style.display = "inline-block"
                document.getElementById('password').style.color = "red"
                document.getElementById('password').style.fontSize = "0.8rem"
                window.setTimeout(function() {
                    document.getElementById('nickname').style.display='none'
                 }, 3000);
            } else if(!validator.isLength(userName, {min: 5, max: 10})){
                document.getElementById('nickname').style.display = "inline-block"
                document.getElementById('nickname').style.color = "red"
                document.getElementById('nickname').style.fontSize = "0.8rem"
                window.setTimeout(function() {
                    document.getElementById('nickname').style.display='none'
                 }, 3000);
            } else if(birthDate.slice(0,4)>2018){
                document.getElementById('birthdate').style.display = "inline-block"
                document.getElementById('birthdate').style.color = "red"
                document.getElementById('birthdate').style.fontSize = "0.8rem"
                window.setTimeout(function() {
                    document.getElementById('birthdate').style.display='none'
                 }, 3000);
            } else {
                axios.post(`${url}/api/user/post/signup`, form)
                .then(res => {
                    console.log(res);
                    if(res.data.success===true){
                        this.setState({
                            signupSuccess: true
                        })
                        const {history} = this.props
                        const {pathname} = this.props.location.state.from
                        const {search} = this.props.location.state.from
                        history.push('/login', {from: {pathname: pathname, search: search}})  
                    }else if(!res.data.success&&res.data.message==='invalid mail'){
                        this.setState({
                            isExist: "중복된 메일 주소입니다."
                        })
                        document.getElementById('email').style.display = "inline-block"
                        document.getElementById('email').style.color = "red"
                        document.getElementById('email').style.fontSize = "0.8rem"
                        window.setTimeout(function() {
                            document.getElementById('email').style.display='none'
                         }, 3000);
                    }else if(!res.data.success&&res.data.message==='invalid name'){
                        this.setState({
                            isExistName: "중복된 닉네임 입니다."
                        })
                        document.getElementById('nickname').style.display = "inline-block"
                        document.getElementById('nickname').style.color = "red"
                        document.getElementById('nickname').style.fontSize = "0.8rem"
                        window.setTimeout(function() {
                            document.getElementById('nickname').style.display='none'
                         }, 3000);
                    }
                })
                .catch(error => console.log(error))
            }
            }
        } 
    

    onChangeEmail = () => {
        const email = this.email.value
        this.setState({
            isValidEmail: validator.isEmail(email)
        })
    }

    onChangePassword = () => {
        const password = this.password.value
        this.setState({
            isValidPassword: validator.isLength(password, {min: 5, max: 10})
        })        
    }

    onChangeNickname = () => {
        const nickname = this.nickname.value
        this.setState({
            isValidNickname: validator.isLength(nickname, {min: 5, max: 10})
        })        
    }

    onBirthdate = () => {
        const date = this.date.value
        this.setState({
            birthdateSelected: date
        })
    }

    onColorSelect(option) {
        this.setState({ colorSelected: option.value })
    }

    onSelectedGender = (option) => {
        this.setState({
            genderSelected: option.value
        })
    }

    clickToLogin = () => {
        const {history} = this.props
        const {pathname} = this.props.location.state.from
        const {search} = this.props.location.state.from
        history.push('/login', {from: {pathname: pathname, search: search}})   
    }

    showSucces = () => {

    }

    showFailure = () => {

    }

     colorOptions = [
        { value: '모르겠어요', label: '모르겠어요' },
        {
            type: 'group', items: [
                { value: 'Cool', label: 'Cool' },
                { value: 'Summer', label: 'Summer' },
                { value: 'Winter', label: 'Winter' }
            ]
        },
        {
            type: 'group', items: [
                { value: 'Warm', label: 'Warm' },
                { value: 'Spring', label: 'Spring' },
                { value: 'Fall', label: 'Fall' }
            ]
        }
    ]

    genderOptions = [
        {value: '여자', label:'여자'},
        {value: '남자', label:'남자'}
    ]

    render() {
        console.log('signup', this.state.isValidEmail);
        
        console.log(this.state.genderSelected);
        console.log(this.state.colorSelected);
        console.log(this.state.signupSuccess);
        
        return (
            <Container>
                <SignupContainer>
                    <SignupTop>
                    <SignupText>Colorize yourself</SignupText>
                    </SignupTop>
                    <SignupBottom>
                    이메일 주소<span style={{display: 'none', marginLeft: '10px'}} id='email'>{this.state.isExist ? this.state.isExist : '이메일틀림'}</span><br/>
                    <Input 
                    onChange={this.onChangeEmail.bind(this)} innerRef={ref => { this.email = ref; }} placeholder="abc@email.com"/> 
                    {this.state.isValidEmail ? null : <InvalidId style={{fontSiz:'0.6rem'}}>Invalid Email Type</InvalidId>}
                    <br/>
                    비밀번호<span style={{display: 'none', marginLeft: '10px'}} id='password'>비밀번호 길이 틀림</span><br/>
                    <Input type="password"
                    onChange={this.onChangePassword.bind(this)} innerRef={ref => { this.password = ref; }} placeholder="Enter Your Password"/> 
                    {this.state.isValidPassword ? null : <InvalidPassword>5글자 이상 10글자 이하로 입력 해 주세요</InvalidPassword>}  
                    <br/>
                    닉네임<span style={{display: 'none', marginLeft: '10px'}} id='nickname'>{this.state.isExistName ? this.state.isExistName : '닉네임 길이 틀림'}</span><br/>
                    <Input
                    onChange={this.onChangeNickname.bind(this)} innerRef={ref => { this.nickname = ref; }} placeholder="Enter Your Nickname"/> 
                    {this.state.isValidNickname ? null : <InvalidNickname>5글자 이상 10글자 이하로 입력 해 주세요</InvalidNickname>}
                    <br/>
                    생년월일<span style={{display: 'none', marginLeft: '10px'}} id='birthdate'>잘못 된 날짜 형식입니다</span><br/>
                    <BdayInput
                    onBlur = {this.onBirthdate.bind(this)}
                    required type='date'innerRef={ref => { this.date = ref; }}/>
                    성별<br/>
                    <Dropdown options={this.genderOptions} onChange={this.onSelectedGender.bind(this)} placeholder="여자/남자"
                    value={this.state.genderSelected}/>
                    {/* <input name="gender" onChange={this.onSelectedGender.bind(this)} type="radio" value="female"/> 여자 
                    <input name="gender" onChange={this.onSelectedGender.bind(this)} type="radio" value="male"/> 남자 */}
                    피부톤<br/>
                    <Dropdown options={this.colorOptions} onChange={this.onColorSelect.bind(this)} placeholder="계절별 피부톤"
                    value={this.state.colorSelected} />
                        <Signupbtn onClick={this.onSubmit}>Signup</Signupbtn>
                    </SignupBottom>
                </SignupContainer>
            </Container>
        )
    }
}

export default Signup;