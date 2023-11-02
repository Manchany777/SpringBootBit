import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div>
            <h3>*** 메인 화면 ***</h3>
            <hr/>
            <h4>
                <p><Link to='/user/writeForm'>입력</Link></p>
                <p><Link to='/user/list'>출력</Link></p>
            </h4>
        </div>
    );
};

export default Index;