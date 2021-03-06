import React, {Component, PropTypes} from "react";
import { connect } from "react-redux";
import PersonaBarPageHeader from "dnn-persona-bar-page-header";
import Body from "./body";
import PersonaBarPage from "dnn-persona-bar-page";
import resx from "../resources";

class App extends Component {
    constructor() {
        super();
    }
    
    render() {
        const {props} = this;
        return (
            <div className="securitySettings-app">
                <PersonaBarPage isOpen={props.selectedPage === 0}>
                    <PersonaBarPageHeader title={resx.get("nav_Security")}>
                    </PersonaBarPageHeader>
                    <Body cultureCode={props.cultureCode}/>
                </PersonaBarPage>
            </div>
        );
    }
}

App.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedPage: PropTypes.number,
    cultureCode: PropTypes.string
};


function mapStateToProps(state) {
    return {
        selectedPage: state.visiblePanel.selectedPage,
        selectedPageVisibleIndex: state.visiblePanel.selectedPageVisibleIndex
    };
}


export default connect(mapStateToProps)(App);