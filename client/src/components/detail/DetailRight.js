import React, {Component} from 'react';
import Chart from './Chart';
import styled from 'styled-components';
import axios from 'axios';
import {url} from '../../config';
import NumberFormat from 'react-number-format';
import LinesEllipsis from 'react-lines-ellipsis';
import Modal from 'react-modal';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const DetailDiv = styled.div `
    width: 40%;
`;

const Wrapper = styled.div `
    height: 100%;
    width: 70%;
    border: 1px solid blue;
    display: flex;
`;

const ChartDiv = styled.div `
    width: 60%;
`;


class DetailRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            data: '',
            popupIsOpen: false
        };
        this._openPopup = this._openPopup.bind(this);
        this._afterOpenPopup = this._afterOpenPopup.bind(this);
        this._closePopup = this._closePopup.bind(this);
    }

    componentDidMount() {
        // axios.get(`${url}/api/item/rate?color_id=${this.props.match.params.id}`)
        axios.get(`${url}/api/item/rate?color_id=${this.props.id}`)
            // .then((response) => {
            //     console.log(response.data);
            //   })
            .then(response => this.setState({
                data: response.data
            }))
            .catch(err => console.log(err));
    }

    _openPopup() {
        this.setState({ popupIsOpen: true });
    }

    _afterOpenPopup() {
        this.subtitle.style.color = '#f00';
    }

    _closePopup() {
        this.setState({ popupIsOpen: false });
    }


    render() {

        return ( 
            <Wrapper>
                <DetailDiv>
                    <div> name: {this.props.data ? this.props.data[0].name : null} </div> 
                    <div> price: < NumberFormat value = {this.props.data ? this.props.data[0].price : 0} displayType = "text" thousandSeparator={true} suffix = "원" /> < br/></div>
                    <LinesEllipsis
                        text= {`detail : ${this.props.data ? this.props.data[0].description : null}`} 
                        maxLine='5'
                        ellipsis={<span style={{cursor: 'pointer'}}onClick={this._openPopup}>{ ' ...전체보기...'}</span>}
                        trimRight
                        basedOn='words'
                    /> 
                    {/* <div > detail: {this.props.data ? this.props.data[0].description : null} </div> */}
                </DetailDiv>
                <ChartDiv>
                    <Chart data = {this.state.data}/> 
                </ChartDiv> 

                <Modal
                    isOpen={this.state.popupIsOpen}
                    onAfterOpen={this._afterOpenPopup}
                    onRequestClose={this._closePopup}
                    style={customStyles}
                    contentLabel="Description popup"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Description</h2>
                    <div style={{ width: '50vh' }}>{this.props.data ? this.props.data[0].description : null}</div>
                    <button style={{ cursor: 'pointer' }} onClick={this._closePopup}>close</button>
                </Modal>

            </Wrapper>
        );
    }
}

export default DetailRight;