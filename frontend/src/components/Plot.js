import React from 'react';
import plot from '../assets/plot.svg'

class Plot extends React.Component {

    render(){
        return (
            <div>
                <object type="image/svg+xml" data={plot} width="200" height="200" >
                    Your browser does not support SVG
                </object>
            </div>
        )
    }
}

export default Plot;