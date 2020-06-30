import React from "react"

export default function MainContent(props) {
    return (
        <img className="mainImage" src={props.postUrl} alt="Post from Reddit"></img>
    )
}
