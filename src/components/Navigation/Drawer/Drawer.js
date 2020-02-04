import React, { Component } from "react";
import "./Drawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink} from "react-router-dom";

const links = [
  { to: "/", label: "List", exact: true },
  { to: "/auth", label: "authorization", exact: false },
  { to: "/quiz-creator", label: "create test", exact: false }
];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            onClick={this.props.onClose}
            to={link.to}
            exact={link.exact}
            activeClassName="active"
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = ["Drawer"];
    if (!this.props.isOpen) {
      cls.push("close");
    }

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>
            {this.renderLinks()}
            <li></li>
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
