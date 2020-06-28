import React from 'react'


export default function Rows(props) {
    return (<>
        <tr>
            {props.ele.split(props.delimiter).map((data, i) => (
                <>
                    {i + 1 <= 4 ? <td key={i}>{data}</td> : null}
                </>
            )
            )}
        </tr>
    </>)
}