import React , {useEffect, useState} from 'react';
import ReactTooltip from 'react-tooltip'

function SpeedPoint(props){
    const [color, setColor] = useState("red")
    useEffect(()=>{
       if(props.speeding){
           setColor('green')
       }
    }, [props.speeding])
    return (
        <>
        <div data-tip="" data-for={"registerTip"+props.lat+"/"+props.lng} style={{
            color: 'white',
            background: color,
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            //transform: `translate(-50%, -50%)`,
            width: `${0.015}rem`,
            height: `${0.015}rem`,
            opacity: 0.75
        }}>
            {props.speed}
        </div>
            <ReactTooltip id={"registerTip"+props.lat+"/"+props.lng} place="top" effect="solid">
                {`Street: ${props.street}\nAvg Speed: ${props.avgSpeed}`}
            </ReactTooltip>
        </>
    );

}
export default SpeedPoint