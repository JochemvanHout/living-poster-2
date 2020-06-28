import React from "react"

export default function Footer(props) {
    return (
        <footer>
            <p>This poster is a collaboration between you, me and the Reddit user {props.postAuthor}</p>
        </footer>
    )
}
