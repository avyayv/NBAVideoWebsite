import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter,  numberFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class SidePanelTable extends React.Component {


    render() {

        const tableRowEvents = {
            onClick: (e, row, rowIndex) => {
                this.props.setVideo(row.videoUrl)
            },
         }
         
        const columns = [
          {
            dataField: 'season',
            text: 'Season',
            headerStyle: (colum, colIndex) => {
                return { width: '110px'};
            },
            filter: textFilter(),
          }, {
            dataField: 'team',
            text: 'Team',
            filter: textFilter()
          }, {
            dataField: 'gameTeams',
            text: 'Game',
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
            },
            filter: textFilter(),
          }, {
            dataField: 'gameDate',
            text: 'Game Date',
            headerStyle: (colum, colIndex) => {
                return { width: '120px'};
            },
            sort: true,
            filter: textFilter()
          }, {
            dataField: 'actionType',
            text: 'Action Type',
            filter: textFilter()
          }, {
            dataField: 'distance',
            text: 'Distance (ft.)',
            sort: true,
            filter: numberFilter()
          }, {
            dataField: 'secsRemaining',
            text: 'Sec. Remain',
            sort: true,
            filter: numberFilter()
          }, {
            dataField: 'scoreMargin',
            text: 'Score Margin',
            sort: true,
            filterValue: (cell, row) => Math.abs(cell),
            filter: numberFilter()
          }, {
            dataField: 'made',
            text: 'Made Shot',
            headerStyle: (colum, colIndex) => {
                return { width: '60px'};
            },
            filter: textFilter()
          }, 
        ] 

        const allRows = []
        for (let x = 0; x < this.props.shots.length; x++)  {
            let thisRow = {
                'team': this.props.shots[x].TEAM_NAME,
                'player': this.props.shots[x].PLAYER_NAME,
                'gameDate': this.props.shots[x].GameDate.split('/')[0],
                'actionType': this.props.shots[x].ACTION_TYPE,
                'distance': this.props.shots[x].SHOT_DISTANCE,
                'made': this.props.shots[x].SHOT_MADE_FLAG,
                'description': this.props.shots[x].Description,
                'gameTeams': this.props.shots[x].AwayTeam + '@' + this.props.shots[x].HomeTeam,
                'videoUrl': this.props.shots[x].VideoURL,
                'season': this.props.shots[x].Season,
                'secsRemaining': this.props.shots[x].SecondsRemaining,
                'scoreMargin': this.props.shots[x].ScoreDiff
            }
            allRows.push(thisRow)
        }


        return (
            <div className="shots-table w-100">
                <BootstrapTable 
                    keyField="d" 
                    hover
                    condensed 
                    data={ allRows } 
                    columns={ columns } 
                    rowEvents={ tableRowEvents }  
                    filter={ filterFactory() } 
                    pagination={ paginationFactory() }/>
            </div>
        )
    }
}
export default SidePanelTable