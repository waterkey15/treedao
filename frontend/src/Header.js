import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <Container>
            <h1>Welcome to Tree DAO for the Stanford Community by the Stanford Community</h1>
        </Container>
    )
}

const Container = styled.div`
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    text-align: center;
    
`


export default Header
