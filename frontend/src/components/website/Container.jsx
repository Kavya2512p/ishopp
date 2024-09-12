import React from 'react'

const Container = (props) => {
    return (
        <div className={`max-w-[1200px] mx-auto ${props.className} `}>
            {props.children}
        </div>
    );
}

export default Container;
