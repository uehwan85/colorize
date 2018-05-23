import React from 'react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
// const queryString = require('query-string');

const ItemListContainer = styled.div`
    top:10%;
    position: absolute;
    height: 100%;
    width: 100%
    margin-left:5%
    display: flex
    flex-direction: column;
`
//가운데로 필요
const Ul = styled.ul`
    position: absolute;
    height: 100%;
    width: 90%;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top:5%
`
const Li = styled.li`
    background-color: #f1f1f1;
    width: 300px;
    height: 400px;
    margin: 10px;
    font-size: 30px;
    list-style: none;
`
const Wrapper = styled.div`
    height: 400px;
    width: 300px;
`

const ItemTop = styled.div`
    height: 300px;
    position:relative;
`
const Img = styled.img`
    width: 300px;
    height: 300px;
`
const Color = styled.div`
    background-color: #${props=>props.color};
    border-radius: 50%;
    position: absolute; 
    width: 70px;
    height: 70px;
    top:5px; 
    right:5px
`

const ItemLink = styled(Link)`
    background-color: pink;
    height: 100px;
    &:visited {
        color: black;
        text-decoration: none;
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
const SortContainer = styled.div`
    margin-top: 2%;
    margin-left: 3%;
    overflow: hidden;
`

const Btn = styled.button`
    border: none;
    outline: none;
    padding: 12px 16px;
    background-color: #f1f1f1;
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
    $:active {
        background-color: #666;
        color: white;
    }
`

const Items = ({item}) => {

    return (
        <ItemListContainer >
        <SortContainer>
            <Btn>기본순</Btn>
            <Btn>높은가격순</Btn>
            <Btn>낮은가격순</Btn>
            <Btn>별점순</Btn>
            <Btn>최신순</Btn>
        </SortContainer>    
            <Ul>
                {item.map((item, i)=>{
                    return (
                        <Li key={i}>
                        <Wrapper>
                            <ItemTop >
                                <Img src={item.photo}/>
                                <Color color={item.hex}/>
                            </ItemTop >
                            <ItemLink to={`/items/detail/${item.color_id}`} style={{ textDecoration: 'none' }}>
                                <Brand>{item.brand}</Brand>
                                <ItemName>{item.item}, {item.volume}</ItemName>
                                <Price>{item.price}</Price>
                                <Rating>
                                    <StarRatingComponent 
                                        name="itemList" 
                                        editing={false}
                                        value={item.avg}
                                    />, <Review>({item.reviews})</Review>
                                </Rating>
                            </ItemLink>
                        </Wrapper>
                    </Li>
                    )
                })}
            </Ul>    
        </ItemListContainer>
    );
};

export default Items;