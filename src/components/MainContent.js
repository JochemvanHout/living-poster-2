import React from "react"

export default function MainContent(props) {
    return (
        <div>
            <img className="mainImage" src={props.postUrl} alt="Post from Reddit"></img>
        </div>
    )
}
