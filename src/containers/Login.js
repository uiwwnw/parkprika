import React, { Component } from 'react';
import LoginJoin from '../hoc/containers';
import * as Components from '../components/Components';
import { store, action } from '../reducers/index.js';
import commonStyle, { unit } from '../variables/style.js';
import styled from 'styled-components';
import {getPw} from '../../services/createCipher';
import { get } from '../../services/get';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            id: null,
            pw: null,
        };
        this.submit = this.submit.bind(this);
        this.Login = styled.div`
            padding: ${commonStyle.paddingVertical} ${commonStyle.paddingHorizone};
        `;
    }
    submit() {
        if (this.state.valid) {
            alert('아이디, 비밀번호를 다시확인해주세요')
        } else {
            get('users?id=' + this.state.id)
            .then(response => {
                const data = response.data[0];
                if (data.pw === this.state.pw) {
                    console.log('로그인에성공햇습니다.');
                    store.dispatch(action.userInfo('USERINFO', {
                        'userId': getPw(data.id),
                        'userName': getPw(data.name),
                        'userPw': data.pw,
                        'userEmail': data.email,
                    }));
                    // console.log(this.context.router);
                    // history.push();
                    document.location.href = document.location.origin;
                } else {
                    alert('아이디, 비밀번호를 다시확인해주세요')
                }
            })
            .catch(response => {
                console.log(response, '로그인실패')
            });
        }
    }

    render() {
        return (
            <this.Login>
                <h1>login</h1>
                <Components.Input title="아이디" type="text" onInput={this.props.input.bind(this, 'id')} />
                <Components.Input title="비밀번호" type="password" onInput={this.props.input.bind(this, 'pw')}/>
                {/* <input type="text" onInput={this.props.input.bind(this, 'id')} />
                <input type="password" onInput={this.props.input.bind(this, 'pw')} /> */}
                <button onClick={this.submit}>로그인하기</button>
            </this.Login>
        )
    }
}
const withHocLogin = LoginJoin(Login);

export default withHocLogin;