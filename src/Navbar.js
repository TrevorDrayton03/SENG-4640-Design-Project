import React, { Component } from 'react';

class Navbar extends Component {

    handleOnClick(e, value) {
        e.preventDefault();
        this.props.linkClick(value)
    }

    render() {
        return (
            <div className="Navbar">
                <h2>
                    <nav>
                        <ul className="navBarList">
                            <a href="/#" onClick={e => this.handleOnClick(e, "/")} >
                                Home
                            </a>
                            <a href="/#" onClick={e => this.handleOnClick(e, "/pets")} >
                                Pets
                            </a>
                            {/* <li>
                                <button onClick={this.handleOnClick.bind(this)} >
                                Supplies
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleOnClick.bind(this)} >
                                About
                                </button>
                            </li> */}
                        </ul>
                    </nav>
                </h2>
            </div>
        );
    }

}

export default Navbar;