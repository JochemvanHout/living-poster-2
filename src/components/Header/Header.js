import React from "react"

export default function Header(props) {
    return (
        <header>
            <h1>{props.postTitle}</h1>
            <h2>{props.postSubreddit}</h2>
        </header>
    )
}
