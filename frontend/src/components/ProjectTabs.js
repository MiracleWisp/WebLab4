import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProjectDialog from "./ProjectDialog";
import ProjectList from "./ProjectList";
import SharedProjectList from "./SharedProjectList";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class ProjectTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Projects" />
                        <Tab label="Shared projects" />
                    </Tabs>
                </AppBar>
                {value === 0 && <ProjectList/>}
                {value === 1 && <SharedProjectList/>}
            </div>
        );
    }
}

export default ProjectTabs;