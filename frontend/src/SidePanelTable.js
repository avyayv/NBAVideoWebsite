import React from 'react'
import {Table} from 'react-bootstrap'

class SidePanelTable extends React.Component {

    tableRowClick = (e) => {
        let videoUrl = e.target.getAttribute("videoUrl")
        this.props.setVideo(videoUrl)
    }

    render() {
        const allRows = []
        for (let x in this.props.shots) {
            let thisVideoUrl = this.props.shots[x].VideoURL
            let thisRow = (
                <tr onClick={this.tableRowClick}>
                    <td videoUrl={thisVideoUrl}>{this.props.shots[x].PLAYER_NAME}</td>
                    <td videoUrl={thisVideoUrl}>{this.props.shots[x].SHOT_DISTANCE}</td>
                    <td videoUrl={thisVideoUrl}>{this.props.shots[x].SHOT_MADE_FLAG}</td>
                </tr>
            )
            allRows.push(thisRow)
        }

        return (
            <div className="shots-table">
                <Table className="table" striped bordered hover>

                    <thead>
                        <tr>
                            <th>Shooter</th>
                            <th>Shot Distance</th>
                            <th>Shot Made</th>
                        </tr> 
                    </thead>

                    <tbody>
                        {allRows}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default SidePanelTable