/* eslint-disable */

import React, {Component} from 'react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import Login from '../user/Login'
import {Redirect} from 'react-router-dom';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
const confirm = Modal.confirm;
 
import axios from 'axios';
import { url } from '../../config';


const PageWrapper = styled.div`
    margin-top: 2%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ItemListContainer = styled.div` 
    height: 100%;
    width: 80%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
`

//가운데로 필요
const Ul = styled.ul`
    width: 100%;
    height: 100%;
    padding: 0;
    padding-left: 6%;
    display: flex;
    flex-wrap: wrap;
`

const Wrapper = styled.div`
    position: relative;
    margin: 1%;
    width: 20%;
    min-width: 15rem;
    height: 25rem;
    display:flex;
    flex-direction: row;
`

const Li = styled.li`
    background-color: #f1f1f1;
    width: 100%;
    margin-top: 15px
    font-size: 30px;
    list-style: none;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    &:hover {
        box-shadow: 16px 16px 16px rgba(0,0,0,0.2);
    }
`

const ItemTop = styled.div`
    position: relative;
    width: 100%;
`
const Img = styled.img`
    height: 18rem;
    width: 100%;
    background-color: "white"
`
const Deletebtn = styled.button`
    position: absolute;
    border: none
    top:0
    left:0
    float:left
    font-size: 1.5rem
    border-radius: 50%;
    transition: 0.5s;
    &:hover {
        background: black
        cursor: pointer;
        color:white
    }
    &:active {
        transform: translateY(4px);
    }
`

const Color = styled.div`
    position: absolute; 
    top:10px
    right: -5px;
    border-style: solid;
    border-width: 0 70px 70px 0;
    border-color: transparent #${props=>props.color} transparent transparent;
`

const ItemBottom = styled(Link)`
    marin:auto
    height: 100px;
    &:visited {
        color: black;
        text-decoration: none 
    }  
`
const Brand = styled.div`
    font-size:8px;
    text-align: center
`
const ItemName = styled.div`
    font-size:16px;
    text-align: center
`
const Price = styled.div`
    font-size: 14px;
    text-align: center
`

const Rating = styled.div`
    font-size: 19px;
    text-align: center
`
const Review = styled.span`
    font-size: 13px;
`

class WishList extends Component {
    constructor(props){
        super()
        this.state = {
            items: [],
            tokenVerified: true
        }
    }
    
    deleteOne = (e)=>{
        const form = {
            color_id: e.target.id
        }
        const token = localStorage.getItem('token') 
        axios.post(`${url}/api/wishlist/delete`, form, {headers: {'token': token}})
            .then((response) => {
                console.log('delete', response);
                console.log(token);
                axios.get(`${url}/api/wishlist/get/list`, {headers: {'token': token}})
                .then((response) => {
                    console.log('rerererere', response);
                    this.setState({
                        items: response.data.rows
                    })
                  })
              })
        console.log(e.target.id);    
    }


     showDeleteConfirm = (e) => {
        const form = {
            color_id: e.target.id
        }        
        confirm({
          title: 'Are you sure delete this task?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: ()=> {
            const token = localStorage.getItem('token') 
            axios.post(`${url}/api/wishlist/delete`, form, {headers: {'token': token}})
                .then((response) => {
                    console.log('delete', response);
                    console.log(token);
                    axios.get(`${url}/api/wishlist/get/list`, {headers: {'token': token}})
                    .then((response) => {
                        console.log('rerererere', response);
                        this.setState({
                            items: response.data.rows
                        })
                      })
                  })
            console.log('ok');
            
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      

    componentDidMount(){ 
        const token = localStorage.getItem('token')  
        axios.get(`${url}/api/wishlist/get/list`, {headers: {'token': token}})
        .then((response) => {
            if(response.data.success===true){
                console.log('wishSUCCESS', response.data);
                
                this.setState({
                    items: response.data.rows
                })
            }else {
                console.log('wishFAil', response);
                console.log('thisprops', this.props);
                //Link로 타고들어오면 이게 없으면 nav로그인 상태는 유지되어있다.
                this.props.handleLogout()
                this.props.history.push('/login', {from: this.props.location})
            }
          })
    }

    render(){
        console.log('wishpropswishpropswishprops',this.props);
        return (
            <PageWrapper>
                <ItemListContainer >
                <Ul>
                    {this.state.items.map((item, i)=>{
                        return (
                            <Wrapper >
                            <Li key={i}>
                                <ItemTop >
                                    <Link to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }}>
                                    <Img src={item.photo}/>
                                    </Link>
                                   
                                    {/* <Deletebtn onClick={this.deleteOne} id={item.color_id}>&times;</Deletebtn> */}
                                    <Deletebtn id={item.color_id}  onClick={this.showDeleteConfirm} type="dashed">
                                    &times;
                                    </Deletebtn>
                                </ItemTop >
                                <ItemBottom to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }}>
                                    <Brand>{item.brand}</Brand>
                                    <ItemName>{item.name}, {item.volume}</ItemName>
                                    <Price>{item.price}</Price>
                                    <Rating>
                                        <StarRatingComponent 
                                            name="itemList" 
                                            editing={false}
                                            value={item.avg}
                                        />, <Review>({item.reviews})</Review>
                                    </Rating>
                                </ItemBottom>
                                </Li>
                                <Color color={item.hex}/>
                            </Wrapper>
                        )
                    })}
                </Ul>
              </ItemListContainer>
            </PageWrapper>
        );
    }
};

export default WishList;
