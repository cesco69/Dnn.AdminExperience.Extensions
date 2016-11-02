import React, {Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import Menu from "./menu/Menu";
import MenuItem from "./menu/MenuItem";
import Localization from "localization";
import { CommonUsersActions } from "../../../actions";
import utilities from "utils";
import GridCell from "dnn-grid-cell";
import ChangePassword from "../ChangePassword";
import "./style.less";

class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: props.userDetails,
            ChangePasswordVisible: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (!ReactDOM.findDOMNode(this).contains(e.target) && (typeof event.target.className !== "string" || (typeof event.target.className === "string" && event.target.className.indexOf("menu-item") === -1))) {
            this.props.onClose();
        }
    }
    componentWillMount() {
        document.addEventListener("click", this.handleClick, false);
        let {props} = this;
        if (props.userDetails === undefined || props.userDetails.userId !== props.userId) {
            this.getUserDetails(props);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.userDetails === undefined && newProps.userDetails.userId !== newProps.userId) {
            this.getUserDetails(newProps);
        }
    }
    getUserDetails(props) {
        props.dispatch(CommonUsersActions.getUserDetails({ userId: props.userId }, (data) => {
            let userDetails = Object.assign({}, data);
            this.setState({
                userDetails
            });
        }));
    }
    reload() {
        this.getUserDetails(this.props);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
    }
    sort(items, column, order) {
        order = order === undefined ? "asc" : order;
        items = items.sort(function (a, b) {
            if (a[column] > b[column]) //sort string descending
                return order === "asc" ? 1 : -1;
            if (a[column] < b[column])
                return order === "asc" ? -1 : 1;
            return 0;//default return value (no sorting)
        });
        return items;
    }
    onItemClick(key) {
        switch (key) {
            case "ResetPassword":
                this.onSendPasswordLink();
                this.props.onClose();
                break;
            case "ChangePassword":
                this.toggleChangePassword();
                break;
            case "ForceChangePassword":
                this.forcePasswordChange();
                this.props.onClose();
                break;
            case "DeleteUser":
                this.deleteUser();
                this.props.onClose();
                break;
            case "RemoveUser":
                this.hardDeleteUser();
                this.props.onClose();
                break;
            case "RestoreUser":
                this.restoreUser();
                this.props.onClose();
                break;
            case "cmdUnAuthorize":
                this.updateAuthorizeStatus(false);
                this.props.onClose();
                break;
            case "cmdAuthorize":
                this.updateAuthorizeStatus(true);
                this.props.onClose();
                break;
            case "PromoteToSuperUser":
                this.PromoteToSuperUser();
                this.props.onClose();
                break;
            case "ViewAssets":
                this.onViewAssets();
                this.props.onClose();
                break;
            case "ViewProfile":
                this.onViewProfile();
                this.props.onClose();
                break;
            default:
                if (typeof this.props.userMenuAction === "function")
                    this.props.userMenuAction(key, this.state.userDetails);
                this.props.onClose();
                break;
        }
    }
    onViewAssets(){
        let  folderId =   this.state.userDetails.userFolder && parseInt(this.state.userDetails.userFolder.substring(this.state.userDetails.userFolder.lastIndexOf('/') - 1));
        if (folderId > 0) {
            utilities.loadPanel("assets", { folderId: folderId });
        } 
    }
    onViewProfile(){
        utilities.closePersonaBar(() => {
            window.top.location = this.state.userDetails.profileUrl;
        });
    }
    onSendPasswordLink() {
        this.props.dispatch(CommonUsersActions.sendPasswordResetLink({ userId: this.props.userId }, (data) => {
            if (data.Success)
                utilities.notify(Localization.get("PasswordSent"));
            else {
                utilities.notify(data.Message);
            }
        }));
    }
    deleteUser() {
        utilities.confirm(Localization.get("DeleteUser.Confirm"), Localization.get("Delete"), Localization.get("Cancel"), () => {
            this.props.dispatch(CommonUsersActions.deleteUser({ userId: this.props.userId }, (data) => {
                if (data.Success) {
                    utilities.notify(Localization.get("UserDeleted"));
                    this.reload();
                }
                else {
                    utilities.notify(data.Message);
                }
            }));
        });
    }
    hardDeleteUser() {
        utilities.confirm(Localization.get("RemoveUser.Confirm"), Localization.get("Delete"), Localization.get("Cancel"), () => {
            this.props.dispatch(CommonUsersActions.eraseUser({ userId: this.props.userId }, (data) => {
                if (!data.Success)
                    utilities.notify(data.Message);
            }));
        });
    }
    restoreUser() {
        this.props.dispatch(CommonUsersActions.restoreUser({ userId: this.props.userId }, (data) => {
            if (data.Success) {
                utilities.notify(Localization.get("UserRestored"));
                this.reload();
            }
            else {
                utilities.notify(data.Message);
            }
        }));
    }
    forcePasswordChange() {
        this.props.dispatch(CommonUsersActions.forceChangePassword({ userId: this.props.userId }, (data) => {
            if (data.Success) {
                utilities.notify(Localization.get("UserPasswordUpdateChanged"));
                this.reload();
            }
            else {
                utilities.notify(data.Message);
            }
        }));
    }
    updateAuthorizeStatus(authorized) {
        this.props.dispatch(CommonUsersActions.updateAuthorizeStatus({ userId: this.props.userId, authorized: authorized }, (data) => {
            if (data.Success) {
                utilities.notify(authorized ? Localization.get("UserAuthorized") :Localization.get("UserUnAuthorized"));
                this.reload();
            }
            else {
                utilities.notify(data.Message);
            }
        }));
    }
    PromoteToSuperUser() {
        this.props.dispatch(CommonUsersActions.updateSuperUserStatus({ userId: this.props.userId, setSuperUser: true }, (data) => {
            if (!data.Success)
                utilities.notify(data.Message);
        }));
    }

    toggleChangePassword(close) {
        const show = !this.state.ChangePasswordVisible;
        this.setState({ ChangePasswordVisible: show });
        if (close)
            this.props.onClose();
    }
    render() {

        let visibleMenus = [{ key:"ViewProfile", title:  Localization.get("ViewProfile"), index: 10 },
            { key:"ViewAssets", title: Localization.get("ViewAssets"), index: 20 },
            { key:"ChangePassword", title: Localization.get("ChangePassword"), index: 30 },
            { key:"ResetPassword", title: Localization.get("ResetPassword"), index: 40 }
        ];

        //if (1 === 1) {
        visibleMenus = [{ key:"PromoteToSuperUser", title:  Localization.get("PromoteToSuperUser"), index: 80 }].concat(visibleMenus);
        //}
        if (!this.state.userDetails.needUpdatePassword) {
            visibleMenus = [{ key:"ForceChangePassword", title:  Localization.get("ForceChangePassword"), index: 40 }].concat(visibleMenus);
        }
        if (this.state.userDetails.isDeleted) {
            visibleMenus = [{ key:"RestoreUser", title:  Localization.get("RestoreUser"), index: 70 }].concat(visibleMenus);
            visibleMenus = [{ key:"RemoveUser", title:  Localization.get("RemoveUser"), index: 60 }].concat(visibleMenus);
        } else {
            visibleMenus = [{ key:"DeleteUser", title:  Localization.get("DeleteUser"), index: 60 }].concat(visibleMenus);
        }
        if (this.state.userDetails.authorized) {
            visibleMenus = [{ key:"cmdUnAuthorize", title:  Localization.get("cmdUnAuthorize"), index: 50 }].concat(visibleMenus);
        } else {
            visibleMenus = [{ key:"cmdAuthorize", title:  Localization.get("cmdAuthorize"), index: 50 }].concat(visibleMenus);
        }
        visibleMenus = visibleMenus.concat((this.props.getUserMenu && this.props.getUserMenu(this.state.userDetails)) || []);

        visibleMenus = this.sort(visibleMenus, "index");

        return (
            <GridCell className="dnn-user-menu menu-popup">
                {!this.state.ChangePasswordVisible &&
                    <Menu>
                        {
                            visibleMenus.map(menu => {
                                return <MenuItem onMenuAction={this.onItemClick.bind(this, menu.key) }>{menu.title}</MenuItem>;
                            })
                        }
                    </Menu>
                }
                {this.state.ChangePasswordVisible &&
                    <ChangePassword onCancel={this.toggleChangePassword.bind(this, true) } userId={this.props.userId} />
                }
            </GridCell>
        );
    }
}

UserMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    userDetails: PropTypes.object,
    getUserMenu: PropTypes.func.isRequired,
    userMenuAction: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        userDetails: state.users.userDetails
    };
}

export default connect(mapStateToProps)(UserMenu);